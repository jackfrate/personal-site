"use-client";
import { AiFillClockCircle } from "react-icons/ai";
import { MdGpsFixed } from "react-icons/md";
import type { TrainEta } from "../../../types/train-time.type";
import { ctaColorMap } from "../util/cta-color-map";

type TrainListingProps = {
  trainEta: TrainEta;
  secondsSineLastUpdate: number;
};

function padTo2Digits(num: number) {
  return num.toString().padStart(2, "0");
}

function convertMsToTime(milliseconds: number) {
  if (milliseconds < 1000) {
    return "Arriving now";
  }

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

const getTextColor = (ctaRouteName: string | undefined) => {
  if (ctaRouteName === undefined) {
    return "white";
  } else if (ctaRouteName === "Yellow") {
    return "black";
  } else {
    return "white";
  }
};

const TrainListing = ({
  trainEta,
  secondsSineLastUpdate: msSinceLastUpdate,
}: TrainListingProps) => {
  const timeUntilArrival = getTimeUntilArrival(trainEta, msSinceLastUpdate);

  const backgroundColorStyle =
    ctaColorMap[trainEta.abbreviatedRouteName] ?? "#565b5d";
  const textColorStyle = getTextColor(trainEta.abbreviatedRouteName);

  const etaBasedOnSchedule = trainEta.isBasedOnSchedule;

  return (
    <div
      className="card-body rounded-lg"
      style={{
        backgroundColor: backgroundColorStyle,
        color: textColorStyle,
      }}
    >
      <div className="card-title flex justify-between">
        <div className="flex flex-col">
          <p className="text-sm">Train towards</p>
          <h2>{trainEta.destinationStationName}</h2>
        </div>
        <div className="flex flex-col">
          <div>
            <p className="text-sm">Arrives in</p>
          </div>
          <div className="flex flex-row items-center gap-4">
            <h2>{timeUntilArrival}</h2>
            <div
              className="tooltip"
              data-tip={`ETA based on ${
                etaBasedOnSchedule ? "schedule" : "real time tracking"
              }`}
            >
              {etaBasedOnSchedule ? <AiFillClockCircle /> : <MdGpsFixed />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainListing;
