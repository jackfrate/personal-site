"use-client";

import { useState } from "react";
import SpatialAudioContainer from "../spatial-audio-container/SpatialAudioContainer";

const AudioDemoContainer = () => {
  const [mediaSrcUrl, setMediaSrcUrl] = useState<string>(
    "/audio/my-universe.mp3"
  );
  const [isAudioOnly, setIsAudioOnly] = useState(true);
  // TODO: create file upload setup
  return (
    <SpatialAudioContainer sourceUrl={mediaSrcUrl} isAudioOnly={isAudioOnly} />
  );
};

export default AudioDemoContainer;
