import { mdiMessageText, mdiFileAccount, mdiGithub, mdiControllerClassic } from '@mdi/js';
import Icon from '@mdi/react';
import axios from 'axios';
import React from 'react';
import { Subject, filter, switchMap, interval, startWith, tap, takeUntil } from 'rxjs';
import GameCard from './GameCard';
import IconButton from '../../components/IconButton';
import { SteamGame } from '../../model/SteamGamesResponse';
import HomeHeader from './HomeHeader';
import './Home.css';

interface HomeProps {}
interface HomeState {
  date: Date;
  currLat?: number;
  currLong?: number;
  currTemp?: number;
  games?: SteamGame[];
}

export default class Home extends React.Component<HomeProps, HomeState> {
  readonly weatherUrl = 'https://api.open-meteo.com/v1/forecast';

  state: HomeState = {
    date: new Date(),
    currLat: undefined,
    currLong: undefined,
    currTemp: undefined,
    games: undefined
  };

  setDate(val: Date): void {
    this.setState({ ...this.state, date: val });
  }

  setCoords(lat: number, lon: number) {
    this.setState({ ...this.state, currLat: lat, currLong: lon });
  }

  setTemp(val: number) {
    this.setState({ ...this.state, currTemp: val });
  }

  setGames(val: SteamGame[]) {
    this.setState({ ...this.state, games: val });
  }

  unmount$ = new Subject();

  private coordsSubject = new Subject<number[]>();

  // creates a new weather poller observable when coordinates are received
  private pollWeather$ = this.coordsSubject.asObservable().pipe(
    filter((coords) => coords.length > 0),
    switchMap((coords: number[]) =>
      interval(60000).pipe(
        startWith(0),
        tap(() => {
          const lat = coords[0];
          const lon = coords[1];

          axios
            .get('/weather', { params: { lat, lon } })
            .then((response) => this.setTemp(response.data.current_weather?.temperature))
            .catch((err) => console.error(err.response.data));
        }),
        takeUntil(this.unmount$)
      )
    ),
    takeUntil(this.unmount$)
  );

  // updates the current time every second
  private updateTime$ = interval(1000).pipe(
    startWith(0),
    tap(() => this.setDate(new Date())),
    takeUntil(this.unmount$)
  );

  componentDidMount(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.coordsSubject.next([position.coords.latitude, position.coords.longitude]);
      });
    } else {
      console.warn('no geolocation :(');
    }

    this.updateTime$.subscribe();
    this.pollWeather$.subscribe();

    const steamId = process.env.REACT_APP_STEAM_USER_ID;
    const steamApiKey = process.env.REACT_APP_STEAM_API_KEY;

    axios
      .get('/games/recent', { params: { steamId, steamApiKey } })
      .then((response) => this.setGames(response.data.response.games))
      .catch((err) => console.error(err.response.data));
  }

  componentWillUnmount(): void {
    // destroy observables
    this.unmount$.next(null);
  }

  render() {
    return (
      <div className="App flex h-screen w-full flex-col px-8">
        <HomeHeader date={this.state.date} temp={this.state.currTemp} />

        <div className="flex flex-grow flex-col">
          <div className="flex flex-grow items-end justify-center pb-8">
            {this.state.games?.map((game) => <GameCard key={game.appid} game={game} />) ?? (
              <GameCard />
            )}
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
