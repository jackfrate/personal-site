import SpatialAudioContainer from "../../components/audio-demo/spatial-audio-container/SpatialAudioContainer";
import BaseLayout from "../../components/base-layout";

const AudioDemo = () => (
  <BaseLayout activeTab="audio-demo">
    <div className="hero">
      <SpatialAudioContainer />
    </div>
  </BaseLayout>
);

export default AudioDemo;
