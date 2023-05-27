import type { SyntheticEvent } from "react";
import { useRef, useState } from "react";

/**
 * audio borrowed from https://pixabay.com/music/search/?order=ec
 * @returns
 */
const AudioDemoContainer = () => {
  // TODO: allow custom source
  // video element is used because it can play audio and video :)
  const mediaElement = useRef<HTMLVideoElement>(null);

  const [audioCTXAllowed, setAudioCTXAllowed] = useState(false);
  const [audioContext, setAudioContext] = useState<AudioContext>();

  // audio graph stuff
  // const [audioTrack, setAudioTrack] = useState();

  const allowAudioContext = () => {
    setAudioCTXAllowed(true);
    const _audioContext = new AudioContext();
    setAudioContext(_audioContext);
  };

  const setUpAudioGraph = (event: SyntheticEvent<HTMLAudioElement, Event>) => {
    if (!audioContext || !mediaElement.current) {
      return;
    }

    const _audioTrack = audioContext.createMediaElementSource(
      mediaElement.current
    );

    _audioTrack.connect(audioContext.destination);

    // test
    // audioElement.current.play();
  };

  return (
    <div className="flex flex-col">
      <p>Audio Demo</p>
      {!audioCTXAllowed && (
        <div>
          <button className="btn" onClick={allowAudioContext}>
            Allow audio context
          </button>
        </div>
      )}
      {audioCTXAllowed && (
        <div className="flex flex-col">
          <video
            controls
            ref={mediaElement}
            src="/audio/my-universe.mp3"
            onLoadedMetadata={setUpAudioGraph}
          ></video>
        </div>
      )}
    </div>
  );
};

export default AudioDemoContainer;
