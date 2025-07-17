import { useMutation, useQuery } from "@tanstack/react-query";
import { ExampleData, FactsData, NoteData } from "entities/Post";
import {
  acceptFullPullRequest,
  acceptPullRequestItem,
  getPullRequests,
} from "entities/Post/model/services/postAPI";
import { LuBug } from "react-icons/lu";
import { useParams } from "react-router-dom";

import { Button } from "shared/shadcn/ui/button";
import { Card, CardContent, CardHeader } from "shared/shadcn/ui/card";
import { H2, H3 } from "shared/shadcn/ui/typography";
import { toast } from "sonner";
import { Example } from "../PostDetails/components/AdditionalSection/SectionVariants/Example";
import { FactsList } from "../PostDetails/components/AdditionalSection/SectionVariants/FactsList";
import { Note } from "../PostDetails/components/AdditionalSection/SectionVariants/Note";
import { queryClient } from "shared/api/queryClient";

const PostPullRequest = () => {
  const { id: postId } = useParams();

  const { data: pullRequests, isLoading } = useQuery({
    queryKey: ["pullRequests", postId],
    queryFn: () => getPullRequests(postId!),
    enabled: !!postId,
  });
  // Мутация для принятия конкретного элемента pull request
  const acceptItemMutation = useMutation({
    mutationFn: ({
      pullRequestId,
      itemIndex,
    }: {
      pullRequestId: string;
      itemIndex: number;
    }) => acceptPullRequestItem(postId!, pullRequestId, itemIndex),
    onSuccess: async () => {
      toast.success("Элемент успешно добавлен в пост!");
      await queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
    onError: (error) => {
      toast.error(`Ошибка: ${error.message || "Не удалось добавить элемент"}`);
    },
  });

  // Мутация для принятия всего pull request
  const acceptFullMutation = useMutation({
    mutationFn: ({ pullRequestId }: { pullRequestId: string }) =>
      acceptFullPullRequest(postId!, pullRequestId),
    onSuccess: () => {
      toast.success("Элемент успешно добавлен в пост!");
    },
    onError: (error) => {
      toast.error(
        `Ошибка: ${error.message || "Не удалось добавить pull request"}`
      );
    },
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (!pullRequests || pullRequests.length === 0) return <p>Нет предложений</p>;
  return (
    <Card>
      <CardHeader>
        {" "}
        <H2 className="flex gap-4 items-center">
          Pull Request <LuBug className="text-green-500" />{" "}
        </H2>
      </CardHeader>
      <CardContent>
        {pullRequests.map((author_request) => (
          <div
            key={author_request.id}
            id={author_request.id}
            className="flex flex-col gap-2"
          >
            <H3>{author_request.authorName}</H3>
            {author_request.status === "pending" && (
              <Button
                onClick={() =>
                  acceptFullMutation.mutate({
                    pullRequestId: author_request.id,
                  })
                }
                className="bg-green-500 hover:bg-green-600"
              >
                Принять весь pull request
              </Button>
            )}
            {author_request?.suggestToAdd?.map((item, index) => (
              <div
                key={author_request.id}
                id={author_request.id}
                className="flex flex-col gap-2"
              >
                {item.type === "Facts" && (
                  <FactsList
                    data={item.data as FactsData}
                    isReq={true}
                    btnText="Merge Request"
                    onSubmit={() =>
                      acceptItemMutation.mutate({
                        pullRequestId: author_request.id,
                        itemIndex: index,
                      })
                    }
                    status={author_request.status}
                  />
                )}
                {item.type === "Note" && (
                  <Note
                    data={item.data as NoteData}
                    isReq={true}
                    btnText="Merge Request"
                    onSubmit={() =>
                      acceptItemMutation.mutate({
                        pullRequestId: author_request.id,
                        itemIndex: index,
                      })
                    }
                    status={author_request.status}
                  />
                )}
                {item.type === "Example" && (
                  <Example
                    data={item.data as ExampleData}
                    isReq={true}
                    btnText="Merge Request"
                    onSubmit={() =>
                      acceptItemMutation.mutate({
                        pullRequestId: author_request.id,
                        itemIndex: index,
                      })
                    }
                    status={author_request.status}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default PostPullRequest;
