import { IFetchData, useGetData } from "@/hooks/useGetData";
import usePostData, { IPostData } from "@/hooks/usePostData";

export const useGetMenu = () => {
    const { fetchData, data, loading, message, status, error, isError } =
        useGetData();

    return {
        fetchMenu: ({ header, option, queryParams }: IFetchData) =>
            fetchData({
                urlPath: "api/menus",
                header: header,
                option: option,
                queryParams: queryParams,
            }),
        getMenu: data,
        getMenuLoading: loading,
        getMenuMessage: message,
        getMenuStatus: status,
        getMenuError: error || data?.message,
        getMenuIsError: isError || data?.status == "1",
    };
};

export const useCreateMenu = () => {
    const { postData, data, loading, message, status, error, isError } =
        usePostData();

    return {
        postMenu: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/menus",
                header: header,
                option: option,
                queryParams: queryParams,
                body: body,
            }),
        menu: data,
        menuLoading: loading,
        menuMessage: message,
        menuStatus: status,
        menuError: error,
        menuIsError: isError,
    };
};

export const useUpdateMenu = () => {
    const { postData, data, loading, message, status, error, isError } =
        usePostData();

    return {
        postUpdateMenu: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/menus/update",
                header: header,
                option: option,
                queryParams: queryParams,
                body: body,
            }),
        updateMenu: data,
        updateMenuLoading: loading,
        updateMenuMessage: message,
        updateMenuStatus: status,
        updateMenuError: error,
        updateMenuIsError: isError,
    };
};

export const useDeleteMenu = () => {
    const { postData, data, loading, message, status, error, isError } =
        usePostData();

    return {
        postDeleteMenu: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/menus/delete",
                header: header,
                option: option,
                queryParams: queryParams,
                body: body,
            }),
        deleteMenu: data,
        deleteMenuLoading: loading,
        deleteMenuMessage: message,
        deleteMenuStatus: status,
        deleteMenuError: error,
        deleteMenuIsError: isError,
    };
};
