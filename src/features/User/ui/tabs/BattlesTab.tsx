import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "shared/shadcn/ui/card";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "shared/config";
import { Battle } from "entities/Battle/model/types/battle";

/**
 * Компонент для отображения вкладки с битвами пользователя
 * @param props - Свойства компонента
 * @param props.battles - Массив битв
 * @returns JSX.Element
 */
const BattlesTab = ({ battles }: { battles: Battle[] }) => {
  const navigate = useNavigate();
  return (
    <div className="grid gap-4">
      {battles.map((battle: Battle) => (
        <Card
          key={battle.id}
          className="cursor-pointer"
          onClick={() => navigate(`/${AppRoutes.BATTLE}/${battle.id}`)}
        >
          <CardHeader>
            <CardTitle>Битва #{battle.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Статус: {battle.status}</p>
            <p>Дата: {new Date(battle.createdAt).toLocaleDatestring()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BattlesTab;
