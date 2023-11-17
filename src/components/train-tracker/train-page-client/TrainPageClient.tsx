"use-client";

import { useState } from "react";
import type { Station } from "../station-picker/StationPicker";
import StationPicker from "../station-picker/StationPicker";
import TrainCardList from "../train-card-list/TrainCardList";

const TrainPageClient = () => {
  const [activeStation, setActiveStation] = useState<Station>({
    id: "40320",
    station_name: "Division",
  });

  return (
    <div className="flex w-full justify-center p-4">
      <div className="flex w-full max-w-screen-md flex-col gap-5">
        <StationPicker
          activeStation={activeStation}
          setActiveStation={setActiveStation}
        />
        <TrainCardList activeStationId={activeStation.id} />
        <div>
          <p className="text-sm">
            Train times update every 10 seconds. Data provided from the CTA API.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainPageClient;
