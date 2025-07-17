import $api from "shared/api/api";
import { Battle } from "../types/battle";


/**
 * Получение данных о битве по ID
 * @param id - Идентификатор битвы
 * @returns Промис с данными битвы
 */
export const getBattle = async (id: string): Promise<Battle> => {
  const response = await $api.get(`battles/${id}`);
  return response.data;
};

/**
 * Отправка ответа на вопрос в битве
 * @param battleId - Идентификатор битвы
 * @param data - Данные ответа (ID вопроса и текст ответа)
 * @returns Промис с результатом отправки
 */
export const submitAnswer = async (
  battleId: string,
  data: { questionId: string; answer: string }
) => {
  const response = await $api.post(`battles/${battleId}/answers`, data);
  return response.data;
};

/**
 * Получение списка битв для пользователя
 * @param params - Параметры запроса (ID пользователя)
 * @returns Промис с массивом битв
 */
export const getBattles = async (params: { userId: number }): Promise<Battle[]> => {
  const response = await $api.get("battles", { params });
  return response.data;
};