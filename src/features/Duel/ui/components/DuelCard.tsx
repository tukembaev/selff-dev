import { CheckCircle, XCircle } from "lucide-react";
import { Card } from "shared/shadcn/ui/card";

const DuelCard = ({ index, isRight }: { index: number; isRight: boolean }) => {
  return (
    <Card className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <span className="text-4xl font-bold text-gray-800">{index}</span>
      {isRight ? (
        <CheckCircle className="w-10 h-10 text-green-500" />
      ) : (
        <XCircle className="w-10 h-10 text-red-500" />
      )}
    </Card>
  );
};

const DuelCardGrid = ({ items }) => {
  // Определяем количество карточек в ряду (максимум 5)
  const itemsPerRow = Math.min(5, Math.ceil(items.length / 2));
  // Определяем количество рядов (максимум 2)
  const rows = Math.ceil(items.length / itemsPerRow);

  return (
    <div
      className="grid gap-3"
      style={{
        gridTemplateColumns: `repeat(${itemsPerRow}, minmax(80px, 1fr))`,
        gridTemplateRows: `repeat(${rows}, minmax(120px, 1fr))`,
      }}
    >
      {items.map((item) => (
        <DuelCard key={item.index} index={item.index} isRight={item.isRight} />
      ))}
    </div>
  );
};

export { DuelCardGrid };
