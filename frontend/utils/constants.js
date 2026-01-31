export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:9000/api/v1";

export const SOCKET_URL =
  import.meta.env.VITE_SOCKET_URL || "http://localhost:9000";

export const AUTH_ROUTES = {
  REGISTER: `${BACKEND_URL}/auth/register`,
  LOGIN: `${BACKEND_URL}/auth/login`,
  USER_INFO: `${BACKEND_URL}/auth/user-info`,
  UPDATE_PROFILE: `${BACKEND_URL}/auth/update-profile`,
  ADD_IMAGE: `${BACKEND_URL}/auth/add-image`,
  DELETE_IMAGE: `${BACKEND_URL}/auth/delete-image`,
  LOGOUT: `${BACKEND_URL}/auth/logout`,
};

export const CONTACT_ROUTES = {
  SEARCH: `${BACKEND_URL}/contacts/search`,
  GET_CONTACTS_FOR_DM: `${BACKEND_URL}/contacts/get-contacts`,
  GET_CONTACTS: `${BACKEND_URL}/contacts/all-contacts`,
};

export const MESSAGE_ROUTES = {
  GET_MESSAGES: `${BACKEND_URL}/messages/get-messages`,
  UPLOAD_FILE: `${BACKEND_URL}/messages/upload-file`,
  DOWNLOAD_FILE: `${BACKEND_URL}/messages/download-file`,
};
