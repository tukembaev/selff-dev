import { H1 } from "shared/shadcn/ui/typography";
import DuelAnswerInput from "./components/DuelAnswerInput";
import { DuelCardGrid } from "./components/DuelCard";

const data = [
 { index: 11, isRight: true },
  { index: 22, isRight: true },
  { index: 32, isRight: true },
  { index: 42, isRight: true },
  { index: 52, isRight: true },
  { index: 62, isRight: true },
  { index: 72, isRight: true },
  { index: 82, isRight: true },
  { index: 92, isRight: true },
  { index: 102, isRight: true },
];
const data2 = [
  { index: 1, isRight: true },
  { index: 2, isRight: true },
  { index: 3, isRight: true },
  { index: 4, isRight: true },
  { index: 5, isRight: true },
  { index: 6, isRight: true },
  { index: 7, isRight: true },
  { index: 8, isRight: true },
  { index: 9, isRight: true },
  { index: 10, isRight: true },
  

];

const DuelContainer = () => {
  return (
    <div className="flex flex-col  py-4 px-6 gap-4 ">
      {/* Верхняя сетка (оппонент) */}
      <div className="flex-1 max-h-[32vh] overflow-hidden">
        <H1>OPPONENTS</H1>

        <DuelCardGrid items={data} />
      </div>
      {/* Центральная часть (управление) */}
      <div className="max-h-[40vh] flex items-center justify-center">
        <DuelAnswerInput />
      </div>
      {/* Нижняя сетка (игрок) */}
      <div className="flex-1 max-h-[32vh] overflow-hidden">
        <H1>MYSELF</H1>
        <DuelCardGrid items={data2} />
      </div>
    </div>
  );
};
export default DuelContainer;
