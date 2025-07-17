
import $api from "shared/api/api";
import { User } from "../types/user";

/**
 * Авторизация пользователя через email и пароль
 * @param data - Данные для входа (email и password)
 * @returns Промис с данными пользователя
 * @throws Ошибка, если авторизация не удалась
 */
export const authUser = async (data: { email: string; password: string }): Promise<User> => {
  const response = await $api.get("users", {
    params: {
      email: data.email,
      password: data.password,
    },
  });
  const user = response.data[0];
  if (!user) {
    throw new Error("Неверный email или пароль");
  }
  return user;
};

/**
 * Получение данных пользователя по ID
 * @param id - Идентификатор пользователя
 * @returns Промис с данными пользователя
 */
export const getUser = async (id: number): Promise<User> => {
  const response = await $api.get(`users/${id}`);
  return response.data;
};

/**
 * Получение списка пользователей (например, для поиска друзей)
 * @param params - Параметры фильтрации (опционально)
 * @returns Промис с массивом пользователей
 */
export const getUsers = async (params?: { email?: string }): Promise<User[]> => {
  const response = await $api.get("users", { params });
  return response.data;
};

/**
 * Добавление друга
 * @param userId - ID пользователя
 * @param friendId - ID друга для добавления
 * @returns Промис с обновленными данными пользователя
 */
export const addFriend = async (userId: number, friendId: number): Promise<User> => {
  const response = await $api.patch(`users/${userId}`, {
    friends: { $push: friendId },
  });
  return response.data;
};

/**
 * Обновление профиля пользователя
 * @param id - ID пользователя
 * @param data - Данные для обновления (first_name, last_name, bio, avatar)
 * @returns Промис с обновленными данными пользователя
 */
export const updateUser = async (
  id: number,
  data: Partial<Pick<User, "first_name" | "last_name" | "bio" | "avatar">>
): Promise<User> => {
  const response = await $api.patch(`users/${id}`, data);
  return response.data;
};

/**
 * Обновление рейтинга пользователя
 * @param id - ID пользователя
 * @param rating - Новый рейтинг или изменение рейтинга
 * @returns Промис с обновленными данными пользователя
 */
export const updateRating = async (id: number, rating: number): Promise<User> => {
  const response = await $api.patch(`users/${id}`, { rating });
  return response.data;
};