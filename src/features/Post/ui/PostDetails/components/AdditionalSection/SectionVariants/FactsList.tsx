import { FactsData } from "entities/Post";
import { Button } from "shared/shadcn/ui/button";
import { Large, List, P } from "shared/shadcn/ui/typography";

interface FactsListProps {
  data: FactsData;
  isReq?: boolean;
  btnText?: string;
  onSubmit?: () => void;
  status: string;
}

export const FactsList = ({
  data,
  isReq,
  btnText,
  onSubmit,
  status,
}: FactsListProps) => {
  return (
    <div>
      <Large className="mb-2">Факты</Large>
      <List>
        {data.items.map((item, i) => (
          <li key={i}>
            <P>{item}</P>
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
          </li>
        ))}
      </List>
    </div>
  );
};
