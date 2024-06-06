import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { MediaStreamStrategyMap, RecordingType } from "../util/strategies";

// type UseMediaRecorderProps = {
//   recordingType: RecordingType;
// };

// export default function useMediaRecorder({
//   recordingType,
// }: UseMediaRecorderProps) {
export default function useMediaRecorder() {
  const [recordingType] = useLocalStorage<RecordingType>(
    "RECORDING_TYPE",
    "webcam"
  );

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [mediaStream, setMediaStream] = useState<MediaStream>();
  const [isRecording, setIsRecording] = useState(false);

  const [completedRecording, setCompletedRecording] = useState<Blob>();
  const [constraints, setConstraints] = useState<MediaStreamConstraints>();

  const setupMediaStream = MediaStreamStrategyMap[recordingType];

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
      console.log("no restraints");
      setConstraints(_constraints);
      return;
    }

    if (JSON.stringify(_constraints) !== JSON.stringify(constraints)) {
      setConstraints(_constraints);
    } else {
      console.log("same constraints");
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

  // recreate the media stream on new recording type or constraints
  useEffect(() => {
    if (!constraints) {
      return;
    }
    setupMediaStream(constraints, setMediaStream, setMediaRecorder);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [constraints, recordingType]);

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
