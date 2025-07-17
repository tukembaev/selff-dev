import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Separator } from "shared/shadcn/ui/separator";
import { UseTabs } from "shared/components"; // Предполагается, что компонент UseTabs существует

import { getPosts } from "entities/Post/model/services/postAPI";
import { getBattles } from "entities/Battle/model/services/battleAPI";
import PostsTab from "./tabs/PostsTab";
import BattlesTab from "./tabs/BattlesTab";

import { LuAxe, LuDock } from "react-icons/lu";
import { getUser } from "entities/User";
import UserCard from "./UserCard";

/**
 * Компонент для отображения профиля пользователя
 * @returns JSX.Element
 */
const UserProfile = () => {
  const { id } = useParams();
  const { data: user, isLoading } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(Number(id)),
  });
  const { data: posts } = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPosts({ authorId: Number(id) }),
  });
  const { data: battles } = useQuery({
    queryKey: ["battles", id],
    queryFn: () => getBattles({ userId: Number(id) }),
  });

  const tabs = [
    {
      name: "Публикации",
      value: "posts",
      icon: <LuDock />,
      content: <PostsTab posts={posts || []} />,
      count: posts?.length,
    },
    {
      name: "Битвы",
      value: "battles",
      icon: <LuAxe />,
      content: <BattlesTab battles={battles || []} />,
      count: battles?.length,
    },
  ];

  return (
    <div className="flex flex-col gap-8 max-w-screen-xl mx-auto">
      <UserCard data={user} isLoading={isLoading} />
      <Separator />
      <UseTabs tabs={tabs} />
    </div>
  );
};

export default UserProfile;
