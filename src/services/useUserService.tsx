

import { IFetchData, useGetData } from "@/hooks/useGetData";
import usePostData, { IPostData } from "@/hooks/usePostData";

export const useLogin = () => {
    const { postData, data, loading, message, status, error, isError } = usePostData();

    return {
        postLogin: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/v1/customer/login",
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
    const { postData, data, loading, message, status, error, isError } = usePostData();

    return {
        postRegister: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/v1/customer/create",
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
        registerIsError: isError || data?.status == '1',
    };
};

export const useSentOtp = () => {
    const { postData, data, loading, message, status, error, isError } = usePostData();

    return {
        postSentOtp: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/v1/customer/send-otp",
                header: header,
                option: option,
                queryParams: queryParams,
                body: body,
            }),
        sentOtp: data,
        sentOtpLoading: loading,
        sentOtpMessage: message,
        sentOtpStatus: status,
        sentOtpError: error || data?.message,
        sentOtpIsError: isError || data?.status == '1',
    };
};

export const useVerifyOtp = () => {
    const { postData, data, loading, message, status, error, isError } = usePostData();

    return {
        postVerifyOtp: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/v1/customer/otp",
                header: header,
                option: option,
                queryParams: queryParams,
                body: body,
            }),
        verifyOtp: data,
        verifyOtpLoading: loading,
        verifyOtpMessage: message,
        verifyOtpStatus: status,
        verifyOtpError: error || data?.message,
        verifyOtpIsError: isError || data?.status == '1',
    };
};


export const useGetCurrentUser = () => {
    const { fetchData, data, loading, message, status, error, isError } = useGetData();

    return {
        fetchCurrentUser: ({ header, option, queryParams }: IFetchData) =>
            fetchData({
                urlPath: "api/v1/customer/get/" + queryParams?.id,
                header: header,
                option: option,
                queryParams: queryParams,
            }),
        currentUser: data,
        currentUserLoading: loading,
        currentUserMessage: message,
        currentUserStatus: status,
        currentUserError: error || data?.message,
        currentUserIsError: isError || data?.status == '1',
    };
};

export const useResetPassword = () => {
    const { postData, data, loading, message, status, error, isError } = usePostData();

    return {
        postResetPassword: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/v1/customer/forgot-whatsapp",
                header: header,
                option: option,
                queryParams: queryParams,
                body: body,
            }),
        resetPassword: data,
        resetPasswordLoading: loading,
        resetPasswordMessage: message,
        resetPasswordStatus: status,
        resetPasswordError: error || data?.message,
        resetPasswordIsError: isError || data?.status == '1',
    };
}

export const useVerifyOtpResetPassword = () => {
    const { postData, data, loading, message, status, error, isError } = usePostData();

    return {
        postVerifyOtp: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "api/v1/customer/otp",
                header: header,
                option: option,
                queryParams: queryParams,
                body: body,
            }),
        verifyOtp: data,
        verifyOtpLoading: loading,
        verifyOtpMessage: message,
        verifyOtpStatus: status,
        verifyOtpError: error || data?.message,
        verifyOtpIsError: isError || data?.status == '1',
    };
};

export const useNewPassword = () => {
    const { postData, data, loading, message, status, error, isError } = usePostData();

    return {
        postNewPassword: ({ header, option, queryParams, body }: IPostData) =>
            postData({
                urlPath: "/api/v1/customer/new-password/" + body.token,
                header: header,
                option: option,
                queryParams: queryParams,
                body: {
                    password: body.password
                },
            }),
        newPassword: data,
        newPasswordLoading: loading,
        newPasswordMessage: message,
        newPasswordStatus: status,
        newPasswordError: error || data?.message,
        newPasswordIsError: isError || data?.status == '1',
    };
}
