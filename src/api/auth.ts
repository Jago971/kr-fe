export interface LoginResponse {
  token: string;
  message: string;
}

export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch('http://localhost:3002/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("There was a problem logging in");
  }
};
