import { useQuery } from "@tanstack/react-query";
import { getInflight, getReady } from "../services/getFileStatus";

interface Props {
  mode: "inflight" | "ready";
  baseURL?: string;
}

const useFetchFileStatus = ({ mode, baseURL }: Props) => {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: [mode],
    queryFn: () =>
      mode === "inflight" ? getInflight(baseURL) : getReady(baseURL),
  });

  return { isLoading, isError, error, data };
};

export default useFetchFileStatus;
