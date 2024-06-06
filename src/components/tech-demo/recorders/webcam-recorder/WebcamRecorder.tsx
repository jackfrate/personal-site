"use-client";

import { noSSR } from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { RecorderProps } from "../../../new-recorder/landing/Landing";

const WebcamRecorder = ({
  mediaStream,
  isRecording,
  onStart,
  onStop,
}: RecorderProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [readyToRecord, setReadyToRecord] = useState(false);

  useEffect(() => {
    if (!mediaStream || !videoRef.current) {
      return;
    }
    // setReadyToRecord(false);
    // TODO: handle browsers that don't support srcObject
    // has to be before src is set
    videoRef.current.onloadedmetadata = () => {
      setReadyToRecord(true);
    };

    videoRef.current.srcObject = mediaStream;
  }, [mediaStream, setReadyToRecord]);
  noSSR

  return (
    <div className="relative flex h-full w-full flex-col items-center gap-4 pt-4">
      <div>
        <video
          className="max-h-[50vh]"
          muted
          autoPlay
          controls={false}
          ref={videoRef}
        ></video>
      </div>
      <div className="inline-flex flex-row ">
        {!isRecording && (
          <button
            className="btn-error btn"
            onClick={onStart}
            disabled={!readyToRecord}
          >
            Start Recording
          </button>
        )}
        {isRecording && (
          <button className="btn-error btn" onClick={onStop}>
            Stop
          </button>
        )}
        {/* TODO: add pause/resume and cancel */}
      </div>
    </div>
  );
};

export default WebcamRecorder;
