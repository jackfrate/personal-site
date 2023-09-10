import BaseLayout from "../../../components/base-layout";
import TrainLayout from "../../../components/train-tracker/train-layout/TrainLayout";

const TrainTrackerDemo = () => {
  return (
    <BaseLayout activeTab="demo">
      <div className="hero">
        <TrainLayout />
      </div>
    </BaseLayout>
  );
};

export default TrainTrackerDemo;
