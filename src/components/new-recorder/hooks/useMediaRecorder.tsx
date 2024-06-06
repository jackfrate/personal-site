import { useEffect, useMemo, useState } from "react";
import type { RecordingType } from "../util/strategies";
import { MediaStreamStrategyMap } from "../util/strategies";

export default function useMediaRecorder() {
  // TODO: use local storage for this at some point
  const [recordingType, setRecordingType] = useState<RecordingType>("webcam");

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [isRecording, setIsRecording] = useState(false);

  const [completedRecording, setCompletedRecording] = useState<Blob>();
  const [constraints, setConstraints] = useState<MediaStreamConstraints>();

  // TODO: do we need use memo?
  const setupMediaStream = useMemo(() => {
    return MediaStreamStrategyMap[recordingType];
  }, [recordingType]);

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

  const resetRecorder = () => setCompletedRecording(undefined);

  // Checks if the constraints have REALLY changed
  const changeConstraints = (
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

  useEffect(() => {
    if (!mediaRecorder) {
      return;
    }

    const recorderChunks: BlobPart[] = [];

    mediaRecorder.ondataavailable = (e) => recorderChunks.push(e.data);

    mediaRecorder.onstop = () => {
      const _finishedRecording = new Blob(recorderChunks);
      setCompletedRecording(_finishedRecording);
    };
  }, [mediaRecorder]);

  useEffect(() => {
    if (!constraints) {
      return;
    }
    setupMediaStream(constraints, setMediaStream, setMediaRecorder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [mediaStream]);

  return {
    recordingType,
    setRecordingType,
    isRecording,
    constraints,
    mediaStream,
    setConstraints,
    startRecording,
    stopRecording,
    resetRecorder,
    onConstraintsChange: changeConstraints,
    completedRecording,
  };
}
