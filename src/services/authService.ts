export interface LoginResponse {
  token: string;
  message: string;
}

interface AuthParams {
  username: string;
  password: string;
  email?: string;
}

export async function authenticate(
  action: "login" | "signup",
  { username, password, email }: AuthParams
): Promise<LoginResponse> {
  try {
    const url =
      action === "login"
        ? "http://localhost:3002/login"
        : "http://localhost:3002/signup";
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
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `${action.charAt(0).toUpperCase() + action.slice(1)} failed`
      );
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error(
      `Error ${action === "login" ? "signing in" : "signing up"}:`,
      error
    );
    if (error instanceof Error) {
      throw new Error(
        `There was a problem ${action === "login" ? "logging in" : "signing up."} ${error.message}`
      );
    } else {
      throw new Error(`There was a problem ${action === "login" ? "logging in" : "signing up."}`);
    }
  }
}

export const logout = async (): Promise<void> => {
  await fetch("http://localhost:3002/logout", {
    method: "POST",
  });
};


// export async function signIn(
//   username: string,
//   password: string
// ): Promise<LoginResponse> {
//   try {
//     const response = await fetch("http://localhost:3002/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, password }),
//       credentials: "include",
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Login failed");
//     }

//     const data: LoginResponse = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error signing in:", error);
//     throw new Error("There was a problem signing in");
//   }
// }

// export async function signUp(
//   username: string,
//   email: string,
//   password: string
// ): Promise<LoginResponse> {
//   try {
//     const response = await fetch("http://localhost:3002/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ username, email, password }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Signup failed");
//     }

//     const data: LoginResponse = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error signing up:", error);
//     throw new Error("There was a problem signing up");
//   }
// }
