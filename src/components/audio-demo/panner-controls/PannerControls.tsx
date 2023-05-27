import type { SyntheticEvent } from "react";

type PannerControlsProps = {
  changePannerValue: (options: { x?: number; y?: number }) => void;
};

const PannerControls = ({ changePannerValue }: PannerControlsProps) => {
  const onXSliderChange = (event: SyntheticEvent<HTMLInputElement, Event>) => {
    // console.log(event.nativeEvent.target.value);
    // changePannerValue({ pan: event.nativeEvent.target.value });
    changePannerValue({ x: Number(event.currentTarget.value) });
  };

  const onYSliderChange = (event: SyntheticEvent<HTMLInputElement, Event>) => {
    // console.log(event.nativeEvent.target.value);
    // changePannerValue({ pan: event.nativeEvent.target.value });
    changePannerValue({ y: Number(event.currentTarget.value) });
  };
  return (
    <div>
      <p>x</p>
      <input
        className="range-primary"
        type="number"
        min="-11"
        max="11"
        step="1"
        placeholder="0"
        onChange={onXSliderChange}
      />
      <button className="btn" onClick={() => changePannerValue({ x: 0 })}>
        reset
      </button>
      <p>y</p>
      <input
        className="range-primary"
        type="number"
        min="-11"
        max="11"
        step="1"
        placeholder="0"
        onChange={onYSliderChange}
      />
      <button className="btn" onClick={() => changePannerValue({ y: 0 })}>
        reset
      </button>
    </div>
  );
};

export default PannerControls;
