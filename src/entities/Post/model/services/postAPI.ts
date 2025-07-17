

import $api from "shared/api/api";
import { ExampleData, FactsData, NoteData, Post, PullRequest, StructuredContent } from "../types/post";




/**
 * Получение публикации по ID
 * @param id - Идентификатор публикации
 * @returns Промис с данными публикации
 */
export const getPost = async (id: string): Promise<Post> => {
  const response = await $api.get(`posts/${id}`);
  return response.data;
};


/**
 * Получение списка публикаций
 * @param params - Параметры фильтрации (например, authorId)
 * @returns Промис с массивом публикаций
 */
export const getPosts = async (params?: { authorId?: number }): Promise<Post[]> => {
  const response = await $api.get("posts", { params });
  return response.data;
};

/**
 * Получение списка pull requests для поста
 * @param postId - Идентификатор поста
 * @returns Промис с массивом pull requests
 */
export const getPullRequests = async (postId: string): Promise<PullRequest[]> => {
  const response = await fetch(`http://localhost:3000/pullRequests?postId=${postId}`, {
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Не удалось получить pull requests");
  }
  return response.json();
};

/**
 * Создание pull request
 * @param postId - Идентификатор поста
 * @param data - Данные pull request
 * @returns Промис с созданным pull request
 */
export const createPullRequest = async (
  postId: string,
  data: { suggestToAdd: StructuredContent[]; authorId: number }
): Promise<PullRequest> => {
  const response = await fetch(`http://localhost:3000/pullRequests`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: crypto.randomUUID(),
      postId,
      authorId: data.authorId,
      suggestToAdd: data.suggestToAdd,
      status: "pending",
      createdAt: new Date().toISOString(),
    }),
  });
  if (!response.ok) {
    throw new Error("Не удалось создать pull request");
  }
  return response.json();
};

/**
 * Принятие конкретного элемента из pull request и добавление его в пост
 * @param postId - Идентификатор поста
 * @param pullRequestId - Идентификатор pull request
 * @param itemIndex - Индекс элемента в suggestToAdd
 * @returns Промис с результатом принятия
 */
