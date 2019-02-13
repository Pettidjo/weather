import cityList from './cityList.json';
import { config } from './config';
import axios from 'axios';

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function findCityList(city) {
  if (city) {
    const cityListFiltered = cityList.filter( i => i.name === capitalizeFirstLetter(city) )
    if (cityListFiltered.length > 0) {
      return cityListFiltered;
    }
  }

  return "";
}

export async function fetchAPI(city) {
  try {
    const res = await axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${city.id}&APPID=${config.APIKEY}&lang=fr`)
    return res.data
  } catch (error) {

    return error;
  }
}
