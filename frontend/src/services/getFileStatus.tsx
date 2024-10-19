import axios from "axios";

export const getInflight = async (url?: string) => {
  const { data } = await axios.get(url ?? "http://localhost:8000/inflight");
  return data;
};

export const getReady = async (url?: string) => {
  const { data } = await axios.get(url ?? "http://localhost:8000/ready");
  return data;
};
