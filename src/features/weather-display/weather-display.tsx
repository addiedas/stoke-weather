import {useAppSelector} from '../../app/hooks';
import {selectPosition, selectWeatherForecast} from '../weather-data/weather-data-slice';
import Moment from 'moment';
import iconsMap from '../../icons/icons-map';
import './weather-display.css';

interface StatCardProps {
    header: string;
    imageSrc?: string;
    children?: any;
}

const StatCard = ({ header, imageSrc, children }: StatCardProps) => (
    <div className="single-weather">
        <h4>{header}</h4>
        <div>{children}</div>
        {imageSrc ? <img alt="img" src={imageSrc} /> : null}
    </div>
);

export function WeatherDisplay() {
    const weather: any = useAppSelector(selectWeatherForecast);
    const position: any = useAppSelector(selectPosition);
    Moment.locale('en');

    return (
        <div>
            {weather ?
                <div className="weather">
                    <div>
                        <h3>City Position</h3>
                        <div className="flex-wrap">
                            <StatCard header="City Position">
                                lat: {position.lat}, long: {position.long}
                            </StatCard>
                        </div>
                    </div>
                    <div>
                        <h3>Current Weather</h3>
                        <div className="flex-wrap">
                            <StatCard header="Now" imageSrc={iconsMap.get(`${weather.current.weather[0].icon}`)}>
                                {weather.current.temp} °C
                            </StatCard>
                        </div>
                    </div>
                    <div>
                        <h3>Hourly Weather</h3>
                        <div className="flex-wrap">
                            {weather.hourly.map((hour: any) =>
                                <StatCard key={hour.dt} header={Moment(new Date(hour.dt * 1000)).format('HH:mm')} imageSrc={iconsMap.get(`${hour.weather[0].icon}`)}>
                                    {hour.temp} °C
                                </StatCard>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3>Daily Weather</h3>
                        <div className="flex-wrap">
                            {weather.daily.map((day: any) =>
                                <StatCard key={day.dt} header={Moment(new Date(day.dt * 1000)).format('DD/MM/YYYY')} imageSrc={iconsMap.get(`${day.weather[0].icon}`)}>
                                    <div>Day: {day.temp.day} °C</div>
                                    <div>Night: {day.temp.night} °C</div>
                                </StatCard>
                            )}
                        </div>
                    </div>
                </div>
                : ''}
        </div>
    );
}
