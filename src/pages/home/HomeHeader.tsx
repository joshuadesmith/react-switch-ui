import {
  mdiDog,
  mdiTemperatureFahrenheit,
  mdiThermometer,
  mdiThermometerHigh,
  mdiThermometerLow,
  mdiThermometerOff
} from '@mdi/js';
import Icon from '@mdi/react';
import { format } from 'date-fns';

interface HomeHeaderProps {
  date: Date;
  temp?: number;
}

const getTempIcon = (temp?: number) => {
  if (temp === undefined) {
    return mdiThermometerOff;
  }
  if (temp < 40) {
    return mdiThermometerLow;
  }
  if (temp > 85) {
    return mdiThermometerHigh;
  }
  return mdiThermometer;
};

export default function HomeHeader({ date, temp }: HomeHeaderProps) {
  return (
    <div className="mt-4 flex h-16 flex-grow-0 flex-wrap content-center justify-between">
      <div className="">
        <Icon path={mdiDog} size={1} color="white" />
      </div>
      <div className="flex flex-wrap content-end">
        <div className="flex flex-wrap content-center">{format(date, 'h : mm')}</div>
        <div className="ml-1 flex flex-wrap content-center text-xs font-thin">
          {format(date, 'a')}
        </div>
        <div className="ml-4">
          <Icon path={getTempIcon(temp)} size={1} color="white" />
        </div>
        <div>{temp}</div>
        <div>
          <Icon path={mdiTemperatureFahrenheit} size={1} color="white" />
        </div>
      </div>
    </div>
  );
}
