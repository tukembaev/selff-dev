import { useQuery } from "@tanstack/react-query";
import { getPost } from "entities/Post/model/services/postAPI";
import PostDetails from "features/Post/ui/PostDetails/PostDetails";
import PostRequest from "features/Post/ui/PostRequest/PostRequest";

import { useParams } from "react-router-dom";

const PostPage = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id!),
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (!post) return <p>Публикация не найдена</p>;

  return (
    <div className="space-y-4 flex gap-2 px-6">
      <PostDetails post={post} showRating showVerified />
      <PostRequest />
      {/* <PostDetails post={post} showRating showVerified /> */}
    </div>
  );
};

export default PostPage;
