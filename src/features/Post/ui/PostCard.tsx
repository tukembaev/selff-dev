import { Post } from "entities/Post/model/types/post";
import { BadgeCheckIcon } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { AppRoutes } from "shared/config";
import { cn } from "shared/lib/utils";
import { Badge } from "shared/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "shared/shadcn/ui/card";
import { H2, H4, Muted, Quote, Small } from "shared/shadcn/ui/typography";
import { genreStyles } from "./lib/postCard_styles";

interface PostCardProps {
  post: Post;
  showRating?: boolean;
  showVerified?: boolean;
}

/**
 * Компонент карточки публикации для краткого отображения на странице PostsPage
 * @param props - Свойства компонента
 * @param props.post - Данные публикации
 * @param props.showRating - Показывать ли рейтинг
 * @param props.showVerified - Показывать ли статус верификации
 * @returns JSX.Element
 */
const PostCard = ({
  post,
  showRating = false,
  showVerified = false,
}: PostCardProps) => {
  const navigate = useNavigate();
  const genreStyle = genreStyles[post.genre] || genreStyles.history;

  return (
    <Card
      className={cn(
        "w-full max-w-2xl mx-auto transition-shadow hover:shadow-md cursor-pointer pt-0",
        genreStyle.borderClass,

        "border-2"
      )}
      onClick={() => navigate(`/${AppRoutes.POST}/${post.id}`)}
    >
      <CardHeader
        className={cn(
          "flex flex-row items-center gap-3 py-4", // Граница только снизу для отделения заголовка
          genreStyle.bgClass, // Фон только для заголовка
          genreStyle.borderClass,
          "rounded-t-md rounded-b-none" // Скругление только верхних углов
        )}
      >
        {genreStyle.icon}
        <div className="flex flex-col">
          <H2 className="text-2xl">{post.title}</H2>
          <Muted>
            {post.type === "article"
              ? "Статья"
              : post.type === "quote"
              ? "Цитата"
              : "Термин"}{" "}
            • {post.genre}{" "}
          </Muted>
        </div>
      </CardHeader>
      <CardContent>
        {post.type === "quote" ? (
          <Quote>
            {`${post.content.definition.slice(0, 100)}${
              post.content.definition.length > 100 ? "..." : ""
            }`}
          </Quote>
        ) : (
          <H4 className="font-normal">
            {" "}
            {`${post.content.definition.slice(0, 100)}${
              post.content.definition.length > 100 ? "..." : ""
            }`}
          </H4>
        )}
      </CardContent>
      <CardFooter className="flex gap-4">
        {showVerified && post.isVerified && (
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600 w-fit ml-4"
          >
            <BadgeCheckIcon className="w-4 h-4 mr-1" />
            Проверено
          </Badge>
        )}
        {showRating && (
          <Badge variant={"outline"} className="flex items-center gap-2">
            <Small>{post.votes} голосов</Small>
          </Badge>
        )}
      </CardFooter>
    </Card>
  );
};

export default PostCard;
