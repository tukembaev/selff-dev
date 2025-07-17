import { Post } from "entities/Post/model/types/post";
import { BadgeCheckIcon } from "lucide-react";
import { cn } from "shared/lib/utils";
import { Badge } from "shared/shadcn/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "shared/shadcn/ui/card";
import { Separator } from "shared/shadcn/ui/separator";
import { H2, H4, Muted, Quote, Small } from "shared/shadcn/ui/typography";
import { genreStyles } from "../lib/postCard_styles";
import { RenderAdditionalSection } from "./components/AdditionalSection/AdditionalSection";

interface PostDetailsProps {
  post: Post;
  showRating?: boolean;
  showVerified?: boolean;
}

/**
 * Компонент для детального отображения публикации с предложениями и дополнительной информацией
 * @param props - Свойства компонента
 * @param props.post - Данные публикации
 * @param props.showRating - Показывать ли рейтинг
 * @param props.showVerified - Показывать ли статус верификации
 * @returns JSX.Element
 */
const PostDetails = ({
  post,
  // showRating = true,
  showVerified = true,
}: PostDetailsProps) => {
  const genreStyle = genreStyles[post.genre] || genreStyles.history;

  return (
    <Card
      className={cn(
        "w-full transition-shadow pt-0 shadow-none",
        genreStyle.borderClass,
        "border-2 bg-white dark:bg-gray-900" // Фиксированный фон для всей карточки
      )}
    >
      <CardHeader
        className={cn(
          "flex flex-col gap-2 py-4 ", // Граница только снизу для отделения заголовка
          genreStyle.bgClass, // Фон только для заголовка
          genreStyle.borderClass,
          "rounded-t-md rounded-b-none" // Скругление только верхних углов
        )}
      >
        <div className="flex flex-row items-center gap-3">
          {genreStyle.icon}
          <div className="flex flex-col">
            <H2>{post.title}</H2>
            <Muted>
              {post.type === "article"
                ? "Статья"
                : post.type === "quote"
                ? "Цитата"
                : post.type === "persona"
                ? "Персона"
                : "Термин"}{" "}
              • {post.genre}
            </Muted>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {post.type === "quote" ? (
          <Quote>{post.content.definition}</Quote>
        ) : (
          <H4 className="font-normal">{post.content.definition}</H4>
        )}
        <Separator />

        {post.content.structuredContent.length > 0 ? (
          <RenderAdditionalSection content={post.content} postId={post.id} />
        ) : null}
        {post.content.source && <Small>Источник: {post.content.source}</Small>}
      </CardContent>
      <CardFooter className="flex gap-4 border-gray-100 dark:border-gray-800">
        {/* <UserBar /> */}
        {showVerified && post.isVerified && (
          <Badge
            variant="secondary"
            className="bg-blue-500 text-white dark:bg-blue-600 w-fit"
          >
            <BadgeCheckIcon className="w-4 h-4 mr-1" />
            Проверено
          </Badge>
        )}
        {/* {showRating && (
          <div className="flex items-center gap-2">
            <BadgeCheckIcon className="w-5 h-5 text-yellow-500" />
            <Small className="text-sm">
              {post.rating.toFixed(1)} ({post.votes} голосов)
            </Small>
          </div>
        )} */}
      </CardFooter>
    </Card>
  );
};

export default PostDetails;
