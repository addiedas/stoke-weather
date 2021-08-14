import {configureStore} from '@reduxjs/toolkit';
import weatherDataReducer from '../features/weather-data/weather-data-slice';
import {getPositionMiddleware, getWeatherMiddleware} from '../features/weather-data/weather-middleware';

export const store = configureStore({
  reducer: {
    weatherData: weatherDataReducer,
  },
  middleware: [
    getPositionMiddleware,
    getWeatherMiddleware
  ]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
