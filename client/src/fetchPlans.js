import { BACKEND_URL } from "./config.js";

export const fetchPlans = async () => {
  try {
    const response = await fetch(`${BACKEND_URL}/api/plans`);
    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      throw new Error("Failed to fetch plans");
    }
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw new Error("Failed to fetch plans. Please try again later.");
  }
};
