"use-client";

import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { env } from "../../../env/client.mjs";
import type { CTATrainTimes, TrainEta } from "../../../types/train-time.type";
import type { Station } from "../station-selector/StationSelector";
import StationSelector from "../station-selector/StationSelector";
import TrainListing from "../train-listing/TrainListing";

const TRAIN_QUERY_TIME = 20000;

const TrainLayout = () => {
  // TODO: this will eventually countdown times
  const [secondsSinceUpdate, setMsSinceTimeUpdate] = useState(0);
  const [selectedStation, setSelectedStation] = useState<Station>({
    id: "40320",
    station_name: "Division",
  });

  const url = `${env.NEXT_PUBLIC_TRAIN_API_BASE_URL}/timesAtStop/${selectedStation.id}`;

  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
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
      queryKey: [`train-times-${selectedStation.id}`],
    });
  };

  return (
    <div className="flex flex-col gap-3">
      <StationSelector
        activeStation={selectedStation}
        setActiveStation={selectStation}
      />
      {isLoading && <div>Loading...</div>}
      {data &&
        data.etaList.map((trainEta: TrainEta, index) => (
          <TrainListing
            key={index}
            trainEta={trainEta}
            secondsSineLastUpdate={secondsSinceUpdate}
          />
        ))}
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
