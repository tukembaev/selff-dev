import { Post } from "entities/Post/model/types/post";
import PostCard from "features/Post/ui/PostCard";

/**
 * Компонент для отображения вкладки с публикациями пользователя
 * @param props - Свойства компонента
 * @param props.posts - Массив публикаций
 * @returns JSX.Element
 */
const PostsTab = ({ posts }: { posts: Post[] }) => {
  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostsTab;
