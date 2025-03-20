

export interface LoginResponse {
  accessToken: string;
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
): Promise<LoginResponse | void> {

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
      credentials: "include", // Include cookies (refresh token)
    });

    if (response.ok) {
      const data = await response.json();

      // Handle signup and login separately
      if (action === "signup") {
        console.log("Signup successful:", data);
        return; // No token to return for signup
      }

      // Handle login: store the access token and refresh token in cookies
      console.log("Login successful:", data);
      localStorage.setItem("accessToken", data.accessToken);
      return data;
    } else {
      const errorData = await response.json();
      throw new Error(
        errorData.message ||
          `${action.charAt(0).toUpperCase() + action.slice(1)} failed`
      );
    }
  } catch (error) {
    console.error(
      `Error ${action === "login" ? "logging in" : "signing up"}:`,
      error
    );

    // Ensure the error is properly thrown to be handled in the component
    if (error instanceof Error) {
      throw new Error(
        `There was a problem ${
          action === "login" ? "logging in" : "signing up."
        } ${error.message}`
      );
    } else {
      throw new Error(
        `There was a problem ${
          action === "login" ? "logging in" : "signing up."
        }`
      );
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
