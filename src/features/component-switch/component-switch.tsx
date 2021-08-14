import {useAppSelector} from '../../app/hooks';
import {selectCityName, selectMessage} from '../weather-data/weather-data-slice';
import {Message} from '../message/message';
import {WeatherDisplay} from '../weather-display/weather-display';

export function ComponentSwitch() {
    const cityName: string = useAppSelector(selectCityName);
    const message: string = useAppSelector(selectMessage);
    const capitalizedName: string = cityName.replace(/\b(\w)/g, s => s.toUpperCase())

    return (
        <div>
            <h1 className="city-name">{capitalizedName}</h1>
            {!!message ? <Message data={message}/> : <WeatherDisplay/>}
        </div>
    );
}
