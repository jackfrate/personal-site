import BaseLayout from "../../../components/base-layout";
import TrainContainer from "../../../components/train-tracker/train-container/TrainContainer";
import TrainDemo from "../../../components/train-tracker/train-demo/TrainDemo";

const TrainTrackerDemo = () => {
  return (
    <BaseLayout activeTab="demo">
      <TrainContainer>
        <TrainDemo />
      </TrainContainer>
    </BaseLayout>
  );
};

export default TrainTrackerDemo;
