"use-client";
import type { TrainEta } from "../../../types/train-time.type";
import { ctaColorMap } from "../util/cta-color-map";

type TrainCardProps = {
  trainEta: TrainEta;
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

const getTimeUntilArrival = (trainEta: TrainEta) => {
  const currentTimeMs = Date.now();
  const arrivalTimeMs = Date.parse(trainEta.arrivalTime);

  const timeUntilArrivalMs = arrivalTimeMs - currentTimeMs;

  return convertMsToTime(timeUntilArrivalMs);
};

const blackTextColors = ["Yellow"];

const getTextColor = (ctaRouteName: string | undefined) => {
  return blackTextColors.includes(ctaRouteName ?? "yeet") ? "black" : "white";
};

const TrainCard = ({ trainEta }: TrainCardProps) => {
  const timeUntilArrival = getTimeUntilArrival(trainEta);

  const backgroundColorStyle =
    ctaColorMap[trainEta.abbreviatedRouteName] ?? "#565b5d";

  const textColorStyle = getTextColor(trainEta.abbreviatedRouteName);

  const etaBasedOnSchedule = trainEta.isBasedOnSchedule;

  return (
    <div className="card card-compact w-full flex-wrap bg-base-300">
      <div className="card-body">
        <div>{trainEta.abbreviatedRouteName}</div>
        <div>{trainEta.arrivalTime}</div>
        <div>{trainEta.isBasedOnSchedule ? "Scheduled" : "GPS"}</div>
      </div>
    </div>
  );
};

export default TrainCard;
