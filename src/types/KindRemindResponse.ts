export interface KindRemindResponse {
  status: string;
  message: string;
  userId: number | null;
  accessToken: string | null;
  newAccessToken: string | null;
  redirect: boolean;
}
