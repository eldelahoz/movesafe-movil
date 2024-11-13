import { API_URL } from "@env";

// const apiBaseUrl = `${API_URL}`;

const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  params = {}
) => {
  let url = `${API_URL}${endpoint}`;

  if (method === "GET" && Object.keys(params).length > 0) {
    const queryParams = new URLSearchParams(params).toString();
    url += `?${queryParams}`;
  }

  const headers = {
    "Content-Type": "application/json",
  };

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    return { status: response.status, data };
  } catch (error) {
    throw error;
  }
};

export default apiRequest;
