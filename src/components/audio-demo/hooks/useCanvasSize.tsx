import { useWindowSize } from "usehooks-ts";
import type { Coordinate } from "../spatial-audio-container/SpatialAudioContainer";

export const MAX_CANVAS_HEIGHT = 450 as const;
export const MAX_CANVAS_WIDTH = 800 as const;

export type CanvasSizeInfo = {
  canvasDimensions: Coordinate;
  centerOfCanvas: Coordinate;
  maxDistanceFromAudioSource: number;
};

export const useCanvasSize = (): CanvasSizeInfo => {
  const { width: screenWidth } = useWindowSize();
  const canvasWidth = Math.min(screenWidth, MAX_CANVAS_WIDTH);
  const canvasHeight = 9 * (canvasWidth / 16);

  const canvasDimensions = {
    x: Math.min(screenWidth, MAX_CANVAS_WIDTH),
    y: canvasHeight,
  };

  const maxDistanceFromAudioSource = Math.floor(
    Math.max(canvasDimensions.x, canvasDimensions.y)
  );

  const centerOfCanvas = {
    x: Math.floor(canvasWidth / 2),
    y: Math.floor(canvasHeight / 2),
  };

  return {
    canvasDimensions,
    centerOfCanvas,
    maxDistanceFromAudioSource,
  };
};
