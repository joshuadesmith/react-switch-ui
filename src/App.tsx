import React from 'react';
import { format } from 'date-fns';
import Icon from '@mdi/react';
import {
  mdiControllerClassic,
  mdiDog,
  mdiFileAccount,
  mdiGithub,
  mdiMessageText,
  mdiTemperatureFahrenheit,
  mdiThermometer,
  mdiThermometerHigh,
  mdiThermometerLow,
  mdiThermometerOff
} from '@mdi/js';
import './App.css';
import FeatureCard from './FeatureCard';
import IconButton from './IconButton';
import { OpenMeteoResponse } from './OpenMeteoResponse';

interface AppProps {}
interface AppState {
  date: Date;
  currLat?: number;
  currLong?: number;
  currTemp?: number;
}

class App extends React.Component<AppProps, AppState> {
  readonly weatherUrl = 'https://api.open-meteo.com/v1/forecast';

  state: AppState = {
    date: new Date(),
    currLat: undefined,
    currLong: undefined,
    currTemp: undefined
  };

  timePoller?: NodeJS.Timer;
  weatherPoller?: NodeJS.Timer;

  setDate(val: Date): void {
    this.setState({ ...this.state, date: val });
  }

  setCoords(lat: number, lon: number) {
    this.setState({ ...this.state, currLat: lat, currLong: lon });
  }

  setTemp(val: number) {
    this.setState({ ...this.state, currTemp: val });
  }

  componentDidMount(): void {
    // update current time every second
    this.timePoller = setInterval(() => {
      this.setState({ date: new Date() });
    }, 1000);

    // fetch current weather every 60 seconds
    setInterval(() => {
      if (this.state.currLat && this.state.currLong) {
        const lat = this.state.currLat;
        const lon = this.state.currLong;
        fetch(
          // eslint-disable-next-line max-len
          `${this.weatherUrl}?latitude=${lat}&longitude=${lon}&temperature_unit=fahrenheit&current_weather=true`
        )
          .then((response) => response.json())
          .then((json: OpenMeteoResponse) => {
            this.setTemp(json?.current_weather?.temperature);
          })
          .catch((err) => console.error(err));
      }
    }, 10000);

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setCoords(position.coords.latitude, position.coords.longitude);
      });
    } else {
      console.warn('no geolocation :(');
    }
  }

  componentWillUnmount(): void {
    if (this.timePoller) {
      clearInterval(this.timePoller);
    }

    if (this.weatherPoller) {
      clearInterval(this.weatherPoller);
    }
  }

  getTemperatureIcon() {
    const temp = this.state.currTemp;
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
  }

  render() {
    return (
      <div className="App flex h-screen w-full flex-col px-8">
        <div className="mt-4 flex h-16 flex-grow-0 flex-wrap content-center justify-between">
          <div className="">
            <Icon path={mdiDog} size={1} color="white" />
          </div>
          <div className="flex flex-wrap content-end">
            <div className="flex flex-wrap content-center">{format(this.state.date, 'h : mm')}</div>
            <div className="ml-1 flex flex-wrap content-center text-xs font-thin">
              {format(this.state.date, 'a')}
            </div>
            <div className="ml-4">
              <Icon path={this.getTemperatureIcon()} size={1} color="white" />
            </div>
            <div>{this.state.currTemp}</div>
            <div>
              <Icon path={mdiTemperatureFahrenheit} size={1} color="white" />
            </div>
          </div>
        </div>
        <div className="flex flex-grow flex-col">
          <div className="flex flex-grow items-end justify-center pb-8">
            <FeatureCard title="card 1" color="#ff4554" />
            <FeatureCard title="card 2" color="#00c3e3" />
            <FeatureCard title="card 3" color="#e60012" />
          </div>
          <div className="flex h-1/6 items-start justify-center">
            <div className="mr-4">
              <IconButton icon={mdiMessageText} iconColor="#e8e8e8" title="Contact Me" />
            </div>
            <div className="mr-4">
              <IconButton icon={mdiFileAccount} iconColor="#e8e8e8" title="Resume" />
            </div>
            <div className="mr-4">
              <IconButton icon={mdiGithub} iconColor="#e8e8e8" title="GitHub" />
            </div>
          </div>
        </div>
        <div className="Footer flex h-16 flex-grow-0 items-center justify-between px-6">
          <div>
            <Icon path={mdiControllerClassic} size={1.5} color="white" />
          </div>
          <div className="text-xs font-thin">
            <code>Made by Josh Smith using React & TailwindCSS</code>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
