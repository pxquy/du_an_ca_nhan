import { Api } from "../Api/api";

export const StatisticalApi = async () => {
  const { data } = await Api.get("statistical");
  console.log("statistical", data.data);
  return data.data;
};
