import { FaLocationArrow, FaSearch } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

function Weather() {
  const [location, setLocation] = useState("");
  const [name, setName] = useState("- -");
  const [place, setPlace] = useState("- -");
  const [condition, setCondition] = useState("- -");
  const [date, setDate] = useState("- -");
  const [temp, setTemp] = useState("- -");
  const [hum, setHum] = useState("- -");
  const [wind, setWind] = useState("- -");
  const [windDir, setWindDir] = useState("- -");
  const [pressure, setPressure] = useState("- -");
  const [forecast, setForecast] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const patchyRainPossible =
    "url('https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?cs=srgb&dl=pexels-pixabay-209831.jpg&fm=jpg')";
  const moderateRain =
    "url('https://cdn.wallpapersafari.com/39/31/AJ8Rli.jpg')";
  const partlyCloudy =
    "url('https://th.bing.com/th/id/OIP.wd3HM0ofCohJPDWF2HLc1QHaFj?rs=1&pid=ImgDetMain')";
  const cloudy =
    "url('https://www.photos-public-domain.com/wp-content/uploads/2012/04/fluffy-white-clouds-600x400.jpg')";
  const lightRainShower =
    "url('https://townsquare.media/site/532/files/2019/11/RS25322_GettyImages-1053791954-scr.jpg?w=1200&h=0&zc=1&s=0&a=t&q=89')";
  const lightRain = "url('https://wallpapercave.com/wp/wp7226285.jpg')";
  const clear =
    "url('https://i.pinimg.com/originals/35/92/5d/35925d88bed4126096ea6fc1cd48c840.jpg')";
  const sunny =
    "url('https://le-cdn.hibuwebsites.com/fd21472611d1460584f5eaafd4687d05/dms3rep/multi/opt/Sun-1920w.jpg')";
  const moderateOrHeavyRain =
    "url('https://i.ytimg.com/vi/hlu8jX6Or0Q/maxresdefault.jpg')";
  const moderateOrHeavyRainWithThunder =
    "url('https://www.worldatlas.com/upload/97/43/02/shutterstock-1162552204.jpg')";
  const mist =
    "url('https://www.wallpaperbetter.com/wallpaper/291/987/743/mountain-mist-sky-clouds-snow-blue-style-1080P-wallpaper.jpg')";
  const overcast =
    "url('https://live.staticflickr.com/1086/5109794366_fde3ac812c.jpg')";
  const defaultImage =
    "url('https://i.pinimg.com/originals/2c/8d/87/2c8d8718be363c3b75d707e83de8a269.jpg')";

  const handleWeather = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const res = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=a69f7e6cf31343e6b7d124952232609&q=${location}&days=7`
    );
    setIsLoading(false);
    setName(res.data.location.name);
    setPlace(res.data.location.country + ", " + res.data.location.region);
    setCondition(res.data.current.condition.text);
    setDate(res.data.location.localtime);
    setTemp(res.data.current.temp_c + "°c");
    setHum(res.data.current.humidity + "%");
    setWind(res.data.current.wind_kph + " km/h");
    setWindDir(res.data.current.wind_dir);
    setPressure(res.data.current.pressure_in + "%");
    setForecast(res.data.forecast.forecastday);
  };

  let backgroundImage;
  switch (condition) {
    case "Patchy rain possible":
      backgroundImage = patchyRainPossible;
      break;
    case "Moderate rain":
      backgroundImage = moderateRain;
      break;
    case "Partly Cloudy":
      backgroundImage = partlyCloudy;
      break;
    case "Cloudy":
      backgroundImage = cloudy;
      break;
    case "Light rain shower":
      backgroundImage = lightRainShower;
      break;
    case "Light rain":
      backgroundImage = lightRain;
      break;
    case "Clear":
      backgroundImage = clear;
      break;
    case "Sunny":
      backgroundImage = sunny;
      break;
    case "Moderate or heavy rain shower":
      backgroundImage = moderateOrHeavyRain;
      break;
    case "Moderate or heavy rain with thunder":
      backgroundImage = moderateOrHeavyRainWithThunder;
      break;
    case "Thundery outbreaks in nearby":
      backgroundImage = moderateOrHeavyRainWithThunder;
      break;
    case "Mist":
      backgroundImage = mist;
      break;
    case "Overcast":
      backgroundImage = overcast;
      break;
    default:
      backgroundImage = defaultImage;
      break;
  }

  const weatherDivStyle = {
    backgroundImage: backgroundImage,
  };

  return (
    <div className="weather_container">
      <h1>Weather Forecast</h1>
      <div className="container">
        <h3>Enter Loctation</h3>
        <form onSubmit={handleWeather}>
          <input
            type="text"
            placeholder="Enter City Name"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
          <button type="submit">
            <FaSearch />
          </button>
          {isLoading && <p id="loading">Loading...</p>}
        </form>
        <div className="output">
          <div className="left" style={weatherDivStyle}>
            <div>
              <p>
                <FaLocationArrow id="loc_logo" />
                {name}
              </p>
              <p id="loc">{place}</p>
            </div>
            <div className="bottom">
              <div className="details_box">
                <p id="condition">{condition}</p>
                <p id="date">{date}</p>
              </div>
              <div className="deg">{temp}</div>
            </div>
          </div>
          <div className="right">
            <div className="right_container">
              <div className="details_">
                <p id="details">
                  <span>Humadity</span>
                  <span>{hum}</span>
                </p>
                <p id="details">
                  <span>Wind Speed</span>
                  <span>{wind}</span>
                </p>
                <p id="details">
                  <span>Wind Direction</span>
                  <span>{windDir}</span>
                </p>
                <p id="details">
                  <span>Pressure</span>
                  <span>{pressure}</span>
                </p>
              </div>
              {forecast.map((doc, index) => (
                <div key={index} className="forecast_box">
                  <div className="f1">
                    <p>{doc.date}</p>
                    <p>{doc.day.condition.text}</p>
                  </div>
                  <div className="f2">
                    <p>
                      <img src={doc.day.condition.icon} alt="icon" />{" "}
                      {doc.day.maxtemp_c}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
