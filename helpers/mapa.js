import apiRequest from ".";

const getAllPuntosHurtos = async () => {
  try {
    const resp = await apiRequest("poligonos");
    return { status: resp.status, data: resp.data };
  } catch (error) {
    return { status: 500, data: error };
  }
};

const createPuntoHurto = async (data) => {
  try {
    const resp = await apiRequest("circle_polygon", "POST", data);
    return { status: resp.status, data: resp.data };
  } catch (error) {
    return { status: 500, data: error };
  }
};

const getDireccionCoord = async (direccion) => {
  try {
    const resp = await apiRequest("coordenas", "GET", null, {
      direccion: direccion,
    });
    return { status: resp.status, data: resp.data };
  } catch (error) {
    return { status: 500, data: error };
  }
};

const getRutaPosibleSegura = async (direccion) => {
  try {
    const resp = await apiRequest("ruta", "GET", null, {
      lon_inicial: direccion.lon_inicial,
      lat_inicial: direccion.lat_inicial,
      lon_final: direccion.lon_final,
      lat_final: direccion.lat_final,
    });
    return { status: resp.status, data: resp.data };
  } catch (error) {
    return { status: 500, data: error };
  }
};

export {
  getAllPuntosHurtos,
  createPuntoHurto,
  getDireccionCoord,
  getRutaPosibleSegura,
};
