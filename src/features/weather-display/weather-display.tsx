import {useAppSelector} from '../../app/hooks';
import {selectWeatherForecast} from '../weather-data/weather-data-slice';
import Moment from 'moment';
import iconsMap from '../../icons/icons-map';
import { WeatherAlerts } from '../weather-alerts';
import './weather-display.css';

export function WeatherDisplay() {
    const weather: any = useAppSelector(selectWeatherForecast);
    Moment.locale('en');

    return (
        <div>
            {weather ?
                <div className="weather">
                    <WeatherAlerts />
                    <div>
                        <h3>Current Weather</h3>
                        <h4>{weather.current.temp} °C</h4>
                        <img alt="img" src={iconsMap.get(`${weather.current.weather[0].icon}`)}/>
                    </div>
                    <div>
                        <h3>Hourly Weather</h3>
                        <div className="flex-wrap">
                            {weather.hourly.map((hour: any) =>
                                <div className="single-weather" key={hour.dt}>
                                    <h4>{Moment(new Date(hour.dt * 1000)).format('HH:mm')}</h4>
                                    <div>{hour.temp} °C</div>
                                    <img alt="img" src={iconsMap.get(`${weather.current.weather[0].icon}`)}/>
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3>Daily Weather</h3>
                        <div className="flex-wrap">
                            {weather.daily.map((day: any) =>
                                <div className="single-weather" key={day.dt}>
                                    <h4>{Moment(new Date(day.dt * 1000)).format('DD/MM/YYYY')}</h4>
                                    <div>
                                        <div>Day: {day.temp.day} °C</div>
                                        <div>Night: {day.temp.night} °C</div>
                                        <img alt="img" src={iconsMap.get(`${weather.current.weather[0].icon}`)}/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                : ''}
        </div>
    );
}
