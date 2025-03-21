import { KindRemindResponse } from "../types/KindRemindResponse";

export async function fetchHomeData(): Promise<KindRemindResponse | void> {
  const accessToken = localStorage.getItem("accessToken");
  console.log("Access token:", accessToken);

  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const response = await fetch("http://localhost:3002/kind-remind/home", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data = await response.json();
    console.log("Data received:", data);

    if (response.ok) {
      if (data.newAccessToken) {
        localStorage.setItem("accessToken", data.newAccessToken);
      }
      return data;
    } else {
      // Handle backend error properly
      console.error("Error from backend:", data.message);
      return {
        status: "error",
        message: data.message,
        userId: null,
        accessToken: null,
        newAccessToken: null,
        redirect: true,
      };
    }
  } catch (error) {
    console.error("Error fetching home data:", error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "An error occurred while fetching home data"
    );
  }
}
