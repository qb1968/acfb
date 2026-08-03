import axios from "axios";

let initialized = false;
let requests = 0;

export function setupAxios(setLoading) {
  if (initialized) return;

  initialized = true;

  axios.interceptors.request.use((config) => {
    requests++;

    setLoading(true);

    return config;
  });

  axios.interceptors.response.use(
    (response) => {
      requests--;

      if (requests <= 0) {
        setLoading(false);
      }

      return response;
    },

    (error) => {
      requests--;

      if (requests <= 0) {
        setLoading(false);
      }

      return Promise.reject(error);
    },
  );
}
