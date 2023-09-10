import { useEffect, useState } from "react";

type StationSelectorProps = {
  selectStation: (station: string) => void;
};

const StationSelector = ({ selectStation }: StationSelectorProps) => {
  // TODO: make this use the dropdown and not a static station
  const [selectedStation, setSelectedStation] = useState("40320");

  useEffect(() => {
    selectStation(selectedStation);
  }, [selectStation, selectedStation]);

  return <div>StationSelector</div>;
};

export default StationSelector;
