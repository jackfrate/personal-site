"use-client";
import { AiFillClockCircle } from "react-icons/ai";
import { MdGpsFixed } from "react-icons/md";
import { twMerge } from "tailwind-merge";
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
    return "";
  } else if (ctaRouteName === "Yellow") {
    return "text-black";
  } else {
    return "text-white";
  }
};

const TrainListing = ({
  trainEta,
  secondsSineLastUpdate: msSinceLastUpdate,
}: TrainListingProps) => {
  const timeUntilArrival = getTimeUntilArrival(trainEta, msSinceLastUpdate);

  const backgroundColor =
    `[${ctaColorMap[trainEta.abbreviatedRouteName]}]` ?? "base-300";

  const textColorStyle = getTextColor(trainEta.abbreviatedRouteName);

  const cardClasses = twMerge(`
    card-body
    rounded-lg
    bg-${backgroundColor}
    ${textColorStyle}
  `);

  const textStyle = twMerge(`
    card-title
    flex
    justify-between
    ${textColorStyle}
  `);

  return (
    <div className={cardClasses}>
      <div className={textStyle}>
        <div>
          <h2>{trainEta.destinationStationName}</h2>
        </div>
        <div className="flex flex-row items-center gap-4">
          <h2>{timeUntilArrival}</h2>
          {trainEta.isBasedOnSchedule ? <AiFillClockCircle /> : <MdGpsFixed />}
        </div>
      </div>
    </div>
  );
};

export default TrainListing;
