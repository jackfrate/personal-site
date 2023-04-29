"use-client";

import { useEffect, useState } from "react";
import WebcamRecorder from "../webcam-recorder/WebcamRecorder";

export type RecordingContainerProps = {
  isRecording: boolean;
  setMediaRecorder: (mediaRecorder: MediaRecorder) => void;
  startRecording: () => void;
  stopRecording: () => void;
};

const WebcamRecordingContainer = ({
  isRecording,
  setMediaRecorder,
  startRecording,
  stopRecording,
}: RecordingContainerProps) => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();

  const startMediaStream = async () => {
    if (mediaStream || !setMediaStream) {
      return;
    }

    try {
      const _mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const _mediaRecorder = new MediaRecorder(_mediaStream);

      setMediaStream(_mediaStream);
      setMediaRecorder(_mediaRecorder);
    } catch (e) {
      console.error(e, "could not set media stream");
    }
  };

  useEffect(() => {
    // initialize media stream
    // console.log("inside use effect");
    if (!mediaStream) {
      // console.log("setting up media stream inside of effect ");
      startMediaStream();
    }

    return () => {
      // console.log("running cleanup effects");
      if (!mediaStream) {
        return;
      }

      mediaStream.getTracks().forEach((track) => {
        track.stop();
        // console.log("stopping a track");
      });
    };
  }, [mediaStream]);

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
