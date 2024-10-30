export const getUser = async (correo, contra) => {
  const url = `http://192.168.1.2:8000/token`;
  const usuario = {
    email: correo,
    password: contra,
  };
  try {
    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(usuario),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const respuesta = await resp
      .json()
      .then((data) => ({ status: resp.status, data: data }));

    return respuesta;
  } catch (error) {
    return { status: 404, data: error };
  }
};
