"use-client";
import { useEffect, useRef, useState } from "react";
import RecordingController from "./RecordingController";

const RecordingControllerContainer = () => {
  const [finishedVideo, setFinishedVideo] = useState<Blob>();
  const [videoSrcUrl, setVideoSrcUrl] = useState<string>();

  const playbackRef = useRef<HTMLVideoElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    return () => {
      if (videoSrcUrl) {
        URL.revokeObjectURL(videoSrcUrl);
      }
    };
  }, []);

  useEffect(() => {
    if (!playbackRef.current || !finishedVideo) {
      return;
    }

    const videoSrc = URL.createObjectURL(finishedVideo);
    setVideoSrcUrl(videoSrc);
    playbackRef.current.src = videoSrc;
  }, [playbackRef, finishedVideo]);

  useEffect(() => {
    if (!linkRef.current || !videoSrcUrl) {
      return;
    }

    linkRef.current.href = videoSrcUrl as string;
    // TODO: make better titles
    const date = new Date();
    linkRef.current.download = `${date.toLocaleDateString(
      "en-us"
    )} ${date.toLocaleTimeString("en-us")}.webm`;
  }, [linkRef, videoSrcUrl]);

  return (
    <div>
      {!finishedVideo && (
        <RecordingController
          onRecordingEnd={setFinishedVideo}
        ></RecordingController>
      )}
      {/* TODO: make the video player its own custom component */}
      {finishedVideo && (
        <div className="flex flex-col items-center gap-4">
          <video controls ref={playbackRef}></video>
          <div className="flex flex-row gap-4">
            <a
              className="btn-outline btn inline-flex max-w-[250px]"
              ref={linkRef}
            >
              Download Video
            </a>
            <button
              className="btn-outline btn"
              onClick={() => {
                if (videoSrcUrl) {
                  URL.revokeObjectURL(videoSrcUrl);
                  setVideoSrcUrl(undefined);
                }
                if (finishedVideo) {
                  setFinishedVideo(undefined);
                }
              }}
            >
              Record Another Video
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecordingControllerContainer;
