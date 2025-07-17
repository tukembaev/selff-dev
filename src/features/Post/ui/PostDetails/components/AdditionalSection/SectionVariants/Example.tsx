import { ExampleData } from "entities/Post";
import { Button } from "shared/shadcn/ui/button";
import { Large, Muted, P } from "shared/shadcn/ui/typography";

interface ExampleContentProps {
  data: ExampleData;
  isReq?: boolean;
  btnText?: string;
  onSubmit?: () => void;
  status: string;
}

export const Example = ({
  data,
  isReq,
  btnText,
  onSubmit,
  status,
}: ExampleContentProps) => {
  return (
    <div>
      <Large className="mb-2">Примеры</Large>
      {data.items.map((item) => (
        <div className="pl-4">
          <P className="text-base font-semibold">{item.title}</P>
          <Muted className="text-base">{item.description}</Muted>
          {isReq && onSubmit && (
            <Button
              onClick={onSubmit}
              disabled={status !== "pending"}
              className="mt-2"
            >
              {status === "accepted"
                ? "Принято "
                : status === "rejected"
                ? "Отказано"
                : btnText}
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};
