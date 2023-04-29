import { useEffect, useState } from "react";
import WebcamRecordingContainer from "./RecordingContainer/WebcamRecordingContainer";

export const DemoContainer = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [isRecording, setIsRecording] = useState(false);

  const [finishedRecording, setFinishedRecording] = useState<Blob>();

  // TODO: create a playback component that handles the srcUrl bullshit

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

  return !finishedRecording ? (
    <div>
      <WebcamRecordingContainer
        setMediaRecorder={(mediaRecorder) => setMediaRecorder(mediaRecorder)}
        isRecording={isRecording}
        startRecording={startRecording}
        stopRecording={stopRecording}
      />
    </div>
  ) : (
    <p>YOU REACHED THE END</p>
  );
};
