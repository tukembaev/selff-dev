/**
 * Интерфейс для битвы
 */
export interface Battle {
  id: string;
  initiatorId: number;
  opponentId: number;
  questions: Question[];
  status: "pending" | "active" | "completed";
  createdAt: string;
}

/**
 * Интерфейс для вопроса в битве
 */
export interface Question {
  id: string;
  content: string;
  type: "termin" | "quote" | "test";
  answer?: string;
  timeLimit: number; // Время в секундах
}