import type { SyntheticEvent } from "react";

type PannerControlsProps = {
  changePannerValue: (options: StereoPannerOptions) => void;
};

const PannerControls = ({ changePannerValue }: PannerControlsProps) => {
  const onSliderChange = (event: SyntheticEvent<HTMLInputElement, Event>) => {
    // console.log(event.nativeEvent.target.value);
    // changePannerValue({ pan: event.nativeEvent.target.value });
    changePannerValue({ pan: Number(event.currentTarget.value) });
  };
  return (
    <div>
      <input
        className="range-primary"
        type="range"
        id="panner"
        min="-1"
        max="1"
        step="0.01"
        placeholder="0"
        onChange={onSliderChange}
      />
      <button className="btn" onClick={() => changePannerValue({ pan: 0 })}>
        reset
      </button>
    </div>
  );
};

export default PannerControls;
