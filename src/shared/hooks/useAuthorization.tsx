import { useState } from "react";
import { authUser } from "entities/User/model/userAPI";
import { User } from "entities/User/types/user";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "shared/config";

/**
 * Хук для управления авторизацией пользователя
 * @returns Объект с данными пользователя, функциями входа и выхода
 */
export const useAuthorization = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const login = async (email: string, password: string) => {
    try {
      const userData = await authUser({ email, password });
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success("Вход выполнен успешно!");
      navigate(`/${AppRoutes.POSTS}`);
    } catch (error) {
      toast.error(error.message || "Ошибка авторизации");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.success("Выход выполнен");
    navigate(`/${AppRoutes.LOGIN}`);
  };

  // Восстановление пользователя из localStorage при загрузке
  const restoreUser = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  };

  return { user, login, logout, restoreUser };
};
