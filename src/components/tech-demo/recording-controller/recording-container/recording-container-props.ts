
export type RecordingContainerProps = {
  isRecording: boolean;
  webcamConstraints: MediaStreamConstraints;
  setMediaRecorder: (mediaRecorder: MediaRecorder) => void;
  startRecording: () => void;
  stopRecording: () => void;
};