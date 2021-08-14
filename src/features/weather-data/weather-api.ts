import {Position} from '../../types/position';

const API_KEY = '8ddf387a5d9d0a8ce87358f937ea1c36';
const API_PATH = `https://api.openweathermap.org/data/2.5/`;
const PATH_END = `&appid=${API_KEY}&units=metric`;

export function fetchPosition(cityName: string): Promise<string> {
    return fetch(`${API_PATH}weather?q=${cityName.trim()}${PATH_END}`)
        .then(value => value.json())
}

export function fetchWeather(position: Position): Promise<string> {
    return fetch(`${API_PATH}onecall?lat=${position.lat}&lon=${position.long}${PATH_END}`)
        .then(value => value.json())
}

