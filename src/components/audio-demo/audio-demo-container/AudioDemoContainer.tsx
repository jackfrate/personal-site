"use-client";

import Link from "next/link";
import type { ChangeEvent} from "react";
import { useState } from "react";
import SpatialAudioContainer from "../spatial-audio-container/SpatialAudioContainer";

const DEFAULT_SONG_SRC = "/audio/my-universe.mp3";

const AudioDemoContainer = () => {
  const [mediaSrcUrl, setMediaSrcUrl] = useState<string>(DEFAULT_SONG_SRC);
  const [isAudioOnly, setIsAudioOnly] = useState(true);

  // Need to save this to free it, as the browser won't garbage collect SrcURL's
  const [srcUrl, setSrcUrl] = useState<string | undefined>();

  const [incorrectFile, setIncorrectFile] = useState(false);

  const [audioContextAllowed, setAudioContextAllowed] = useState(false);

  const useDefaultSong = () => {
    if (mediaSrcUrl === DEFAULT_SONG_SRC) {
      return;
    }
    setMediaSrcUrl(DEFAULT_SONG_SRC);
    setIsAudioOnly(true);
    setIncorrectFile(false);
  };

  const uploadFileClicked = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length < 1) {
      return;
    }
    // free old src url if present
    if (srcUrl !== undefined) {
      URL.revokeObjectURL(srcUrl);
      setSrcUrl(undefined);
    }

    // Length check up top not working lol
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const file = e.target.files[0]!;
    const mimeType = file.type;
    console.log(mimeType);

    if (mimeType.includes("video/")) {
      setIsAudioOnly(false);
    } else if (mimeType.includes("audio/")) {
      setIsAudioOnly(true);
    } else {
      setIncorrectFile(true);
      return;
    }

    setIncorrectFile(false);

    const _srcUrl = URL.createObjectURL(file);
    setMediaSrcUrl(_srcUrl);
  };

  return (
    <div className="mb-6 flex flex-col gap-4 ">
      {!audioContextAllowed && (
        <div className="flex flex-col items-center">
          <button className="btn" onClick={() => setAudioContextAllowed(true)}>
            Allow audio context
          </button>
          <p>
            Default song provided royalty free from:{" "}
            <Link href="https://pixabay.com/music/search/?order=ec">
              https://pixabay.com/music/search/?order=ec
            </Link>
          </p>
        </div>
      )}
      {audioContextAllowed && (
        <>
          <SpatialAudioContainer
            sourceUrl={mediaSrcUrl}
            isAudioOnly={isAudioOnly}
            audioContextAllowed={audioContextAllowed}
          />
          <div className="flex w-full flex-row justify-center gap-4">
            <input
              type="file"
              className="file-input max-w-xs"
              onChange={uploadFileClicked}
            />
            <button className="btn" onClick={useDefaultSong}>
              Use Default Song
            </button>
          </div>
        </>
      )}
      {incorrectFile && (
        <div className="alert alert-error flex flex-row justify-start shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Error! Please upload a audio or video file only.</span>
        </div>
      )}
    </div>
  );
};

export default AudioDemoContainer;
