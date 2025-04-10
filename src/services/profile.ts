import { KindRemindResponse } from "../types/KindRemindResponse";

export async function fetchProfileData(): Promise<KindRemindResponse | void> {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const request = await fetch("http://localhost:3002/kind-remind/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!request.ok) {
      const errorData = await request.json();
      console.error("Error from backend:", errorData.message);
      throw new Error(errorData.message || "An error occurred while fetching data.");
    }

    const response: KindRemindResponse = await request.json();

    // If a new access token is returned, update it in local storage
    if (response.data.authentication.newAccessToken) {
      localStorage.setItem("accessToken", response.data.authentication.newAccessToken);
    }
    return response;
  } catch (error) {
    // Handle network errors or unexpected response
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching dashboard data:", errorMessage);
    throw new Error(errorMessage);
  }
}
