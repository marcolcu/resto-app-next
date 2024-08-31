

import { IFetchData, useGetData } from "@/hooks/useGetData";
import usePostData, { IPostData } from "@/hooks/usePostData";

export const useOrderComplete = () => {
    const { postData, data, message, loading, status, error, isError } = usePostData();

    return {
        postOrderComplete: ({ header, option, queryParams }: IFetchData) =>
            postData({
                urlPath: "api/v1/flix/Orders/Complete",
                header: header,
                option: option,
                queryParams: queryParams,
                body: {
                    actionby: process.env.NEXT_PUBLIC_ACTION_BY,
                    ipaddress: "192:1.1.1",
                    apikey: process.env.NEXT_PUBLIC_API_KEY,
                    signature: process.env.NEXT_PUBLIC_SIGNATURE,
                },
            }),
        orderComplete: data,
        orderCompleteMessage: message,
        orderCompleteLoading: loading,
        orderCompleteStatus: status,
        orderCompleteError: error || data?.message,
        orderCompleteIsError: isError || data?.status == '1',
    };
};

export const useOrderCancel = () => {
    const { postData, data, message, loading, status, error, isError } = usePostData();

    return {
        postOrderCancel: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/v1/flix/Orders/Cancel",
                header: header,
                option: option,
                queryParams: queryParams,
                body: {
                    actionby: process.env.NEXT_PUBLIC_ACTION_BY,
                    ipaddress: "192:1.1.1",
                    apikey: process.env.NEXT_PUBLIC_API_KEY,
                    signature: process.env.NEXT_PUBLIC_SIGNATURE,
                    ...body,
                },
            }),
        orderCancel: data,
        orderCancelMessage: message,
        orderCancelLoading: loading,
        orderCancelStatus: status,
        orderCancelError: error || data?.message,
        orderCancelIsError: isError || data?.status == '1',
    };
};

export const useOrderMicrosite = () => {
    const { postData, data, message, loading, status, error, isError } = usePostData();

    return {
        postOrderMicrosite: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/v1/order/create-flix-order/flixcinema",
                header: header,
                option: option,
                queryParams: queryParams,
                body: {
                    actionby: process.env.NEXT_PUBLIC_ACTION_BY,
                    ipaddress: "192:1.1.1",
                    apikey: process.env.NEXT_PUBLIC_API_KEY,
                    signature: process.env.NEXT_PUBLIC_SIGNATURE,
                    ...body
                },
            }),
        orderMicrosite: data,
        orderMicrositeMessage: message,
        orderMicrositeLoading: loading,
        orderMicrositeStatus: status,
        orderMicrositeError: error || data?.message,
        orderMicrositeIsError: isError || data?.status == '1',
    };
};

export const useGetOrderSingle = () => {
    const { fetchData, data, message, loading, status, error, isError } = useGetData();

    return {
        fetchOrderSingle: ({ header, option, queryParams }: IPostData) =>
            fetchData({
                urlPath: "api/v1/order/get/" + queryParams?.id,
                header: header,
                option: option,
            }),
        orderSingle: data,
        orderSingleMessage: message,
        orderSingleLoading: loading,
        orderSingleStatus: status,
        orderSingleError: error || data?.message,
        orderSingleIsError: isError || data?.status == '1',
    };
}

export const useGetOrderHistory = () => {
    const { fetchData, data, message, loading, status, error, isError } = useGetData();

    return {
        fetchOrderHistory: ({ header, option, queryParams, body }: IPostData) =>
            fetchData({
                urlPath: "api/v1/customer/order-history/" + queryParams?.id,
                header: header,
                option: option,
                queryParams: {
                    // order: '_id',
                    sort: 1,
                    // limit: 20,
                    page: 1,
                    field: 'name',
                    value: null,
                    ...queryParams
                },
            }),
        orderHistory: data,
        orderHistoryMessage: message,
        orderHistoryLoading: loading,
        orderHistoryStatus: status,
        orderHistoryError: error || data?.message,
        orderHistoryIsError: isError || data?.status == '1',
    };
};

export const useGetPendingOrder = () => {
    const { fetchData, data, message, loading, status, error, isError } = useGetData();

    return {
        fetchPendingOrder: ({ header, option, queryParams }: IPostData) =>
            fetchData({
                urlPath: "api/v1/customer/get-pending-order/" + queryParams?.customerId,
                header: header,
                option: option,
            }),
        pendingOrder: data,
        pendingOrderMessage: message,
        pendingOrderLoading: loading,
        pendingOrderStatus: status,
        pendingOrderError: error || data?.message,
        pendingOrderIsError: isError || data?.status == '1',
    };
}

export const useCancelPendingOrder = () => {
    const { postData, data, message, loading, status, error, isError } = usePostData();

    return {
        postCancelPendingOrder: ({ header, option, queryParams }: IPostData) =>
            postData({
                urlPath: "api/v1/order/delete/" + queryParams?.id,
                header: header,
                option: option,
            }),
        cancelPendingOrder: data,
        cancelPendingOrderMessage: message,
        cancelPendingOrderLoading: loading,
        cancelPendingOrderStatus: status,
        cancelPendingOrderError: error || data?.message,
        cancelPendingOrderIsError: isError || data?.status == '1',
    };
}

export const useCreateOrder = () => {
    const { postData, data, message, loading, status, error, isError } = usePostData();

    return {
        postCreateOrder: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/v1/order/create-flix-order-draft/flixcinema",
                header: header,
                option: option,
                queryParams: queryParams,
                body: {
                    actionby: process.env.NEXT_PUBLIC_ACTION_BY,
                    ipaddress: "192:1.1.1",
                    apikey: process.env.NEXT_PUBLIC_API_KEY,
                    signature: process.env.NEXT_PUBLIC_SIGNATURE,
                    ...body
                },
            }),
        createOrder: data,
        createOrderMessage: message,
        createOrderLoading: loading,
        createOrderStatus: status,
        createOrderError: error || data?.message,
        createOrderIsError: isError || data?.status == '1',
    };
};

export const useUpdateOrder = () => {
    const { postData, data, message, loading, status, error, isError } = usePostData();

    return {
        postUpdateOrder: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/v1/order/update-flix-order-draft/flixcinema/" + queryParams?.id,
                header: header,
                option: option,
                body: {
                    actionby: process.env.NEXT_PUBLIC_ACTION_BY,
                    ipaddress: "192:1.1.1",
                    apikey: process.env.NEXT_PUBLIC_API_KEY,
                    signature: process.env.NEXT_PUBLIC_SIGNATURE,
                    ...body
                },
            }),
        updateOrder: data,
        updateOrderMessage: message,
        updateOrderLoading: loading,
        updateOrderStatus: status,
        updateOrderError: error || data?.message,
        updateOrderIsError: isError || data?.status == '1',
    };
};