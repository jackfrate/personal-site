"use-client";

import { useEffect, useRef, useState } from "react";

type PlaybackProps = {
  finishedVideo: Blob;
  recordAnotherVideo: () => void;
};
const Playback = ({ finishedVideo, recordAnotherVideo }: PlaybackProps) => {
  // have to keep srcUrl in a state variable so we can free it
  const [videoSrcUrl, setVideoSrcUrl] = useState<string>();

  const playbackRef = useRef<HTMLVideoElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  // cleanup srcUrl
  useEffect(() => {
    return () => {
      if (videoSrcUrl) {
        URL.revokeObjectURL(videoSrcUrl);
        setVideoSrcUrl(undefined);
      }
    };
  }, [videoSrcUrl]);

  useEffect(() => {
    if (!finishedVideo || !playbackRef.current) {
      return;
    }

    // This has to be handled in an effect, not freeing the srcUrl will cause memory leaks
    if (playbackRef.current.src) {
      return;
    }

    const _videoSrcUrl = URL.createObjectURL(finishedVideo);
    playbackRef.current.src = _videoSrcUrl;

    setVideoSrcUrl(_videoSrcUrl);
  }, [finishedVideo]);

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
      {finishedVideo && (
        <div className="flex flex-col items-center gap-4">
          <video
            className="max-h-[66vh] pt-4"
            controls
            ref={playbackRef}
          ></video>
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
                }
                recordAnotherVideo();
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

export default Playback;
