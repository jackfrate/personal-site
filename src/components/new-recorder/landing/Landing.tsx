import React, { useContext } from "react";
import Playback from "../components/playback/Playback";
import ScreenRecorder from "../components/recorders/screen-recorder/ScreenRecorder";
import WebcamRecorder from "../components/recorders/webcam-recorder/WebcamRecorder";
import RecordingSettings from "../components/recording-settings/RecordingSettings";
import {
  RecorderContext,
  RecorderContextProvider,
} from "../context/RecorderContext";
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

const LandingInner = () => {
  const {
    recordingType,
    isRecording,
    mediaStream,
    completedRecording,
    stopRecording,
    startRecording,
    onConstraintsChange,
    resetRecorder,
  } = useContext(RecorderContext);

  const RecorderComponent = RecorderMap[recordingType];

  if (completedRecording) {
    return (
      <Playback
        finishedVideo={completedRecording}
        recordAnotherVideo={resetRecorder}
      />
    );
  }

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

const Landing = () => {
  return (
    <RecorderContextProvider>
      <LandingInner />
    </RecorderContextProvider>
  );
};

export default Landing;
