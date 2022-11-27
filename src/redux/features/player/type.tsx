export interface IPlayers {
  fullname: string;
  id: string;
  chance: number;
  createAt: string;
  maxScore: number;
  phone: string;
  run: number;
  totalScore: number;
  invitedUsers:string[]
}
export interface IState {
  data: IPlayers[];
  loading: boolean;
  error: string | null;
}
