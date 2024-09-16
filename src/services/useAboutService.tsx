import { IFetchData, useGetData } from "@/hooks/useGetData";
import usePostData, { IPostData } from "@/hooks/usePostData";

export const useGetAbout = () => {
  const { fetchData, data, loading, message, status, error, isError } =
      useGetData();

  return {
    fetchAbout: ({ header, option, queryParams }: IFetchData) =>
        fetchData({
          urlPath: "api/about",
          header: header,
          option: option,
          queryParams: queryParams,
        }),
    getAbout: data,
    getAboutLoading: loading,
    getAboutMessage: message,
    getAboutStatus: status,
    getAboutError: error || data?.message,
    getAboutIsError: isError || data?.status == "1",
  };
};

export const useCreateAbout = () => {
  const { postData, data, loading, message, status, error, isError } =
      usePostData();

  return {
    postAbout: ({ header, option, queryParams, body }: IPostData) =>
        postData({
          urlPath: "api/about",
          header: header,
          option: option,
          queryParams: queryParams,
          body: body,
        }),
    about: data,
    aboutLoading: loading,
    aboutMessage: message,
    aboutStatus: status,
    aboutError: error,
    aboutIsError: isError,
  };
};

export const useUpdateAbout = () => {
  const { postData, data, loading, message, status, error, isError } =
      usePostData();

  return {
    postUpdateAbout: ({ header, option, queryParams, body }: IPostData) =>
        postData({
          urlPath: "api/about/update",
          header: header,
          option: option,
          queryParams: queryParams,
          body: body,
        }),
    updateAbout: data,
    updateAboutLoading: loading,
    updateAboutMessage: message,
    updateAboutStatus: status,
    updateAboutError: error,
    updateAboutIsError: isError,
  };
};

export const useDeleteAbout = () => {
  const { postData, data, loading, message, status, error, isError } =
      usePostData();

  return {
    postDeleteAbout: ({ header, option, queryParams, body }: IPostData) =>
        postData({
          urlPath: "api/about/delete",
          header: header,
          option: option,
          queryParams: queryParams,
          body: body,
        }),
    deleteAbout: data,
    deleteAboutLoading: loading,
    deleteAboutMessage: message,
    deleteAboutStatus: status,
    deleteAboutError: error,
    deleteAboutIsError: isError,
  };
};
