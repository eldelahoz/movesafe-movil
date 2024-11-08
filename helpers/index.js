const apiBaseUrl = `http://192.168.1.14:8000/`;

const apiRequest = async (endpoint, method = "GET", body = null) => {
  const url = `${apiBaseUrl}${endpoint}`;
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
    console.error("Error en la solicitud:", error);
    throw error;
  }
};

export default apiRequest;