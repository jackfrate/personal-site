"use-client";

import { useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { useCanvasSize } from "../hooks/useCanvasSize";
import type { Coordinate } from "../spatial-audio-container/SpatialAudioContainer";

const AUDIO_SOURCE_RADIUS = 30;
const LISTENER_RADIUS = 20;

type PannerControlsProps = {
  changePannerValue: (coordinate: Partial<Coordinate>) => void;
};

const PannerControls = ({ changePannerValue }: PannerControlsProps) => {
  const { canvasDimensions, centerOfCanvas } = useCanvasSize();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [listenerPosition, setListenerPosition] = useState<Coordinate>();

  const [mouseIsDown, setMouseIsDown] = useState(false);

  const drawAudioSource = (_centerOfCanvas: Coordinate) => {
    if (!canvasRef.current) {
      return;
    }

    const context = canvasRef.current.getContext("2d");
    if (!context) {
      return;
    }

    context.beginPath();
    context.arc(
      _centerOfCanvas.x,
      _centerOfCanvas.y,
      AUDIO_SOURCE_RADIUS,
      0,
      2 * Math.PI,
      false
    );
    context.fillStyle = "#f471b5";
    context.fill();

    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.stroke();

    context.textAlign = "center";
    context.font = "12px serif";

    context.fillStyle = "white";
    context.fillText(
      "Audio Source",
      _centerOfCanvas.x,
      _centerOfCanvas.y - AUDIO_SOURCE_RADIUS - 10
    );
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
    context.fillStyle = "#38bdf8";
    context.fill();

    context.lineWidth = 4;
    context.strokeStyle = "black";
    context.stroke();

    context.textAlign = "center";
    context.font = "12px serif";

    context.fillStyle = "black";
    context.fillText("You", _listenerPosition.x, _listenerPosition.y + 3);
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

    context?.clearRect(0, 0, canvasDimensions.x, canvasDimensions.y);
    context.fillStyle = "#1e293b";
    context?.fillRect(0, 0, canvasDimensions.x, canvasDimensions.y);

    drawAudioSource(centerOfCanvas);
    drawListenerPosition(listenerPosition ?? centerOfCanvas);
    changePannerValue(listenerPosition ?? centerOfCanvas);
  }, [canvasDimensions, centerOfCanvas, changePannerValue, listenerPosition]);

  useEventListener("resize", () => setListenerPosition(centerOfCanvas));

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={containerRef}
        className="relative"
        style={{ height: canvasDimensions.y, width: canvasDimensions.x }}
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
          width={canvasDimensions.x}
          height={canvasDimensions.y}
          className="absolute top-0 bottom-0 left-0 right-0"
        ></canvas>
      </div>
      <div className="flex flex-row items-center gap-5 p-1">
        <p className="">
          Best used with headphones, move the blue dot around to experience
          spatial audio. Resizing the window will reset your position.
        </p>
        <button
          className="btn-primary btn max-w-md"
          onClick={() => setListenerPosition(centerOfCanvas)}
        >
          Reset Position
        </button>
      </div>
    </div>
  );
};

export default PannerControls;
