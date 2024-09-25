import { IFetchData, useGetData } from "@/hooks/useGetData";

export const useGetProfit = () => {
  const { fetchData, data, loading, message, status, error, isError } =
      useGetData();

  return {
    fetchProfit: ({ header, option, queryParams }: IFetchData) =>
        fetchData({
          urlPath: "api/profit",
          header: header,
          option: option,
          queryParams: queryParams,
        }),
    getProfit: data,
    getProfitLoading: loading,
    getProfitMessage: message,
    getProfitStatus: status,
    getProfitError: error || data?.message,
    getProfitIsError: isError || data?.status == "1",
  };
};
