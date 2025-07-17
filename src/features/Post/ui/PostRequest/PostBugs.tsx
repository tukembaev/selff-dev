import { ExampleData, FactsData, NoteData, Post } from "entities/Post";
import { LuBug } from "react-icons/lu";
import { Card, CardContent, CardHeader } from "shared/shadcn/ui/card";
import { FactsList } from "../PostDetails/components/AdditionalSection/SectionVariants/FactsList";
import { Note } from "../PostDetails/components/AdditionalSection/SectionVariants/Note";
import { Example } from "../PostDetails/components/AdditionalSection/SectionVariants/Example";
import { H2, H3, H4 } from "shared/shadcn/ui/typography";

//   content: Post["content"];
interface PostBugsPayload {
  id: string;
  author: string;
  bug_explain: string;
  suggestToAdd: Post["content"]["structuredContent"];
}
const mock: PostBugsPayload[] = [
  {
    id: "1",
    author: "adika",
    bug_explain: "Вы неправильно написали слово Кейс",
    suggestToAdd: [
      {
        id: "1",
        type: "Example",
        data: {
          items: [
            {
              title: "Кеяс Airbnb",
              description:
                "Airbnb получил $20,000 от Y Combinator в 2009 году.",
            },
          ],
        },
      },
    ],
  },
];
const PostBugs = () => {
  return (
    <Card>
      <CardHeader>
        {" "}
        <H2 className="flex gap-4 items-center">
          Bugs <LuBug className="text-green-500" />{" "}
        </H2>
      </CardHeader>
      <CardContent>
        {mock.map((author_request) => (
          <div
            key={author_request.id}
            id={author_request.id}
            className="flex flex-col gap-2"
          >
            <H3>{author_request.author}</H3>
            <H4>{author_request.bug_explain}</H4>

            {author_request?.suggestToAdd?.map((item) => (
              <div
                key={author_request.id}
                id={author_request.id}
                className="flex flex-col gap-2"
              >
                {item.type === "Facts" && (
                  <FactsList
                    data={item.data as FactsData}
                    isReq={true}
                    btnText="Fix bug"
                  />
                )}
                {item.type === "Note" && (
                  <Note
                    data={item.data as NoteData}
                    isReq={true}
                    btnText="Fix bug"
                  />
                )}
                {item.type === "Example" && (
                  <Example
                    data={item.data as ExampleData}
                    isReq={true}
                    btnText="Fix bug"
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

export default PostBugs;
