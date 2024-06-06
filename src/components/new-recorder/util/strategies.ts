export type RecordingType = "webcam" | "screen";

export type MediaStreamSetupFunc = (
  constraints: MediaStreamConstraints,
  setMediaStream: (mediaStream: MediaStream) => void,
  setMediaRecorder: (mediaRecorder: MediaRecorder) => void
) => Promise<void>;

export const setUpWebcamMediaStream: MediaStreamSetupFunc = async (
  constraints: MediaStreamConstraints,
  setMediaStream: (mediaStream: MediaStream) => void,
  setMediaRecorder: (mediaRecorder: MediaRecorder) => void
) => {
  try {
    const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    const mediaRecorder = new MediaRecorder(mediaStream);

    setMediaRecorder(mediaRecorder);
    setMediaStream(mediaStream);
  } catch (e) {
    console.error(e);
  }
};

export const setUpScreenRecordingStream: MediaStreamSetupFunc = async (
  constraints: MediaStreamConstraints,
  setMediaStream: (mediaStream: MediaStream) => void,
  setMediaRecorder: (mediaRecorder: MediaRecorder) => void
) => {
  try {
    // TODO: get the webcam stream when adding webcam interpolation
    const audioConstraints = constraints.audio;

    const displayStreamOptions = {
      video: true,
      systemAudio: "include",
    };

    const displayStream = await navigator.mediaDevices.getDisplayMedia(
      displayStreamOptions
    );

    if (audioConstraints) {
      const streamWithAudioTrack = await navigator.mediaDevices.getUserMedia({
        audio: audioConstraints,
        video: false,
      });

      const audioTrack = streamWithAudioTrack.getAudioTracks()[0];
      if (audioTrack) {
        displayStream.addTrack(audioTrack);
      }
    }

    const mediaRecorder = new MediaRecorder(displayStream);

    setMediaStream(displayStream);
    setMediaRecorder(mediaRecorder);
  } catch (e) {
    console.error(e, "could not set media stream");
  }
};

export const MediaStreamStrategyMap: Record<
  RecordingType,
  MediaStreamSetupFunc
> = {
  webcam: setUpWebcamMediaStream,
  screen: setUpScreenRecordingStream,
};
