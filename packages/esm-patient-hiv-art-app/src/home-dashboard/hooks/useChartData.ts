import { openmrsFetch } from "@openmrs/esm-framework";

export const useChartData = () => {
  const getChartData = async ({ url, responseCallback, errorCallBack }) => {
    try {
      const response = await openmrsFetch(url);
      responseCallback(response.data);
    } catch (error) {
      errorCallBack(error);
    }
  };

  const formatViralLoadData = (data) => {
    const processedData = data?.summary?.groupYear?.map((item) => {
      const keys = Object.keys(item);
      return {
        value: item[keys[0]],
        group: keys[0],
      };
    });
    return processedData;
  };

  return { getChartData, formatViralLoadData };
};
