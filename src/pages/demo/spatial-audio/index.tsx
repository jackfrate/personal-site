import AudioDemoContainer from "../../../components/audio-demo/audio-demo-container/AudioDemoContainer";
import BaseLayout from "../../../components/base-layout";

const AudioDemo = () => (
  <BaseLayout activeTab="demo">
    <div className="hero">
      <AudioDemoContainer />
    </div>
  </BaseLayout>
);

export default AudioDemo;
