"use-client";

import type { SyntheticEvent } from "react";
import { useRef, useState } from "react";
import PannerControls, {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CENTER_OF_CANVAS,
} from "../panner-controls/PannerControls";

export type Coordinate = { x: number; y: number };

export const MAX_DISTANCE_FROM_SOURCE = Math.ceil(
  Math.max(CANVAS_HEIGHT, CANVAS_WIDTH)
);

type SpatialAudioContainerProps = {
  sourceUrl: string;
  isAudioOnly: boolean;
  audioContextAllowed: boolean;
};

/**
 * audio borrowed from https://pixabay.com/music/search/?order=ec
 * @returns
 */
const SpatialAudioContainer = ({
  sourceUrl,
  isAudioOnly,
  audioContextAllowed,
}: SpatialAudioContainerProps) => {
  const mediaElement = useRef<HTMLVideoElement>(null);

  const [audioContext, setAudioContext] = useState<AudioContext>();

  // TODO: this will be used when we want to adjust panner on the fly
  const [pannerNode, setPannerNode] = useState<PannerNode>();

  /**
   * this should only ever run after the 'loadedmetadata' event
   * @param event
   * @returns
   */
  const setUpAudioGraph = (event: SyntheticEvent<HTMLAudioElement, Event>) => {
    if (!mediaElement.current) {
      return;
    }
    if (audioContext) {
      return;
    }
    const _audioContext = new AudioContext();

    setAudioContext(_audioContext);

    const _audioTrack = _audioContext.createMediaElementSource(
      mediaElement.current
    );
    // TODO: change to actual panner node now
    const _pannerNode = new PannerNode(_audioContext, {
      maxDistance: MAX_DISTANCE_FROM_SOURCE,
      distanceModel: "linear",
      coneOuterGain: 1,
      refDistance: 10, // good enough value
      positionX: CENTER_OF_CANVAS.x,
      positionY: CENTER_OF_CANVAS.y,
      // This is what stops it from completely
      // cutting one ear off when moving on the x axis
      panningModel: "HRTF",
    });
    setPannerNode(_pannerNode);

    _audioContext.listener.positionX.setValueAtTime(
      CENTER_OF_CANVAS.x,
      _audioContext.currentTime
    );
    _audioContext.listener.positionY.setValueAtTime(
      CENTER_OF_CANVAS.y,
      _audioContext.currentTime
    );

    _audioTrack.connect(_pannerNode);
    _pannerNode.connect(_audioContext.destination);

    setPannerNode(_pannerNode);
  };

  const changeListenerPosition = ({ x, y }: Partial<Coordinate>) => {
    if (!audioContext) {
      return;
    }

    if (x !== undefined) {
      audioContext.listener.positionX.setValueAtTime(
        x,
        audioContext.currentTime
      );
    }

    if (y !== undefined) {
      audioContext.listener.positionY.setValueAtTime(
        y,
        audioContext.currentTime
      );
    }
  };

  // TODO: this is causing errors? revisit it
  // clean up audio graph on de-render
  // useEffect(() => {
  //   return () => {
  //     pannerNode?.disconnect();
  //     audioContext?.close();
  //   };
  // }, [audioContext, pannerNode]);

  return (
    <div className="flex flex-col items-center">
      {audioContextAllowed && (
        <div className="flex">
          <div className="flex flex-col gap-4">
            {!isAudioOnly && (
              <video
                controls
                ref={mediaElement}
                src={sourceUrl}
                onLoadedMetadata={setUpAudioGraph}
              ></video>
            )}
            <PannerControls changePannerValue={changeListenerPosition} />
            {/* Audio only looks better below the canvas */}
            {isAudioOnly && (
              <audio
                controls
                ref={mediaElement}
                src={sourceUrl}
                onLoadedMetadata={setUpAudioGraph}
                className="w-full"
              ></audio>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SpatialAudioContainer;
