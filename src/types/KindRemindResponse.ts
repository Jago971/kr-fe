export interface KindRemindResponse {
  status: string;
  message: string;
  data: {
    authentication: {
      oldAccessToken: string | null;
      newAccessToken: string | null;
    };
    payload: {
      user: {
        userId: number;
        username: string;
        email: string;
        profile_pic: string;
      }
      tasks: [
        {
          ownerId: number | null;
          title: string | null;
          content: string | null;
        }
      ];
      messages: [
        {
          ownerId: number | null;
          recipientId: number | null;
          title: string | null;
          content: string | null;
        }
      ];
      receivedMessages: [
        {
          ownerId: number | null;
          recipientId: number | null;
          title: string | null;
          content: string | null;
        }
      ];
    };
  };
}
