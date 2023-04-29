"use-client";

import { useEffect, useState } from "react";
import WebcamRecorder from "../webcam-recorder/WebcamRecorder";
import type { RecordingContainerProps } from "./recording-container-props";

const WebcamRecordingContainer = ({
  isRecording,
  webcamConstraints,
  setMediaRecorder,
  startRecording,
  stopRecording,
}: RecordingContainerProps) => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();

  const setupMediaStream = async (_constraints: MediaStreamConstraints) => {
    try {
      const webcamMediaStream = await navigator.mediaDevices.getUserMedia(
        _constraints
      );

      const mediaRecorder = new MediaRecorder(webcamMediaStream);

      setMediaStream(webcamMediaStream);
      setMediaRecorder(mediaRecorder);
    } catch (e) {
      console.error(e, "could not set media stream");
    }
  };

  useEffect(() => {
    setupMediaStream(webcamConstraints);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webcamConstraints]);

  useEffect(() => {
    return () => {
      if (!mediaStream) {
        return;
      }

      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    };
  }, [mediaStream]);

  return (
    <div className="flex flex-col items-center">
      {mediaStream !== undefined ? (
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
        <p>Loading Webcam...</p>
      )}
    </div>
  );
};

export default WebcamRecordingContainer;
