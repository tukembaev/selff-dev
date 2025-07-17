import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "shared/shadcn/ui/tabs";
import PostPullRequest from "./PostPullRequest";
import PostBugs from "./PostBugs";

const PostRequest = () => {
  return (
    <Tabs defaultValue="pull_request" className="max-w-2/5 w-full">
      {" "}
      <TabsList className="w-full grid grid-cols-2">
        {" "}
        <TabsTrigger value="pull_request">Pull Requests</TabsTrigger>{" "}
        <TabsTrigger value="bugs">Bugs</TabsTrigger>{" "}
      </TabsList>{" "}
      <div className="h-full">
        {" "}
        <TabsContent value="pull_request">
          <PostPullRequest />
        </TabsContent>{" "}
        <TabsContent value="bugs">
          <PostBugs />
        </TabsContent>{" "}
      </div>{" "}
    </Tabs>
  );
};

export default PostRequest;
