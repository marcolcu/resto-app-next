import { IFetchData, useGetData } from "@/hooks/useGetData";
import usePostData, { IPostData } from "@/hooks/usePostData";

export const useGetReservations = () => {
  const { fetchData, data, loading, message, status, error, isError } =
      useGetData();

  return {
    fetchReservations: ({ header, option, queryParams }: IFetchData) =>
        fetchData({
          urlPath: "api/reservations",
          header: header,
          option: option,
          queryParams: queryParams,
        }),
    getReservations: data,
    getReservationsLoading: loading,
    getReservationsMessage: message,
    getReservationsStatus: status,
    getReservationsError: error || data?.message,
    getReservationsIsError: isError || data?.status == "1",
  };
};

export const useCreateReservations = () => {
  const { postData, data, loading, message, status, error, isError } =
      usePostData();

  return {
    postReservations: ({ header, option, queryParams, body }: IPostData) =>
        postData({
          urlPath: "api/reservations",
          header: header,
          option: option,
          queryParams: queryParams,
          body: body,
        }),
    reservations: data,
    reservationsLoading: loading,
    reservationsMessage: message,
    reservationsStatus: status,
    reservationsError: error,
    reservationsIsError: isError,
  };
};

export const useUpdateReservations = () => {
  const { postData, data, loading, message, status, error, isError } =
      usePostData();

  return {
    postUpdateReservations: ({ header, option, queryParams, body }: IPostData) =>
        postData({
          urlPath: "api/reservations/update",
          header: header,
          option: option,
          queryParams: queryParams,
          body: body,
        }),
    updateReservations: data,
    updateReservationsLoading: loading,
    updateReservationsMessage: message,
    updateReservationsStatus: status,
    updateReservationsError: error,
    updateReservationsIsError: isError,
  };
};

export const useDeleteReservations = () => {
  const { postData, data, loading, message, status, error, isError } =
      usePostData();

  return {
    postDeleteReservations: ({ header, option, queryParams, body }: IPostData) =>
        postData({
          urlPath: "api/reservations/delete",
          header: header,
          option: option,
          queryParams: queryParams,
          body: body,
        }),
    deleteReservations: data,
    deleteReservationsLoading: loading,
    deleteReservationsMessage: message,
    deleteReservationsStatus: status,
    deleteReservationsError: error,
    deleteReservationsIsError: isError,
  };
};
