"use-client";

import { useRef, useState } from "react";
import { useCanvasSize } from "../hooks/useCanvasSize";
import PannerControls from "../panner-controls/PannerControls";

export type Coordinate = { x: number; y: number };

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
  const { centerOfCanvas, maxDistanceFromAudioSource } = useCanvasSize();

  const mediaElement = useRef<HTMLVideoElement>(null);

  const [audioContext, setAudioContext] = useState<AudioContext>();

  // TODO: this will be used when we want to adjust panner on the fly
  const [pannerNode, setPannerNode] = useState<PannerNode>();

  /**
   * this should only ever run after the 'loadedmetadata' event
   * @param event
   * @returns
   */
  const setUpAudioGraph = () => {
    if (!mediaElement.current) {
      return;
    }

    // If a media element is already connected to a context,
    // it won't let you connect it to a new one, so just
    // leave the graph as is, it'll work fine.
    if (audioContext) {
      return;
    }
    const _audioContext = new AudioContext();

    const _audioTrack = _audioContext.createMediaElementSource(
      mediaElement.current
    );

    const _pannerNode = new PannerNode(_audioContext, {
      maxDistance: maxDistanceFromAudioSource,
      distanceModel: "linear",
      coneOuterGain: 1,
      refDistance: 10, // good enough value
      positionX: centerOfCanvas.x,
      positionY: centerOfCanvas.y,
      // This is what stops it from completely
      // cutting one ear off when moving on the x axis
      panningModel: "HRTF",
    });

    _audioTrack.connect(_pannerNode);
    _pannerNode.connect(_audioContext.destination);

    setAudioContext(_audioContext);
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
  //

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
