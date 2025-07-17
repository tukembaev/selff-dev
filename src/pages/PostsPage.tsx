import { useQuery } from "@tanstack/react-query";
import { getPosts } from "entities/Post/model/services/postAPI";
import { PostCard } from "features/Post";

import { Badge } from "shared/shadcn/ui/badge";
import { H1 } from "shared/shadcn/ui/typography";

const PostsPage = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });
  const genres = [
    "history",
    "mathematics",
    "programming",
    "philosophy",
    "science",
    "literature",
    "economics",
    "psychology",
    "culture",
  ];

  return (
    <div className="space-y-4 max-w-screen-xl mx-auto">
      <H1>Публикации</H1>
      <div className="flex gap-2 mb-4 flex-wrap">
        {genres.map((genre) => (
          <Badge
            key={genre}
            className="px-4 py-2 bg-muted hover:bg-muted/80 cursor-pointer capitalize"
          >
            {genre}
          </Badge>
        ))}
      </div>
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {posts &&
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                showRating={true}
                showVerified={true}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default PostsPage;
