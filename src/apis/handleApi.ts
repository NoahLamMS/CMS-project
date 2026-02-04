import axiosClient from "./axios.instance";

interface ApiResponse<T = any> {
  success?: T;
  data?: T;
  errors?: T;
  message?: T;
}

const callApi = async <T = any> (
  url: string,
  payload?: any,
  method: 'post' | 'put' | 'get' | 'delete' = 'get',
): Promise<ApiResponse<T>> => {
  const config: any = {
    method,
    url,
  };

  if (method === 'get' || method === 'delete') {
    config.params = payload;
  } else {
    config.data = payload;
  }

  return await axiosClient(config);
};

export default callApi;
