import React from "react";
import RecordingSettings from "../../tech-demo/recording-settings/RecordingSettings";
import ScreenRecorder from "../components/recorders/screen-recorder/ScreenRecorder";
import WebcamRecorder from "../components/recorders/webcam-recorder/WebcamRecorder";
import useMediaRecorder from "../hooks/useMediaRecorder";
import type { RecordingType } from "../util/strategies";

export type RecorderProps = {
  mediaStream: MediaStream | undefined;
  // readyToRecord: boolean;
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  // onPause: () => void;
  // onCancel: () => void;
};
// TODO: move this to another file
const RecorderMap: Record<RecordingType, React.FC<RecorderProps>> = {
  screen: ScreenRecorder,
  webcam: WebcamRecorder,
};

const Landing = () => {
  const {
    recordingType,
    isRecording,
    mediaStream,
    stopRecording,
    startRecording,
    onConstraintsChange,
  } = useMediaRecorder();

  const RecorderComponent = RecorderMap[recordingType];

  return (
    <div className="flex h-screen w-full flex-col gap-3 p-4 md:flex-row">
      <RecorderComponent
        mediaStream={mediaStream}
        isRecording={isRecording}
        onStart={startRecording}
        onStop={stopRecording}
      />

      <RecordingSettings onConstraintsChange={onConstraintsChange} />
    </div>
  );
};

export default Landing;
