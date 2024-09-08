// apiService.js

const BASE_URL = "https://api.webcodecare.com/api";

const fetchApi = async (endpoint, method = "GET", token, body = null) => {
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}/${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  if (method === "POST") {
    return response;
  } else {
    return response.json();
  }
};

// ALl Get Request
export const getUsers = (token) => fetchApi("users", "GET", token);
export const getBranches = (token) => fetchApi("branch", "GET", token);
export const getPartners = (token) => fetchApi("partners", "GET", token);
export const getWaiters = (token) => fetchApi("waiter", "GET", token);
export const getManagers = (token) => fetchApi("branch-manager", "GET", token);
export const getCategories = (token) =>
  fetchApi("partner-category", "GET", token);
export const getHotOffers = (token) => fetchApi("hot-offers", "GET", token);
export const getTranslations = (token) =>
  fetchApi("translations", "GET", token);

// All Create request
export const createUser = (data, token) =>
  fetchApi("user-create", "POST", token, data);
export const createBranch = (data, token) =>
  fetchApi("branch-create", "POST", token, data);
export const createPartner = (data, token) =>
  fetchApi("partner-create", "POST", token, data);
export const createWaiter = (data, token) =>
  fetchApi("waiter-create", "POST", token, data);
export const createManager = (data, token) =>
  fetchApi("branch-manager-create", "POST", token, data);
export const createCategory = (data, token) =>
  fetchApi("partner-category-create", "POST", token, data);
export const createHotOffer = (data, token) =>
  fetchApi("hot-offers-create", "POST", token, data);

// All Update request
export const updateUser = (id, data, token) =>
  fetchApi(`user-update/${id}`, "POST", token, data);
export const updateBranch = (id, data, token) =>
  fetchApi(`branch-update/${id}`, "POST", token, data);
export const updatePartner = (id, data, token) =>
  fetchApi(`partner-update/${id}`, "POST", token, data);
export const updateWaiter = (id, data, token) =>
  fetchApi(`waiter-update/${id}`, "POST", token, data);
export const updateManager = (id, data, token) =>
  fetchApi(`branch-manager-update/${id}`, "POST", token, data);
export const updateHotOffer = (id, data, token) =>
  fetchApi(`hot-offers-update/${id}`, "POST", token, data);

// Example DELETE request
export const deleteUser = (id, token) =>
  fetchApi(`user-delete/${id}`, "POST", token);
export const deleteBranch = (id, token) =>
  fetchApi(`branch-delete/${id}`, "POST", token);
export const deletePartner = (id, token) =>
  fetchApi(`partner-delete/${id}`, "POST", token);
export const deleteWaiter = (id, token) =>
  fetchApi(`waiter-delete/${id}`, "POST", token);
export const deleteManager = (id, token) =>
  fetchApi(`branch-manager-delete/${id}`, "POST", token);
export const deleteHotOffer = (id, token) =>
  fetchApi(`hot-offers-delete/${id}`, "POST", token);