export const acceptPullRequestItem = async (
  postId: string,
  pullRequestId: string,
  itemIndex: number
): Promise<void> => {
  // 1. Получаем pull request
  const pullRequestResponse = await fetch(`http://localhost:3000/pullRequests/${pullRequestId}`);
  if (!pullRequestResponse.ok) {
    throw new Error("Не удалось найти pull request");
  }
  const pullRequest: PullRequest = await pullRequestResponse.json();

  // 2. Проверяем, что itemIndex валиден
  if (itemIndex < 0 || itemIndex >= pullRequest.suggestToAdd.length) {
    throw new Error("Недопустимый индекс элемента");
  }

  // 3. Получаем пост
  const postResponse = await fetch(`http://localhost:3000/posts/${postId}`);
  if (!postResponse.ok) {
    throw new Error("Не удалось найти пост");
  }
  const post: Post = await postResponse.json();

  // 4. Выбираем элемент из suggestToAdd
  const itemToAdd = pullRequest.suggestToAdd[itemIndex];
  const updatedStructuredContent = [...post.content.structuredContent];

  // 5. Проверяем, есть ли уже объект с таким типом
  const existingContentIndex = updatedStructuredContent.findIndex(
    (content) => content.type === itemToAdd.type
  );

  if (existingContentIndex !== -1) {
    // Если тип уже существует, добавляем элементы в data.items
    const existingContent = updatedStructuredContent[existingContentIndex];
    if (itemToAdd.type === "Example") {
      updatedStructuredContent[existingContentIndex] = {
        ...existingContent,
        data: {
          items: [
            ...(existingContent.data as ExampleData).items,
            ...(itemToAdd.data as ExampleData).items,
          ],
        },
      };
    } else {
      updatedStructuredContent[existingContentIndex] = {
        ...existingContent,
        data: {
          items: [
            ...(existingContent.data as FactsData | NoteData).items,
            ...(itemToAdd.data as FactsData | NoteData).items,
          ],
        },
      };
    }
  } else {
    // Если типа нет, создаем новый объект с id и suggested_by
    updatedStructuredContent.push({
      id: crypto.randomUUID(),
      type: itemToAdd.type,
      data: itemToAdd.data,
      suggested_by: pullRequest.authorId,
    });
  }

  // 6. Обновляем пост
  const updatePostResponse = await fetch(`http://localhost:3000/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: {
        ...post.content,
        structuredContent: updatedStructuredContent,
      },
    }),
  });
  if (!updatePostResponse.ok) {
    throw new Error("Не удалось обновить пост");
  }

  // 7. Проверяем, остались ли непринятые элементы в pull request
  const remainingItems = pullRequest.suggestToAdd.filter((_, i) => i !== itemIndex);
  if (remainingItems.length === 0) {
    // Если все элементы приняты, обновляем статус pull request
    const updatePullRequestResponse = await fetch(`http://localhost:3000/pullRequests/${pullRequestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "accepted" }),
    });
    if (!updatePullRequestResponse.ok) {
      throw new Error("Не удалось обновить статус pull request");
    }
  } else {
    // Обновляем pull request, удаляя принятый элемент
    const updatePullRequestResponse = await fetch(`http://localhost:3000/pullRequests/${pullRequestId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ suggestToAdd: remainingItems }),
    });
    if (!updatePullRequestResponse.ok) {
      throw new Error("Не удалось обновить pull request");
    }
  }
};

/**
 * Принятие всех элементов pull request и добавление их в пост
 * @param postId - Идентификатор поста
 * @param pullRequestId - Идентификатор pull request
 * @returns Промис с результатом принятия
 */
export const acceptFullPullRequest = async (
  postId: string,
  pullRequestId: string
): Promise<void> => {
  // 1. Получаем pull request
  const pullRequestResponse = await fetch(`http://localhost:3000/pullRequests/${pullRequestId}`);
  if (!pullRequestResponse.ok) {
    throw new Error("Не удалось найти pull request");
  }
  const pullRequest: PullRequest = await pullRequestResponse.json();

  // 2. Получаем пост
  const postResponse = await fetch(`http://localhost:3000/posts/${postId}`);
  if (!postResponse.ok) {
    throw new Error("Не удалось найти пост");
  }
  const post: Post = await postResponse.json();

  // 3. Копия structuredContent для обновления
  const updatedStructuredContent = [...post.content.structuredContent];

  // 4. Обрабатываем каждый элемент suggestToAdd
  pullRequest.suggestToAdd.forEach((item) => {
    const existingContentIndex = updatedStructuredContent.findIndex(
      (content) => content.type === item.type
    );

    if (existingContentIndex !== -1) {
      // Если тип уже существует, добавляем элементы в data.items
      const existingContent = updatedStructuredContent[existingContentIndex];
      if (item.type === "Example") {
        updatedStructuredContent[existingContentIndex] = {
          ...existingContent,
          data: {
            items: [
              ...(existingContent.data as ExampleData).items,
              ...(item.data as ExampleData).items,
            ],
          },
        };
      } else {
        updatedStructuredContent[existingContentIndex] = {
          ...existingContent,
          data: {
            items: [
              ...(existingContent.data as FactsData | NoteData).items,
              ...(item.data as FactsData | NoteData).items,
            ],
          },
        };
      }
    } else {
      // Если типа нет, создаем новый объект с id и suggested_by
      updatedStructuredContent.push({
        id: crypto.randomUUID(),
        type: item.type,
        data: item.data,
        suggested_by: pullRequest.authorId,
      });
    }
  });

  // 5. Обновляем пост
  const updatePostResponse = await fetch(`http://localhost:3000/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: {
        ...post.content,
        structuredContent: updatedStructuredContent,
      },
    }),
  });
  if (!updatePostResponse.ok) {
    throw new Error("Не удалось обновить пост");
  }

  // 6. Обновляем статус pull request на accepted
  const updatePullRequestResponse = await fetch(`http://localhost:3000/pullRequests/${pullRequestId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "accepted" }),
  });
  if (!updatePullRequestResponse.ok) {
    throw new Error("Не удалось обновить статус pull request");
  }
};