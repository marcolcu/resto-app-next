import { IFetchData, useGetData } from "@/hooks/useGetData";
import usePostData, { IPostData } from "@/hooks/usePostData";

export const useGeTestimoni = () => {
    const { fetchData, data, loading, message, status, error, isError } =
        useGetData();

    return {
        fetchTestimoni: ({ header, option, queryParams }: IFetchData) =>
            fetchData({
                urlPath: "api/testimonial",
                header: header,
                option: option,
                queryParams: queryParams,
            }),
        geTestimoni: data,
        geTestimoniLoading: loading,
        geTestimoniMessage: message,
        geTestimoniStatus: status,
        geTestimoniError: error || data?.message,
        geTestimoniIsError: isError || data?.status == "1",
    };
};

export const useCreateTestimoni = () => {
    const { postData, data, loading, message, status, error, isError } =
        usePostData();

    return {
        postTestimoni: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/testimonial",
                header: header,
                option: option,
                queryParams: queryParams,
                body: body,
            }),
        testimoni: data,
        testimoniLoading: loading,
        testimoniMessage: message,
        testimoniStatus: status,
        testimoniError: error,
        testimoniIsError: isError,
    };
};

export const useGetAllTestimoni = () => {
    const { fetchData, data, loading, message, status, error, isError } =
        useGetData();

    return {
        fetchAllTestimoni: ({ header, option, queryParams }: IFetchData) =>
            fetchData({
                urlPath: "api/all-testimonial",
                header: header,
                option: option,
                queryParams: queryParams,
            }),
        geTAllTestimoni: data,
        geTAllTestimoniLoading: loading,
        geTAllTestimoniMessage: message,
        geTAllTestimoniStatus: status,
        geTAllTestimoniError: error || data?.message,
        geTAllTestimoniIsError: isError || data?.status == "1",
    };
};