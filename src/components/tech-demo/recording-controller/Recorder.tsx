import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import RecordingSettings from "../recording-settings/RecordingSettings";
import Playback from "./playback/Playback";
import { ScreenRecordingContainer } from "./recording-container/ScreenRecordingContainer";
import WebcamRecordingContainer from "./recording-container/WebcamRecordingContainer";

export const DemoContainer = () => {
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
      console.log("SETTING CONSTRAINTS");
      setConstraints(_constraints);
      // return;
    }

    if (JSON.stringify(_constraints) !== JSON.stringify(constraints)) {
      console.log("SETTING CONSTRAINTS");
      setConstraints(_constraints);
    }
  };

  return !finishedRecording ? (
    <div className="flex flex-col gap-4">
      {constraints && recordingMode === "webcam" && (
        <WebcamRecordingContainer
          setMediaRecorder={(mediaRecorder) => setMediaRecorder(mediaRecorder)}
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          webcamConstraints={constraints}
        />
      )}
      {constraints && recordingMode === "screen" && (
        <ScreenRecordingContainer
          setMediaRecorder={(mediaRecorder) => setMediaRecorder(mediaRecorder)}
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          webcamConstraints={constraints}
        />
      )}
      {!isRecording && (
        <RecordingSettings onConstraintsChange={onConstraintsChange} />
      )}
    </div>
  ) : (
    <Playback
      finishedVideo={finishedRecording}
      recordAnotherVideo={resetRecorder}
    />
  );
};
