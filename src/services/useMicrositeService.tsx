import { IFetchData, useGetData } from "@/hooks/useGetData";
import usePostData, { IPostData } from "@/hooks/usePostData";

export const useGetAllMicrosite = () => {
  const { fetchData, data, loading, message, status, error, isError } =
    useGetData();

  return {
    fetchMicrosites: ({ header, option, queryParams }: IFetchData) =>
      fetchData({
        urlPath: "api/microsites",
        header: header,
        option: option,
        queryParams: queryParams,
      }),
    microsites: data,
    micrositesLoading: loading,
    micrositesMessage: message,
    micrositesStatus: status,
    micrositesError: error || data?.message,
    micrositesIsError: isError || data?.status == "1",
  };
};

export const useCreateMicrosite = () => {
  const { postData, data, loading, message, status, error, isError } =
    usePostData();

  return {
    postMicrosite: ({ header, option, queryParams, body }: IPostData) =>
      postData({
        urlPath: "api/microsites",
        header: header,
        option: option,
        queryParams: queryParams,
        body: body,
      }),
    microsite: data,
    micrositeLoading: loading,
    micrositeMessage: message,
    micrositeStatus: status,
    micrositeError: error,
    micrositeIsError: isError,
  };
};

export const useUpdateMicrosite = () => {
  const { postData, data, loading, message, status, error, isError } =
    usePostData();

  return {
    postUpdateMicrosite: ({ header, option, queryParams, body }: IPostData) =>
      postData({
        urlPath: "api/microsites/update",
        header: header,
        option: option,
        queryParams: queryParams,
        body: body,
      }),
    updateMicrosite: data,
    updateMicrositeLoading: loading,
    updateMicrositeMessage: message,
    updateMicrositeStatus: status,
    updateMicrositeError: error,
    updateMicrositeIsError: isError,
  };
};

export const useDeleteMicrosite = () => {
  const { postData, data, loading, message, status, error, isError } =
    usePostData();

  return {
    postDeleteMicrosite: ({ header, option, queryParams, body }: IPostData) =>
      postData({
        urlPath: "api/microsites/delete",
        header: header,
        option: option,
        queryParams: queryParams,
        body: body,
      }),
    deleteMicrosite: data,
    deleteMicrositeLoading: loading,
    deleteMicrositeMessage: message,
    deleteMicrositeStatus: status,
    deleteMicrositeError: error,
    deleteMicrositeIsError: isError,
  };
};
