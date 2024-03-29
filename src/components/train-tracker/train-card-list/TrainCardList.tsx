import { useQuery } from "react-query";
import type { CTATrainTimes } from "../../../types/train-time.type";
import useGetBaseUrl from "../hooks/useGetBaseUrl";
import TrainCard from "../train-card/TrainCard";

const TRAIN_QUERY_TIME_MS = 10000;

type TrainCardListProps = {
  activeStationId: string;
};

const TrainCardList = ({ activeStationId }: TrainCardListProps) => {
  const baseUrl = useGetBaseUrl();

  const url = `${baseUrl}/api/trainTimes/timesAtStop/${activeStationId}`;

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: [`train-times-${activeStationId}`],
    queryFn: async (): Promise<CTATrainTimes> => {
      const response = await fetch(url);
      const loadedData = await response.json();
      return loadedData as CTATrainTimes;
    },
    enabled: !!activeStationId,
    refetchInterval: TRAIN_QUERY_TIME_MS,
    cacheTime: 0,
  });

  return (
    <div className="flex w-full flex-col items-center gap-2 px-4">
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error getting trains 😢</div>}
      {isSuccess &&
        data?.etaList?.map((trainEta, index) => (
          <TrainCard key={index} trainEta={trainEta} />
        ))}
      {isSuccess && data?.etaList?.length === 0 && (
        <div>No trains available at this time</div>
      )}
    </div>
  );
};

export default TrainCardList;
