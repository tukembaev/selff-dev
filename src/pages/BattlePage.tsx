import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button } from "shared/shadcn/ui/button";
import { Input } from "shared/shadcn/ui/input";
import {
  getBattle,
  submitAnswer,
} from "entities/Battle/model/services/battleAPI";
import { toast } from "sonner";

/**
 * Компонент для отображения страницы интеллектуальной битвы
 * @returns JSX.Element
 */
const BattlePage = () => {
  const { id } = useParams();
  const { data: battle, isLoading } = useQuery({
    queryKey: ["battle", id],
    queryFn: () => getBattle(id!),
  });
  const [answer, setAnswer] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const { mutate: submit } = useMutation({
    mutationFn: (data: { questionId: string; answer: string }) =>
      submitAnswer(id!, data),
    onSuccess: () => {
      toast.success("Ответ отправлен!");
      setAnswer("");
    },
  });

  useEffect(() => {
    if (battle?.questions[0]?.timeLimit) {
      setTimeLeft(battle.questions[0].timeLimit);
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            toast.error("Время вышло!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [battle]);

  if (isLoading) return <p>Загрузка...</p>;
  if (!battle) return <p>Битва не найдена</p>;

  const currentQuestion = battle.questions[0]; // Предполагаем, что вопросы идут по очереди

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Интеллектуальная битва</h1>
      <p>Осталось времени: {timeLeft} сек</p>
      <div className="p-4 bg-muted rounded">
        <p>{currentQuestion.content}</p>
      </div>
      <div className="flex gap-2">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Ваш ответ..."
          onPaste={(e) => e.preventDefault()} // Запрет копирования
        />
        <Button
          onClick={() => submit({ questionId: currentQuestion.id, answer })}
          disabled={!answer || timeLeft <= 0}
        >
          Отправить
        </Button>
      </div>
    </div>
  );
};

export default BattlePage;
