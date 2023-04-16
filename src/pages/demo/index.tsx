import BaseLayout from "../../components/base-layout";
import RecordingControllerContainer from "../../components/tech-demo/recording-controller/RecordingControllerContainer";

const Demo = () => {
  return (
    <BaseLayout activeTab="demo">
      <div className="hero">
        <RecordingControllerContainer/>
      </div>
    </BaseLayout>
  );
};

export default Demo;
