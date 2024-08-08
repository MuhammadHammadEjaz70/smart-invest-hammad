import { toast } from "react-toastify";
import axios from "axios";

export const BASE_URL = "https://smartinvest.global/backend/";
export const Url = BASE_URL;
axios.defaults.baseURL = "https://smartinvest.global/backend/";

// export const BASE_URL = "http://localhost:4000/backend/";
// export const Url = BASE_URL;
// axios.defaults.baseURL = "http://localhost:4000/backend/";

export const adminPermissions = [];
export const superAdminPermissions = [];

export const fetchGetDataApi = async (path: any) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("userToken")}`;
  try {
    const response = await axios.get(path);
    return response;
  } catch (error) {
    console.error("Error fetching data from API: ", error);
    throw error; // Optionally re-throw the error to handle it in the component.
  }
};

export const postDataToApi = async (path: any, data = {}) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("userToken")}`;

  try {
    const response = await axios.post(path, data);
    return response;
  } catch (error) {
    console.error("Error posting data to API: ", error);
    throw error; // Optionally re-throw the error to handle it in the component.
  }
};

export const deleteDataFromApi = async (path: any, data = {}) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("userToken")}`;

  try {
    const response = await axios.delete(path, { data });
    return response;
  } catch (error) {
    console.error("Error deleting data from API: ", error);
    throw error;
  }
};

export const updateDataToApi = async (path: any, data = {}) => {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("userToken")}`;

  try {
    const response = await axios.patch(path, data);
    return response;
  } catch (error) {
    console.error("Error posting data to API: ", error);
    throw error; // Optionally re-throw the error to handle it in the component.
  }
};

export const navigateTo = (event: any, url: string) => {
  if (event) event.preventDefault();
  window.location.replace(url);
};

export const searchData = (value: string, title: any, url: any) => {
  let data: any = {
    filter: value,
  };
  if (value) {
    postRequest(url, data)
      .then((response: any) => {
        let response_data = {
          data: response?.data?.result.filteredData,
          start: 0,
          end: 0,
          total: response?.data?.result?.filteredData?.length,
        };
      })
      .catch((err) => {
        if (err?.status === 401) {
          localStorage.removeItem("token");
          navigateTo(null, "/auth/login");
        }
        toast.error(err?.data?.message);
      });
  } else {
  }
};

export const postRequest = (url: any, data = null) => {
  return new Promise(async (resolve, reject) => {
    let token = localStorage.getItem("token") || "";
    let response: any = await axios
      .post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((e: any) => {
        reject(e.response);
      });
    if (response?.status === 200) resolve(response);
  });
};

export const permissionCheck = (permissionName: string) => {
  const role =
    typeof window !== "undefined" ? localStorage.getItem("userType") : [];
  let permissions: any = []; // Explicitly specify the type

  if (role === "SuperAdmin") {
    permissions = superAdminPermissions;
  } else if (role === "Admin") {
    permissions = adminPermissions;
    return true;
  } else {
    permissions =
      typeof window !== "undefined"
        ? localStorage.getItem("userPermissions")
        : [];
    // Check if window is defined before accessing localStorage
    // Split the permissions string into an array if it exists
  }

  return permissions?.includes(permissionName);
  // return true
};
