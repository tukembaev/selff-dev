import { User } from "entities/User/types/user"; // Предполагается, что тип User существует
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "shared/shadcn/ui/card";

/**
 * Компонент для отображения карточки пользователя
 * @param props - Свойства компонента
 * @param props.data - Данные пользователя
 * @param props.isLoading - Состояние загрузки
 * @returns JSX.Element
 */
const UserCard = ({ data, isLoading }: { data?: User; isLoading: boolean }) => {
  if (isLoading) return <p>Загрузка...</p>;
  if (!data) return <p>Пользователь не найден</p>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {data.first_name} {data.last_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Email: {data.email}</p>
        <p className="text-sm">Рейтинг: {data.rating || 0} баллов</p>
      </CardContent>
    </Card>
  );
};

export default UserCard;
