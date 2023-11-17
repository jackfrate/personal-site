import { useQuery } from "react-query";
import type { CTATrainTimes } from "../../../types/train-time.type";
import useGetBaseUrl from "../hooks/useGetBaseUrl";
import type { Station } from "../old/station-selector/StationSelector";
import TrainCard from "../train-card/TrainCard";

const TRAIN_QUERY_TIME_MS = 10000;

type TrainCardListProps = {
  activeStation: Station;
  // setSelectedStation: (station: Station) => void;
};

const TrainCardList = ({
  activeStation, // setSelectedStation,
}: TrainCardListProps) => {
  const baseUrl = useGetBaseUrl();

  const url = `${baseUrl}/api/trainTimes/timesAtStop/${activeStation.id}`;

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: [`train-times-${activeStation.id}`],
    queryFn: async (): Promise<CTATrainTimes> => {
      const response = await fetch(url);
      const loadedData = await response.json();
      console.table(loadedData);
      return loadedData as CTATrainTimes;
    },
    enabled: !!activeStation,
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
    </div>
  );
};

export default TrainCardList;
