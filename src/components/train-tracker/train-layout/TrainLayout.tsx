"use-client";

import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { env } from "../../../env/client.mjs";
import type { CTATrainTimes, TrainEta } from "../../../types/train-time.type";
import type { Station } from "../station-selector/StationSelector";
import StationSelector from "../station-selector/StationSelector";
import TrainListing from "../train-listing/TrainListing";

const TRAIN_QUERY_TIME = 10000;

const TrainLayout = () => {
  const queryClient = useQueryClient();

  const [selectedStation, setSelectedStation] = useState<Station>({
    id: "40320",
    station_name: "Division",
  });

  const url = `${env.NEXT_PUBLIC_TRAIN_API_BASE_URL}/trainTimes/timesAtStop/${selectedStation.id}`;

  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: [`train-times-${selectedStation.id}`],
    queryFn: async (): Promise<CTATrainTimes> => {
      const response = await fetch(url);
      const loadedData = await response.json();
      console.table(loadedData);
      return loadedData as CTATrainTimes;
    },
    enabled: !!selectedStation,
    refetchInterval: TRAIN_QUERY_TIME,
    cacheTime: 0,
  });

  const selectStation = (station: Station) => {
    setSelectedStation(station);
    queryClient.invalidateQueries({
      queryKey: [`train-times`, selectedStation.id],
    });
  };

  return (
    <div className="flex w-full max-w-screen-md flex-col gap-3">
      <StationSelector
        activeStation={selectedStation}
        setActiveStation={selectStation}
      />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error getting trains 😢</div>}
      {isSuccess &&
        data?.etaList?.length > 0 &&
        data.etaList.map((trainEta: TrainEta, index) => (
          <TrainListing key={index} trainEta={trainEta} />
        ))}
      {isSuccess && data?.etaList?.length === 0 && (
        <div>No Trains At This Time</div>
      )}
      <div>
        <p>
          Data is provided via CTA api, and updates every{" "}
          {TRAIN_QUERY_TIME / 1000} seconds.
        </p>
      </div>
    </div>
  );
};

export default TrainLayout;
