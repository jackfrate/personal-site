import { useEffect, useState } from "react";
import RecordingSettings from "../recording-settings/RecordingSettings";
import Playback from "./playback/Playback";
import WebcamRecordingContainer from "./recording-container/WebcamRecordingContainer";

export const DemoContainer = () => {
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();
  const [isRecording, setIsRecording] = useState(false);

  const [finishedRecording, setFinishedRecording] = useState<Blob>();
  const [constraints, setConstraints] = useState<MediaStreamConstraints>();

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
      {constraints && (
        <WebcamRecordingContainer
          setMediaRecorder={(mediaRecorder) => setMediaRecorder(mediaRecorder)}
          isRecording={isRecording}
          startRecording={startRecording}
          stopRecording={stopRecording}
          constraints={constraints}
        />
      )}
      {!isRecording && (
        <RecordingSettings onSettingsChange={onConstraintsChange} />
      )}
    </div>
  ) : (
    <Playback
      finishedVideo={finishedRecording}
      recordAnotherVideo={resetRecorder}
    />
  );
};
