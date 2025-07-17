import { NoteData } from "entities/Post";
import { Button } from "shared/shadcn/ui/button";
import { Large, P } from "shared/shadcn/ui/typography";

interface NoteContentProps {
  data: NoteData;
  isReq?: boolean;
  btnText?: string;
  onSubmit?: () => void;
  status: string;
}

export const Note = ({
  data,
  isReq,
  btnText,
  onSubmit,
  status,
}: NoteContentProps) => {
  return (
    <div>
      <Large className="mb-2">Заметки</Large>
      {data.items.map((item) => (
        <div className="flex flex-col gap-4">
          <P className=" pl-4">{item}</P>
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
