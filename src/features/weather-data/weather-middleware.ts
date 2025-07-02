import {fetchPosition, fetchWeather} from './weather-api';
import {setMessage, setPosition, setWeatherForecast} from './weather-data-slice';

/**
 * Middleware to handle fetching the geographical position based on city name.
 * Dispatches actions to update the position or set an error message.
 *
 * @param {any} storeApi - The Redux store API.
 * @returns {Function} A function to handle the next middleware or reducer.
 */
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

/**
 * Middleware to handle fetching the weather forecast based on geographical position.
 * Dispatches actions to update the weather forecast or set an error message.
 *
 * @param {any} storeApi - The Redux store API.
 * @returns {Function} A function to handle the next middleware or reducer.
 */
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
