import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import {Position} from '../../types/position';

export interface WeatherDataState {
    cityName: string;
    position: Position;
    weatherForecast: any;
    message: string;
}

const initialState: WeatherDataState = {
    cityName: '',
    position: {lat: 32, long: 34},
    weatherForecast: undefined,
    message: ''
};

export const weatherDataSlice = createSlice({
    name: 'weatherData',
    initialState,
    reducers: {
        setCityName: (state, action: PayloadAction<string>) => {
            state.cityName = action.payload;
        },
        setPosition: (state, action: PayloadAction<Position>) => {
            state.position = action.payload;
        },
        setWeatherForecast: (state, action: PayloadAction<any>) => {
            state.weatherForecast = action.payload;
        },
        setMessage: (state, action: PayloadAction<any>) => {
            state.message = action.payload;
        },
    },
});

export const {setCityName, setPosition, setWeatherForecast, setMessage} = weatherDataSlice.actions;

export const selectCityName = (state: RootState) => state.weatherData.cityName;
export const selectPosition = (state: RootState) => state.weatherData.position;
export const selectWeatherForecast = (state: RootState) => state.weatherData.weatherForecast;
export const selectMessage = (state: RootState) => state.weatherData.message;

export default weatherDataSlice.reducer;
