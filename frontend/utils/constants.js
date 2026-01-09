export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:9000/api/v1";

export const AUTH_ROUTES = {
  REGISTER: `${BACKEND_URL}/auth/register`,
  LOGIN: `${BACKEND_URL}/auth/login`,
  USER_INFO: `${BACKEND_URL}/auth/user-info`,
  UPDATE_PROFILE: `${BACKEND_URL}/auth/update-profile`,
  ADD_IMAGE: `${BACKEND_URL}/auth/add-image`,
};
