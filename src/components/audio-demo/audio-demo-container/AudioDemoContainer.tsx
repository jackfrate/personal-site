import type { SyntheticEvent } from "react";
import { useRef, useState } from "react";
import PannerControls from "../panner-controls/PannerControls";

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

  // TODO: once we know how stereo panner works, go to normal 3d panner node
  // const [pannerOptions, setPannerOptions] = useState<StereoPannerOptions>({
  //   pan: 0,
  // });
  // TODO: useRef here?
  const [pannerNode, setPannerNode] = useState<StereoPannerNode>();

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

    const _pannerNode = new StereoPannerNode(audioContext, { pan: 0 });
    setPannerNode(_pannerNode);
    // _audioTrack.connect(audioContext.destination);

    // test
    // audioElement.current.play();
    //

    _audioTrack.connect(_pannerNode);
    _pannerNode.connect(audioContext.destination);
  };

  const setPannerOptions = (options: StereoPannerOptions) => {
    if (!pannerNode || !audioContext) {
      return;
    }
    console.log(`sertring value as ${options.pan}`);
    pannerNode.pan.setValueAtTime(options.pan ?? 0, audioContext.currentTime);
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
          <PannerControls changePannerValue={setPannerOptions} />
        </div>
      )}
    </div>
  );
};

export default AudioDemoContainer;
