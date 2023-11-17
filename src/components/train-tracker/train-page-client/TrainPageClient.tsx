"use-client";

import StationPicker from "../station-picker/StationPicker";
import TrainCardList from "../train-card-list/TrainCardList";

const TrainPageClient = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-screen-md flex-col gap-5">
        <StationPicker />
        <TrainCardList />
      </div>
    </div>
  );
};

export default TrainPageClient;
