import { useEffect, useState } from "react";
import useMediaRecorder from "../use-media-recorder";

export default function useSetupWebcam() {
  const { setMediaRecorder, constraints } = useMediaRecorder();

  const [mediaStream, setMediaStream] = useState<MediaStream>();

  const setupMediaStream = async (_constraints: MediaStreamConstraints) => {
    try {
      const webcamMediaStream = await navigator.mediaDevices.getUserMedia(
        _constraints
      );

      const mediaRecorder = new MediaRecorder(webcamMediaStream);

      setMediaStream(webcamMediaStream);
      setMediaRecorder(mediaRecorder);
    } catch (e) {
      console.error(e, "could not set media stream");
    }
  };

  useEffect(() => {
    if (!constraints) {
      return;
    }
    setupMediaStream(constraints);

    // eslint-disable-next-line react-hsoks/exhaustive-deps
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
}
