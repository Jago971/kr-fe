import { KindRemindResponse } from "../types/KindRemindResponse";

export async function fetchDashboardData(): Promise<KindRemindResponse | void> {
  const accessToken = localStorage.getItem("accessToken");

  try {
    const response = await fetch("http://localhost:3002/kind-remind/dashboard", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error from backend:", errorData.message);
      throw new Error(errorData.message || "An error occurred while fetching data.");
    }

    const data: KindRemindResponse = await response.json();

    // If a new access token is returned, update it in local storage
    if (data.newAccessToken) {
      localStorage.setItem("accessToken", data.newAccessToken);
    }
    return data;
  } catch (error) {
    // Handle network errors or unexpected response
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    console.error("Error fetching dashboard data:", errorMessage);
    throw new Error(errorMessage);
  }
}
