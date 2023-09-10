"use-client";

import { useState } from "react";
import { useQuery } from "react-query";
import type { CTATrainTimes, TrainEta } from "../../../types/train-time.type";
import TrainListing from "../train-listing/TrainListing";

const TRAIN_QUERY_TIME = 10000;

const TrainLayout = () => {
  // TODO: this will eventually countdown times
  const [secondsSinceUpdate, setMsSinceTimeUpdate] = useState(0);
  const [selectedStation, setSelectedStation] = useState<string>("40320");

  const url = `${`http://localhost:8080`}/timesAtStop/${selectedStation}`;

  const { isLoading, data } = useQuery({
    queryKey: "train-times",
    queryFn: async (): Promise<CTATrainTimes> => {
      console.log(url);
      const response = await fetch(url, {
        method: "GET",
        // redirect: "follow",
        mode: "no-cors",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(JSON.stringify(response, null, 2));
      const loadedData = await response.json();
      console.table("data+ ", loadedData);
      return loadedData as CTATrainTimes;
    },
    enabled: !!selectedStation,
    refetchInterval: TRAIN_QUERY_TIME,
  });

  return (
    <div className="flex flex-col">
      {isLoading && <div>Loading...</div>}
      {data &&
        data.etaList.map((trainEta: TrainEta, index) => (
          <TrainListing
            key={index}
            trainEta={trainEta}
            secondsSineLastUpdate={secondsSinceUpdate}
          />
        ))}
    </div>
  );
};

export default TrainLayout;
