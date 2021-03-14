import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const api = {
  key: "8814a34486850b05a6fc1dafa89c8b3a",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [city, setcity] = useState("Jamtara");
  const [weath, setweather] = useState({
    coord: {
      lon: 86.8,
      lat: 23.95,
    },
    weather: [
      {
        id: 721,
        main: "Haze",
        description: "haze",
        icon: "50d",
      },
    ],
    base: "stations",
    main: {
      temp: "Temperature",
      feels_like: 23.33,
      temp_min: 25,
      temp_max: 25,
      pressure: 1017,
      humidity: 50,
    },
    visibility: 4000,
    wind: {
      speed: 4.12,
      deg: 20,
    },
    clouds: {
      all: 0,
    },
    dt: 1612587920,
    sys: {
      type: 1,
      id: 9144,
      country: "IN",
      sunrise: 1612572698,
      sunset: 1612612928,
    },
    timezone: 19800,
    id: 1269298,
    name: "Place",
    cod: 200,
  });

  const [list, setlist] = useState([]);
  const [data, setData] = useState({
    place: "",
    temperature: "",
    about: "",
  });
  const refreshList = () => {
    axios
      .get("api/Weatherapps/")
      .then((res) => setlist(res.data))
      .catch((err) => console.log(err));
  };
  const handleDelete = (item) => {
    console.log(item.target.value);
    axios
      .delete(`/api/Weatherapps/${item.target.value}/`)
      .then(() => refreshList());
  };

  const handleUpdate = (res) => {
    data.place = res.name;
    data.temperature = res.main.temp;
    data.about = res.weather[0].main;
    setData({ ...data });
    axios.post("/api/Weatherapps/", data).then(() => refreshList());
  };
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          if (result.cod !== "404") {
            setweather(result);
            refreshList();
            handleUpdate(result);
            console.log(data);
          }
          setcity("");
        });
    }
  };

  return (
    <div className="app">
      <main>
        <input
          type="text"
          placeholder="City Name..."
          value={city}
          onChange={(e) => setcity(e.target.value)}
          className="place"
          onKeyPress={search}
        ></input>

        <div className="location-box">
          <div className="location">
            {weath.name},{weath.sys.country}
          </div>
          {/* <div className="date-time">Saturday 11 January 2021</div> */}
        </div>

        <div className="weather-box">
          <div className="temp"> {weath.main.temp}॰C </div>
          <div className="weather">{weath.weather[0].description}</div>
        </div>
        <div className="about-place">
          {list.map((map) => (
            <div className="aboutlist" key={map.id}>
              <button
                className="about-btn"
                value={map.id}
                onClick={handleDelete}
              >
                X
              </button>
              <h3 className="abouth">{map.place}</h3>
              <span className="about-about">{map.about}</span>
              <p className="about-temp">{map.temperature}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;

// 4bd34a0c791dbd6dc7181987589830b9

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
