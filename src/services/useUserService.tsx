import usePostData, { IPostData } from "@/hooks/usePostData";

export const useLogin = () => {
  const { postData, data, loading, message, status, error, isError } =
    usePostData();

  return {
    postLogin: ({ header, option, queryParams, body }: IPostData) =>
      postData({
        urlPath: "api/login",
        header: header,
        option: option,
        queryParams: queryParams,
        body: body,
      }),
    login: data,
    loginLoading: loading,
    loginMessage: message,
    loginStatus: status,
    loginError: error,
    loginIsError: isError,
  };
};

export const useRegister = () => {
  const { postData, data, loading, message, status, error, isError } =
    usePostData();

  return {
    postRegister: ({ header, option, queryParams, body }: IPostData) =>
      postData({
        urlPath: "api/register",
        header: header,
        option: option,
        queryParams: queryParams,
        body: body,
      }),
    register: data,
    registerLoading: loading,
    registerMessage: message,
    registerStatus: status,
    registerError: error || data?.message,
    registerIsError: isError || data?.status == "1",
  };
};
