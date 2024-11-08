import apiRequest from ".";

const getUser = async (correo, contra) => {
  try {
    const resp = await apiRequest("token", "POST", {
      email: correo,
      password: contra,
    });
    return { status: resp.status, data: resp.data };
  } catch (error) {
    return { status: 500, data: error };
  }
};

const postUser = async (body) => {
  try {
    const resp = await apiRequest("user", "POST", body);
    return { status: 201, data: resp.data };
  } catch (error) {
    return { status: 500, data: error };
  }
};

export { getUser, postUser };

