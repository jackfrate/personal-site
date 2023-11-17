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

  const { isLoading, isSuccess, data } = useQuery({
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

  return (
    <div className="flex w-full justify-center">
      <details className="dropdown">
        <summary className="btn m-1">open or close</summary>
        <ul className="dropdown-content menu rounded-box z-[1] w-52 bg-base-100 p-2 shadow">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <a>Item 2</a>
          </li>
        </ul>
      </details>
    </div>
  );
};

export default StationPicker;
