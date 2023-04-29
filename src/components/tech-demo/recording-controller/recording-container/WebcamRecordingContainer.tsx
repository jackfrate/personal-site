"use-client";

import { useEffect, useState } from "react";
import WebcamRecorder from "../webcam-recorder/WebcamRecorder";

export type RecordingContainerProps = {
  isRecording: boolean;
  constraints: MediaStreamConstraints;
  setMediaRecorder: (mediaRecorder: MediaRecorder) => void;
  startRecording: () => void;
  stopRecording: () => void;
};

const WebcamRecordingContainer = ({
  isRecording,
  constraints,
  setMediaRecorder,
  startRecording,
  stopRecording,
}: RecordingContainerProps) => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();

  const yeet = async (_constraints: MediaStreamConstraints) => {
    try {
      const _mediaStream = await navigator.mediaDevices.getUserMedia(
        _constraints
      );

      const _mediaRecorder = new MediaRecorder(_mediaStream);

      setMediaStream(_mediaStream);
      setMediaRecorder(_mediaRecorder);
    } catch (e) {
      console.error(e, "could not set media stream");
    }
  };

  useEffect(() => {
    yeet(constraints);
  }, [constraints]);

  useEffect(() => {
    return () => {
      if (!mediaStream) {
        return;
      }

      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, []);

  return mediaStream !== undefined ? (
    <div>
      {
        <WebcamRecorder
          mediaStream={mediaStream}
          isRecording={isRecording}
          onStart={startRecording}
          onStop={stopRecording}
        />
      }
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default WebcamRecordingContainer;
