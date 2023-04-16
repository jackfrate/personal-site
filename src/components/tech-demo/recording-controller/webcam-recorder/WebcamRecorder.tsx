"use-client";

import { useEffect, useRef, useState } from "react";

type WebcamRecorderProps = {
  mediaStream: MediaStream | undefined;
  // readyToRecord: boolean;
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  // onPause: () => void;
  // onCancel: () => void;
};

const WebcamRecorder = ({
  mediaStream,
  isRecording,
  onStart,
  onStop,
}: WebcamRecorderProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
    <div className="relative flex h-full w-full flex-col items-center gap-4">
      <div>
        <video muted autoPlay controls={false} ref={videoRef}></video>
      </div>
      <div className="inline-flex flex-row ">
        {!isRecording && (
          <button className="btn" onClick={onStart} disabled={!readyToRecord}>
            Start Recording
          </button>
        )}
        {isRecording && (
          <button className="btn" onClick={onStop}>
            Stop
          </button>
        )}
        {/* TODO: add pause/resume and cancel */}
      </div>
    </div>
  );
};

export default WebcamRecorder;
