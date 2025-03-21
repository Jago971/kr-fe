export interface LoginResponse {
  status: string; // "success" or "error"
  message: string;
  userId: number | null;
  accessToken: string | null;
  redirect: boolean;
}

interface AuthParams {
  username: string;
  password: string;
  email?: string;
}

export async function authenticate(
  action: "login" | "signup",
  { username, password, email }: AuthParams
): Promise<LoginResponse | void> {
  try {
    const url =
      action === "login"
        ? "http://localhost:3002/kind-remind/login"
        : "http://localhost:3002/kind-remind/signup";
    const body =
      action === "login"
        ? { username, password }
        : { username, email, password };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include", // Include cookies (refresh token)
    });

    const data = await response.json();

    if (response.ok) {
      if (action === "login") {
        localStorage.setItem("accessToken", data.accessToken);
      }
      return data;
    } else {
      throw new Error(data.message || `Error during ${action}`);
    }
  } catch (error) {
    console.error(`Error during ${action}:`, error);

    const message =
      error instanceof Error
        ? `There was a problem ${
            action === "login" ? "logging in" : "signing up"
          }: ${error.message}`
        : `There was a problem ${
            action === "login" ? "logging in" : "signing up"
          }.`;

    throw new Error(message);
  }
}

export const logout = async (): Promise<void> => {
  await fetch("http://localhost:3002/kind-remind/logout", {
    method: "POST",
  });
};