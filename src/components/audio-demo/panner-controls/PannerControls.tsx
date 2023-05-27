import { useEffect, useRef, useState } from "react";
import type { Coordinate } from "../spatial-audio-container/SpatialAudioContainer";

export const CANVAS_HEIGHT = 450 as const;
export const CANVAS_WIDTH = 800 as const;

export const CENTER_OF_CANVAS: Coordinate = {
  x: Math.floor(CANVAS_WIDTH / 2),
  y: Math.floor(CANVAS_HEIGHT / 2),
};

const AUDIO_SOURCE_RADIUS = 30;
const LISTENER_RADIUS = 20;

type PannerControlsProps = {
  changePannerValue: (coordinate: Partial<Coordinate>) => void;
};

const PannerControls = ({ changePannerValue }: PannerControlsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [listenerPosition, setListenerPosition] =
    useState<Coordinate>(CENTER_OF_CANVAS);

  const [mouseIsDown, setMouseIsDown] = useState(false);

  const drawAudioSource = () => {
    if (!canvasRef.current || !canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }

    context.beginPath();
    context.arc(
      CENTER_OF_CANVAS.x,
      CENTER_OF_CANVAS.y,
      AUDIO_SOURCE_RADIUS,
      0,
      2 * Math.PI,
      false
    );
    context.fillStyle = "red";
    context.fill();

    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.stroke();
  };

  const drawListenerPosition = (_listenerPosition: Coordinate) => {
    if (!canvasRef.current || !canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }

    context.beginPath();
    context.arc(
      _listenerPosition.x,
      _listenerPosition.y,
      LISTENER_RADIUS,
      0,
      2 * Math.PI,
      false
    );
    context.fillStyle = "blue";
    context.fill();

    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.stroke();
  };

  const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const coords = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    setListenerPosition(coords);
  };

  const mouseMoveHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // Handle moving logic
    const coords = {
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
    };

    if (mouseIsDown) {
      const xDiff = e.nativeEvent.movementX;
      const yDiff = e.nativeEvent.movementY;

      setListenerPosition({ x: coords.x + xDiff, y: coords.y + yDiff });
    }
  };

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }

    context?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.fillStyle = "white";
    context?.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    drawAudioSource();
    drawListenerPosition(listenerPosition);
    changePannerValue(listenerPosition);
  }, [changePannerValue, listenerPosition]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: CANVAS_HEIGHT, width: CANVAS_WIDTH }}
        onMouseDown={(event) => {
          setMouseIsDown(true);
          clickHandler(event);
        }}
        onMouseUp={() => setMouseIsDown(false)}
        onMouseOut={() => setMouseIsDown(false)}
        onMouseMove={mouseMoveHandler}
      >
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="absolute top-0 bottom-0 left-0 right-0"
        ></canvas>
      </div>
      <button
        className="btn-primary btn max-w-md"
        onClick={() => setListenerPosition(CENTER_OF_CANVAS)}
      >
        Reset
      </button>
    </div>
  );
};

export default PannerControls;
