"use-client";
import { useEffect, useRef, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import RecordingController from "./RecordingController";

const RecordingControllerContainer = () => {
  const [finishedVideo, setFinishedVideo] = useState<Blob>();
  const [videoSrcUrl, setVideoSrcUrl] = useState<string>();
  const playbackRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playbackRef.current || !finishedVideo) {
      return;
    }

    const videoSrc = URL.createObjectURL(finishedVideo);
    setVideoSrcUrl(videoSrc);
    playbackRef.current.src = videoSrc;
  }, [playbackRef, finishedVideo]);

  useEffect(() => {
    return () => {
      if (videoSrcUrl) {
        URL.revokeObjectURL(videoSrcUrl);
      }
    };
  }, []);


  return (
    <div>
      {!finishedVideo && (
        <RecordingController
          onRecordingEnd={setFinishedVideo}
        ></RecordingController>
      )}
      {/* TODO: make this its own component with a nice player */}
      {finishedVideo && (
        <div>
          <video controls ref={playbackRef}></video>
        </div>
      )}
    </div>
  );
};

export default RecordingControllerContainer;
