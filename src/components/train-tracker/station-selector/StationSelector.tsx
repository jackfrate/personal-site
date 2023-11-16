import { useQuery } from "react-query";
import { env } from "../../../env/client.mjs";

export type Station = {
  station_name: string;
  id: string;
};

type StationSelectorProps = {
  activeStation: Station;
  setActiveStation: (station: Station) => void;
};

const StationSelector = ({
  activeStation,
  setActiveStation,
}: StationSelectorProps) => {
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: ["train-stations"],
    queryFn: async (): Promise<Station[]> => {
      const response = await fetch(
        `${env.NEXT_PUBLIC_TRAIN_API_BASE_URL}/trainTimes/stations`
      );
      const loadedData = await response.json();
      const sortedData = loadedData.sort((a: Station, b: Station) => {
        if (a.station_name < b.station_name) {
          return -1;
        }
        if (a.station_name > b.station_name) {
          return 1;
        }
        return 0;
      });
      return sortedData as Station[];
    },
    // This won't be updating much
    cacheTime: 1000 * 60 * 60 * 24,
  });

  return (
    <div className="flex flex-row items-center justify-between gap-4">
      <div className="dropdown-end dropdown">
        <label tabIndex={0} className="btn m-1">
          Select Station
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box z-[1] flex h-96 flex-col flex-nowrap overflow-y-auto bg-base-300 p-1 shadow"
        >
          {data &&
            data.map((station, index) => (
              <li key={index} onClick={() => setActiveStation(station)}>
                <p>{station.station_name}</p>
              </li>
            ))}
        </ul>
      </div>
      {isSuccess && <div>Showing trains at {activeStation.station_name}</div>}
      {isLoading && <div>Loading Stations...</div>}
    </div>
  );
};

export default StationSelector;
