"use-client";

import { useEffect, useState } from "react";
import ScreenRecorder from "../recorders/screen-recorder/ScreenRecorder";
import type { RecordingContainerProps } from "./recording-container-props";

export const ScreenRecordingContainer = ({
  isRecording,
  webcamConstraints,
  setMediaRecorder,
  startRecording,
  stopRecording,
}: RecordingContainerProps) => {
  const [mediaStream, setMediaStream] = useState<MediaStream>();

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

  const setupMediaStream = async (constraints: MediaStreamConstraints) => {
    try {
      // TODO: get the webcam stream when adding webcam interpolation
      const audioConstraints = constraints.audio;

      console.log(JSON.stringify(audioConstraints));

      const displayStreamOptions = {
        video: true,
        systemAudio: "include",
      };

      const displayStream = await navigator.mediaDevices.getDisplayMedia(
        displayStreamOptions
      );

      if (audioConstraints) {
        const streamWithAudioTrack = await navigator.mediaDevices.getUserMedia({
          audio: audioConstraints,
          video: false,
        });

        const audioTrack = streamWithAudioTrack.getAudioTracks()[0];
        if (audioTrack) {
          displayStream.addTrack(audioTrack);
        }
      }

      const mediaRecorder = new MediaRecorder(displayStream);

      setMediaStream(displayStream);
      setMediaRecorder(mediaRecorder);
    } catch (e) {
      console.error(e, "could not set media stream");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 pt-4">
      {mediaStream !== undefined && (
        <ScreenRecorder
          isRecording={isRecording}
          onStart={startRecording}
          onStop={stopRecording}
          mediaStream={mediaStream}
        />
      )}
      {!isRecording && (
        <div>
          <button
            className="btn"
            onClick={() => setupMediaStream(webcamConstraints)}
          >
            Select Screen to Record
          </button>
        </div>
      )}
    </div>
  );
};
