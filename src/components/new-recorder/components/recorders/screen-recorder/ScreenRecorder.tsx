"use-client";

import { useEffect, useRef, useState } from "react";
import type { RecorderProps } from "../../../landing/Landing";

const ScreenRecorder = ({
  mediaStream,
  isRecording,
  onStart,
  onStop,
}: RecorderProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // TODO: eventually make a loading state with this
  const [readyToRecord, setReadyToRecord] = useState(false);

  useEffect(() => {
    if (!mediaStream || !videoRef.current) {
      return;
    }
    setReadyToRecord(false);
    // TODO: handle browsers that don't support srcObject
    // has to be before src is set
    videoRef.current.onloadedmetadata = () => {
      setReadyToRecord(true);
    };

    videoRef.current.srcObject = mediaStream;
  }, [mediaStream, setReadyToRecord]);

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
          <button className="btn-error btn" onClick={onStart}>
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

export default ScreenRecorder;
