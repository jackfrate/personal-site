"use-client";

import type { SyntheticEvent } from "react";
import { useRef, useState } from "react";
import PannerControls from "../panner-controls/PannerControls";

export const CANVAS_HEIGHT = 500;
export const CANVAS_WIDTH = 500;
// export const MAX_DISTANCE_FROM_SOURCE = Math.ceil(
//   Math.max(CANVAS_HEIGHT, CANVAS_WIDTH) / 2
// );
export const MAX_DISTANCE_FROM_SOURCE = 10;
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
  const [pannerNode, setPannerNode] = useState<PannerNode>();

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

    // TODO: change to actual panner node now
    const _pannerNode = new PannerNode(audioContext, {
      maxDistance: MAX_DISTANCE_FROM_SOURCE,
      distanceModel: "linear",
      coneOuterGain: 1,
      refDistance: 1,
      // This is what stops it from completely
      // cutting one ear off when moving on the x axis
      panningModel: "HRTF",
      // rolloffFactor: 2,
    });
    setPannerNode(_pannerNode);

    _audioTrack.connect(_pannerNode);
    _pannerNode.connect(audioContext.destination);
  };

  const setPannerOptions = ({ x, y }: { x?: number; y?: number }) => {
    if (!audioContext) {
      return;
    }
    // console.log(`sertring value as ${options.pan}`);
    // pannerNode.pan.setValueAtTime(options.pan ?? 0, audioContext.currentTime);
    if (x !== undefined) {
      // pannerNode.positionX.setValueAtTime(x, audioContext.currentTime);
      audioContext.listener.positionX.setValueAtTime(
        x,
        audioContext.currentTime
      );
    }
    if (y !== undefined) {
      // pannerNode.positionY.setValueAtTime(y, audioContext.currentTime);
      audioContext.listener.positionY.setValueAtTime(
        y,
        audioContext.currentTime
      );
    }
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
