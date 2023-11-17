import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import type { CTATrainTimes } from "../../../types/train-time.type";
import useGetBaseUrl from "../hooks/useGetBaseUrl";
import type { Station } from "../old/station-selector/StationSelector";
import TrainCard from "./TrainCard";

const TRAIN_QUERY_TIME_MS = 10000;

const TrainCardList = () => {
  const baseUrl = useGetBaseUrl();

  const queryClient = useQueryClient();

  const [selectedStation, setSelectedStation] = useState<Station>({
    id: "40320",
    station_name: "Division",
  });

  // TODO: this is bad lol, fix it
  const url = `${baseUrl}/api/trainTimes/timesAtStop/${selectedStation.id}`;

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: [`train-times-${selectedStation.id}`],
    queryFn: async (): Promise<CTATrainTimes> => {
      const response = await fetch(url);
      const loadedData = await response.json();
      console.table(loadedData);
      return loadedData as CTATrainTimes;
    },
    enabled: !!selectedStation,
    refetchInterval: TRAIN_QUERY_TIME_MS,
    cacheTime: 0,
  });

  const selectStation = (station: Station) => {
    setSelectedStation(station);
    queryClient.invalidateQueries({
      queryKey: [`train-times`, selectedStation.id],
    });
  };

  return (
    <div className="flex w-full flex-col items-center gap-2">
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
