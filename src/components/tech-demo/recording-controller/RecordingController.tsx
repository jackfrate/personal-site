"use-client";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import RecordingSettings from "../recording-settings/RecordingSettings";
import {
  getAudioDevices,
  getVideoDevices,
  handlePermissions,
} from "../utils/utils";
import WebcamRecorder from "./webcam-recorder/WebcamRecorder";

type RecordingControllerProps = {
  onRecordingEnd: (finishedRecording: Blob) => void;
};

const RecordingController = ({ onRecordingEnd }: RecordingControllerProps) => {
  const [recordingMode, setRecordingMode] = useLocalStorage<
    "screen" | "webcam"
  >("RECORDING_MODE", "webcam");

  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>();
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>();

  const [selectedAudioDevice, setSelectedAudioDevice] =
    useState<MediaDeviceInfo>();
  const [preferredAudioDevice, setPreferredAudioDevice] = useLocalStorage<
    string | undefined
  >("PREFERRED_AUDIO_DEVICE", undefined);

  const [selectedVideoDevice, setSelectedVideoDevice] =
    useState<MediaDeviceInfo>();
  const [preferredVideoDevice, setPreferredVideoDevice] = useLocalStorage<
    string | undefined
  >("PREFERRED_VIDEO_DEVICE", undefined);

  const [webcamEnabledForScreen, setWebcamEnabledForScreen] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">("user");

  const [webcamMediaStream, setWebcamMediaStream] = useState<MediaStream>();
  const [mediaStreamToRecord, setMediaStreamToRecord] = useState<MediaStream>();

  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>();

  // const [requestRecordingStart, setRequestRecordingStart] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const cleanUpMediaStreams = () => {
    if (mediaStreamToRecord) {
      mediaStreamToRecord.getTracks().forEach((track) => track.stop());
    }
    if (webcamMediaStream) {
      webcamMediaStream.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    const setupDevices = async () => {
      // const permissions: { audio: boolean; video: boolean } =
      await handlePermissions();
      const mics = await getAudioDevices();
      const cams = await getVideoDevices();

      setAudioDevices(mics);
      setVideoDevices(cams);

      // just use first item in each list, can change later
      // do the camera first, since we only need a mic to start desktop recording
      if (cams.length > 0) {
        const prefCam = cams.find(
          (device) => device.deviceId === preferredVideoDevice
        );
        setSelectedVideoDevice(prefCam ?? cams[0]);
      }

      if (mics.length > 0) {
        const prefMic = mics.find(
          (device) => device.deviceId === preferredAudioDevice
        );
        setSelectedAudioDevice(prefMic ?? mics[0]);
      }
    };

    setupDevices();
  }, []);

  // handle preferred devices
  useEffect(() => {
    if (
      selectedVideoDevice &&
      selectedVideoDevice.deviceId !== preferredVideoDevice
    ) {
      setPreferredVideoDevice(selectedVideoDevice.deviceId);
    }
    if (
      selectedAudioDevice &&
      selectedAudioDevice.deviceId !== preferredAudioDevice
    ) {
      setPreferredAudioDevice(selectedAudioDevice.deviceId);
    }
  }, [
    preferredAudioDevice,
    preferredVideoDevice,
    selectedAudioDevice,
    selectedVideoDevice,
    setPreferredAudioDevice,
    setPreferredVideoDevice,
  ]);

  // Sets webcam media stream
  useEffect(() => {
    const setupWebcamStream = async () => {
      if (!selectedAudioDevice) {
        return;
      }
      if (recordingMode === "webcam" && !selectedVideoDevice) {
        return;
      }

      cleanUpMediaStreams();

      const webcamStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: selectedVideoDevice?.deviceId,
          facingMode: facingMode,
        },
        audio:
          // Don't re-use audio stream if we're screen recording
          recordingMode === "webcam"
            ? { deviceId: selectedAudioDevice.deviceId }
            : false,
      });

      setWebcamMediaStream(webcamStream);
    };
    setupWebcamStream();
    // DO NOT add the missing function here, causes infinite loop
    // Look into using useCallback for it to avoid this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    facingMode,
    recordingMode,
    selectedAudioDevice,
    selectedVideoDevice,
    webcamEnabledForScreen,
  ]);

  // handle recording start
  useEffect(() => {
    // TODO: two different functions for each other, conditionally call them
    // that will fix the bug of not being able to start
    const setupWebcamStream = async () => {
      // if (!requestRecordingStart || !selectedAudioDevice) {
      if (!selectedAudioDevice) {
        return;
      }
      if (
        (recordingMode === "webcam" || webcamEnabledForScreen) &&
        !webcamMediaStream
      ) {
        return;
      }

      if (recordingMode === "webcam" && webcamMediaStream) {
        setMediaStreamToRecord(webcamMediaStream);
      }
      if (recordingMode === "screen") {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia({
          // TODO: investigate the CaptureController option
          audio: {
            deviceId: selectedAudioDevice.deviceId,
          },
        });
        setMediaStreamToRecord(mediaStream);
        console.log("set steram");
      }
    };

    setupWebcamStream();
  }, [
    recordingMode,
    selectedAudioDevice,
    webcamEnabledForScreen,
    webcamMediaStream,
  ]);

  // when there's a stream to record, get the media recorder going
  useEffect(() => {
    if (!mediaStreamToRecord) {
      return;
    }

    const recorder = new MediaRecorder(mediaStreamToRecord);
    const recorderChunks: BlobPart[] = [];

    recorder.ondataavailable = (e) => recorderChunks.push(e.data);
    recorder.onstop = () => onRecordingEnd(new Blob(recorderChunks));

    setMediaRecorder(recorder);
    console.log("ready to record");
  }, [mediaStreamToRecord, onRecordingEnd]);

  const onStart = () => {
    if (!mediaRecorder) {
      return;
    }
    mediaRecorder.start();
    setIsRecording(true);
  };

  const onStop = () => {
    if (!mediaRecorder) {
      return;
    }
    mediaRecorder.stop();
    setIsRecording(false);
    cleanUpMediaStreams();
  };

  // cleanup
  useEffect(() => {
    () => {
      return () => {
        cleanUpMediaStreams();
      };
    };
  }, []);

  return (
    <div className="relative flex w-screen flex-col items-center gap-6">
      {recordingMode === "webcam" && (
        <WebcamRecorder
          mediaStream={webcamMediaStream}
          isRecording={isRecording}
          onStart={onStart}
          onStop={onStop}
        />
      )}
      <div className="">
        {mediaStreamToRecord && (
          <RecordingSettings
            audioDevices={audioDevices}
            videoDevices={videoDevices}
            selectedAudioDevice={selectedAudioDevice}
            selectedVideoDevice={selectedVideoDevice}
            recordingMode={recordingMode}
            onAudioDeviceChange={setSelectedAudioDevice}
            onVideoDeviceChange={setSelectedVideoDevice}
            onRecordingModeChange={setRecordingMode}
          />
        )}
      </div>
    </div>
  );
};

export default RecordingController;
