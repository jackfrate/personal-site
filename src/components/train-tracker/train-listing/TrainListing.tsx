"use-client";

import type { TrainEta } from "../../../types/train-time.type";

type TrainListingProps = {
  trainEta: TrainEta;
  secondsSineLastUpdate: number;
};

// function that converts a date to hh:MM:ss format
function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

function convertMsToTime(milliseconds: number) {
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  seconds = seconds % 60;
  minutes = minutes % 60;

  // 👇️ If you want to roll hours over, e.g. 00 to 24
  // 👇️ uncomment the line below
  // uncommenting next line gets you `00:00:00` instead of `24:00:00`
  // or `12:15:31` instead of `36:15:31`, etc.
  // 👇️ (roll hours over)
  // hours = hours % 24;

  return `${padTo2Digits(hours)}:${padTo2Digits(minutes)}:${padTo2Digits(
    seconds
  )}`;
}

const roundTrainEtaTime = (timeInMs: number) => {
  return Math.round(timeInMs / 1000) * 1000;
};

const getTimeUntilArrival = (trainEta: TrainEta, msSinceLastUpdate: number) => {
  const currentTimeMs = Date.now();
  const arrivalTimeMs = roundTrainEtaTime(Date.parse(trainEta.arrivalTime));

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
