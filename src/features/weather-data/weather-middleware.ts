import {fetchPosition, fetchWeather} from './weather-api';
import {setMessage, setPosition, setWeatherForecast} from './weather-data-slice';

export const getPositionMiddleware = (storeApi: any) => (next: Function) => async (action: any) => {
    if (action.type === 'weatherData/setCityName') {
        const response = await fetchPosition(action.payload) as any
        if (response.cod !== 200) {
            storeApi.dispatch(setMessage(response.message));
        } else {
            storeApi.dispatch(setMessage(''));
            storeApi.dispatch(setPosition({lat: response.coord.lat, long: response.coord.lon}));
        }
    }

    return next(action);
}

export const getWeatherMiddleware = (storeApi: any) => (next: Function) => async (action: any) => {
    if (action.type === 'weatherData/setPosition') {
        const response = await fetchWeather(action.payload) as any
        if (!!response.cod && response.cod !== 200) {
            storeApi.dispatch(setMessage(response.message));
        } else {
            storeApi.dispatch(setMessage(''));
            storeApi.dispatch(setWeatherForecast(response));
        }
    }

    return next(action);
}
