"use-client";

import type { TrainEta } from "../../../types/train-time.type";

type TrainListingProps = {
  trainEta: TrainEta;
  secondsSineLastUpdate: number;
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

function convertMsToTime(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
}

const getTimeUntilArrival = (trainEta: TrainEta, msSinceLastUpdate: number) => {
  const currentTimeMs = Date.now();
  const arrivalTimeMs = Date.parse(trainEta.arrivalTime);

  const timeUntilArrivalMs = arrivalTimeMs - currentTimeMs;

  return convertMsToTime(timeUntilArrivalMs);
};

const TrainListing = ({
  trainEta,
  secondsSineLastUpdate: msSinceLastUpdate,
}: TrainListingProps) => {
  const timeUntilArrival = getTimeUntilArrival(trainEta, msSinceLastUpdate);

  return (
    <div className="card-body">
      <h2 className="card-title">{trainEta.destinationStationName}</h2>
      <div>Arriving in: {timeUntilArrival}</div>
    </div>
  );
};

export default TrainListing;
