"use-client";

import { useQuery, useQueryClient } from "react-query";
import useGetBaseUrl from "../hooks/useGetBaseUrl";

export type Station = {
  station_name: string;
  id: string;
};

type StationSelectorProps = {
  activeStation: Station;
  setActiveStation: (station: Station) => void;
};

const StationPicker = ({
  activeStation,
  setActiveStation,
}: StationSelectorProps) => {
  const baseUrl = useGetBaseUrl();
  const queryClient = useQueryClient();

  const selectStation = (station: Station) => {
    setActiveStation(station);
    queryClient.invalidateQueries({
      queryKey: [`train-times`, station.id],
    });
  };

  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: ["train-stations"],
    queryFn: async (): Promise<Station[]> => {
      const response = await fetch(`${baseUrl}/api/trainTimes/stations`);
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

  const dropdownLabel = isLoading
    ? "Loading Stations..."
    : isError
    ? "Error loading stations 😢"
    : activeStation.station_name;

  return (
    <div className="flex w-full justify-center">
      <div className="flex flex-row items-center justify-between gap-4">
        <div className="dropdown-end dropdown">
          <label tabIndex={0} className="btn m-1">
            Selected Stop: {dropdownLabel}
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box z-[1] flex h-96 flex-col flex-nowrap overflow-y-auto bg-base-300 p-1 shadow"
          >
            {isSuccess &&
              data.map((station, index) => (
                <li key={index} onClick={() => setActiveStation(station)}>
                  <p>{station.station_name}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StationPicker;
