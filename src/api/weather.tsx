import config from "../config";

export default async function getWeather(city: string) {
  try {
    const data = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${config.REACT_APP_WEATHER_API_KEY}&q=${city}&aqi=no`
    );
    return data.json();
  } catch (error) {
    console.log("error while fetching weather data ", error);
  }
}
