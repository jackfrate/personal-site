import React from "react";
import ScreenRecorder from "../../tech-demo/recorders/screen-recorder/ScreenRecorder";
import WebcamRecorder from "../../tech-demo/recorders/webcam-recorder/WebcamRecorder";
import RecordingSettings from "../../tech-demo/recording-settings/RecordingSettings";
import useMediaRecorder from "../hooks/useMediaRecorder";
import { RecordingType } from "../util/strategies";

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
    <div>
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
