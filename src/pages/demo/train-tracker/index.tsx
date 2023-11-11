import BaseLayout from "../../../components/base-layout";
import TrainLayout from "../../../components/train-tracker/train-layout/TrainLayout";
import TrainPage from "../../../components/train-tracker/train-page/TrainPage";

const TrainTrackerDemo = () => {
  return (
    <BaseLayout activeTab="demo">
      <div className="hero">
        <TrainPage>
          <TrainLayout />
        </TrainPage>
      </div>
    </BaseLayout>
  );
};

export default TrainTrackerDemo;
