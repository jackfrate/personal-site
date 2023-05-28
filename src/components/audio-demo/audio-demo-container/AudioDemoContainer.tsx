"use-client";

import { useState } from "react";
import SpatialAudioContainer from "../spatial-audio-container/SpatialAudioContainer";

const DEFAULT_SONG_SRC = "/audio/my-universe.mp3";

const AudioDemoContainer = () => {
  const [mediaSrcUrl, setMediaSrcUrl] = useState<string>(DEFAULT_SONG_SRC);
  const [isAudioOnly, setIsAudioOnly] = useState(true);

  const useDefaultSong = () => {
    if (mediaSrcUrl === DEFAULT_SONG_SRC) {
      return;
    }
    setMediaSrcUrl(DEFAULT_SONG_SRC);
  };
  // TODO: create file upload setup
  return (
    <div className="flex flex-col gap-4">
      <SpatialAudioContainer
        sourceUrl={mediaSrcUrl}
        isAudioOnly={isAudioOnly}
        useDefaultClicked={useDefaultSong}
      />
    </div>
  );
};

export default AudioDemoContainer;
