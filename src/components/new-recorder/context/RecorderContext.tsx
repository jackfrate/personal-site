// TODO: make this context that consumes the hooks

import { createContext, ReactElement } from "react";
import useMediaRecorder from "../hooks/useMediaRecorder";
import { RecordingType } from "../util/strategies";

export type RecorderContextType = {
  recordingType: RecordingType;
  isRecording: boolean;
  mediaStream: MediaStream | undefined;
  completedRecording: Blob | undefined;
  constraints: MediaStreamConstraints | undefined;
  startRecording: () => void;
  stopRecording: () => void;
  onConstraintsChange: (
    constraints: MediaStreamConstraints | undefined
  ) => void;
};

export const RecorderContext = createContext<RecorderContextType>({
  recordingType: "webcam",
  isRecording: false,
  mediaStream: undefined,
  completedRecording: undefined,
  constraints: undefined,

  startRecording: () => {},
  stopRecording: () => {},
  onConstraintsChange: (constraints: MediaStreamConstraints | undefined) => {},
});

export const RecorderContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const {
    recordingType,
    isRecording,
    mediaStream,
    stopRecording,
    startRecording,
    onConstraintsChange,
    completedRecording,
    resetRecorder,
    constraints,
    setConstraints,
  } = useMediaRecorder();

  const contextValue = {
    recordingType: recordingType ?? "webcam",
    isRecording,
    mediaStream,
    completedRecording,
    constraints,
    setConstraints,
    resetRecorder,
    startRecording,
    stopRecording,
    onConstraintsChange,
  };

  return (
    <RecorderContext.Provider value={contextValue}>
      {children}
    </RecorderContext.Provider>
  );
};
