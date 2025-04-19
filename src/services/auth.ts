import { KindRemindResponse } from "../types/KindRemindResponse";

export class AuthError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "AuthError";
  }
}

interface AuthParams {
  username: string;
  password: string;
  email?: string;
  profile_pic?: string;
}

export async function authenticate(
  action: "login" | "signup",
  { username, password, email, profile_pic }: AuthParams
): Promise<KindRemindResponse | void> {
  try {
    console.log("profile_pic", profile_pic);
    const url =
      action === "login"
        ? "http://localhost:3002/kind-remind/login"
        : "http://localhost:3002/kind-remind/signup";
    const body =
      action === "login"
        ? { username, password }
        : { username, email, password, profile_pic };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include", // Include cookies (refresh token)
    });

    const responseData = await response.json();

    // if (response.status === 409) {
    //     return responseData;
    // }

    if (response.ok) {
      if (action === "login") {
        localStorage.setItem(
          "accessToken",
          responseData.data.authentication.newAccessToken
        );
      }
      return responseData;
    }

    // throw new Error(responseData.message || `Error during ${action}`);
    throw new AuthError(
      responseData.message || `Error during ${action}`,
      response.status
    );
  } catch (error) {
    console.error(`Error during ${action}:`, error);

    // const message =
    //     error instanceof Error
    //         ? `There was a problem ${
    //               action === "login" ? "logging in" : "signing up"
    //           }: ${error.message}`
    //         : `There was a problem ${
    //               action === "login" ? "logging in" : "signing up"
    //           }.`;

    // throw new Error(message);

    throw error instanceof Error ? error : new Error("Unknown error");
  }
}

export const logout = async (): Promise<KindRemindResponse | void> => {
  const response = await fetch("http://localhost:3002/kind-remind/logout", {
    method: "POST",
    credentials: "include",
  });
  const responseData = await response.json();
  return responseData;
};

export const verifyEmail = async ({
  token,
}: {
  token: string;
}): Promise<KindRemindResponse | void> => {
  const response = await fetch(
    `http://localhost:3002/kind-remind/verify-email?token=${token}`,
    {
      method: "GET",
    }
  );

  const responseData = await response.json();
  return responseData;
};

export const changePassword = async ({
  password,
  confirmPassword,
  token,
}: {
  password: string;
  confirmPassword: string;
  token: string;
}): Promise<KindRemindResponse | void> => {
  if(password !== confirmPassword) {
    throw new Error("Passwords do not match!");
  }
  const response = await fetch(
    `http://localhost:3002/kind-remind/change-password?token=${token}`,
    {
      method: "GET",
    }
  );

  const responseData = await response.json();
  return responseData;
};
