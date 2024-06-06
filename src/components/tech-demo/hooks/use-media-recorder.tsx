import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

export type UseMediaRecorderProps = {
  // Nothing here yet
};

export default function useMediaRecorder() {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [isRecording, setIsRecording] = useState(false);

  const [finishedRecording, setFinishedRecording] = useState<Blob>();
  const [constraints, setConstraints] = useState<MediaStreamConstraints>();

  const [recordingMode, setRecordingMode] = useLocalStorage<
    "screen" | "webcam"
  >("RECORDING_MODE", "webcam");

  useEffect(() => {
    if (mediaRecorder) {
      const recorderChunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (e) => recorderChunks.push(e.data);
      mediaRecorder.onstop = () => {
        const _finishedRecording = new Blob(recorderChunks);
        setFinishedRecording(_finishedRecording);
      };
    }
  }, [mediaRecorder]);

  const startRecording = () => {
    if (!mediaRecorder) {
      return;
    }
    mediaRecorder.start();
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (!mediaRecorder) {
      return;
    }
    mediaRecorder.stop();
    setIsRecording(false);
  };

  const resetRecorder = () => setFinishedRecording(undefined);

  const onConstraintsChange = (
    _constraints: MediaStreamConstraints | undefined
  ) => {
    if (!_constraints) {
      setConstraints(_constraints);
      return;
    }

    if (JSON.stringify(_constraints) !== JSON.stringify(constraints)) {
      setConstraints(_constraints);
    }
  };

  return {
    isRecording,
    setIsRecording,
    setMediaRecorder,
    constraints,
    setConstraints,
    finishedRecording,
    recordingMode,
    setRecordingMode,
    startRecording,
    stopRecording,
    resetRecorder,
    onConstraintsChange,
  };
}
