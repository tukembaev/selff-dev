import DuelAnswerInput from "./components/DuelAnswerInput";
import { DuelCardGrid } from "./components/DuelCard";

const data = [
  { index: 1, isRight: true },
  { index: 2, isRight: false },
  { index: 3, isRight: true },
  { index: 4, isRight: false },
  { index: 5, isRight: false },
  { index: 6, isRight: false },
  { index: 7, isRight: false },
  { index: 8, isRight: false },
  { index: 59, isRight: false },
  { index: 55, isRight: false },
  { index: 51, isRight: true },
  { index: 52, isRight: false },
  { index: 53, isRight: false },
  { index: 54, isRight: false },
  { index: 56, isRight: false },
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
  { index: 59, isRight: true },
  { index: 55, isRight: true },
  { index: 51, isRight: true },
  { index: 52, isRight: true },
  { index: 53, isRight: true },
  { index: 54, isRight: true },
  { index: 56, isRight: true },
];

const DuelContainer = () => {
  return (
    <div className="flex flex-col h-screen py-4 px-6 gap-4 bg-gray-100">
      {/* Верхняя сетка (оппонент) */}
      <div className="flex-1 max-h-[40vh] overflow-hidden">
        <DuelCardGrid items={data} />
      </div>
      {/* Центральная часть (управление) */}
      <div className="max-h-[15vh] flex items-center justify-center">
        <DuelAnswerInput />
      </div>
      {/* Нижняя сетка (игрок) */}
      <div className="flex-1 max-h-[40vh] overflow-hidden">
        <DuelCardGrid items={data2} />
      </div>
    </div>
  );
};
export default DuelContainer;
