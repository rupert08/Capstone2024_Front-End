import axios from "axios";

export async function loginUser(loginData, isAdmin) {
  const url = isAdmin ? "http://localhost:5119/ecommerce/admin/login" : "http://localhost:5119/ecommerce/customer/login";

  try {
    const response = await axios.post(url, loginData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: false // Ensure credentials are not included in the request
    });

    console.log("Axios response:", response); // Log the Axios response

    return response.data; // Return the response data directly
  } catch (error) {
    console.log("Axios error:", error); // Log the error
    if (error.response && error.response.status === 401) {
      return { error: "Invalid email or password." };
    } else {
      return { error: "Login failed. Please check your connection." };
    }
  }
}