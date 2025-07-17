import UserProfile from "features/User/ui/UserProfile";
import BattlePage from "pages/BattlePage";
import DuelPage from "pages/DuelPage";
import { LoginPage } from "pages/LoginPage";
import PostPage from "pages/PostPage";
import PostsPage from "pages/PostsPage";
import { RouteObject } from "react-router-dom";
// import { PostsPage } from "pages/PostsPage";
// import { PostPage } from "pages/PostPage";
// import { BattlePage } from "pages/BattlePage";
// import { UserProfile } from "pages/UserProfile";

export enum AppRoutes {
  LOGIN = "login",
  POSTS = "posts",
  POST = "post",
  BATTLE = "battle",
  PROFILE = "profile",
  DUEL = "duel",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.LOGIN]: "/",
  [AppRoutes.POSTS]: "/posts",
  [AppRoutes.POST]: "/post/:id",
  [AppRoutes.BATTLE]: "/battle/:id",
  [AppRoutes.PROFILE]: "/profile/:id",
  [AppRoutes.DUEL]: "/duel/",
};

export const routeConfig: Record<AppRoutes, RouteObject> = {
  [AppRoutes.LOGIN]: { path: RoutePath.login, element: <LoginPage /> },
  [AppRoutes.POSTS]: { path: RoutePath.posts, element: <PostsPage /> },
  [AppRoutes.POST]: { path: RoutePath.post, element: <PostPage /> },
  [AppRoutes.BATTLE]: { path: RoutePath.battle, element: <BattlePage /> },
  [AppRoutes.PROFILE]: { path: RoutePath.profile, element: <UserProfile /> },
  [AppRoutes.DUEL]: { path: RoutePath.duel, element: <DuelPage /> },
};
