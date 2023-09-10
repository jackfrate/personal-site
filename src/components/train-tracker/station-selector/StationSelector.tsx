export type Station = {
  name:string;
  id: string;
}

type StationSelectorProps = {
  activeStation: Station,
  setActiveStation: (station: Station) => void;
};

const StationSelector = ({ activeStation, setActiveStation }: StationSelectorProps) => {

  return <div>StationSelector</div>;
};

export default StationSelector;
