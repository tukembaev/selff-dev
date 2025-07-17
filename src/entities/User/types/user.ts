export interface User {
  id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  createdAt: string;
  rating: number;
  friends: number[];
  avatar?: string;
  duel_stastic:{
  duels_completed?:number;
  duels_win?:number;
  duels_loss?:number;
  }

  bio?: string;
}