const getWeather = document.getElementById("getWeather");
const weatherContainer = document.getElementById("weatherContainer");
const load = document.getElementById("load");
const cityInput = document.getElementById("cityName");

const APP_ID = "bc49e1d3c5af55032b889511ff61ea1e";

const countTempFunction = (tempKelvin) => {
  //const kelvin 0 = -273.15 Celsius;
  const tempCelsius = tempKelvin - 273.15;
  return tempCelsius.toFixed(1);
};

const getWeatherFunction = async () => {
  let city = cityInput.value;

  if (city === "" || city === null) {
    alert(`Please insert a city`);
    return;
  }

  getWeather.setAttribute("disabled", "");
  weatherContainer.textContent = "";
  load.removeAttribute("class");
  weatherContainer.classList.remove("error");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APP_ID}`
    );
    const result = await response.json();

    if (response.ok) {
      let temp = countTempFunction(result.main.temp);

      let getIcon = result.weather[0].icon;
      let icon = `<a href= "http://openweathermap.org/img/w/${getIcon}.png">
      <img src="http://openweathermap.org/img/w/${getIcon}.png"/>
      </a>`;

      //Honestly,I had to google about icon. It was complicated. I didn't know icon is an element of the array.

      // weatherContainer.innerHTML =
      // `<div>${icon}</div>
      //  <div> Current temperature in ${result.name} is ${temp} °C</div>`;

      weatherContainer.innerHTML = `${icon}  Current temperature in ${result.name} is ${temp} °C`;
    } else {
      throw new Error(`${result.cod} - ${result.message}`);
    }
  } catch (error) {
    weatherContainer.classList.add("error");
    weatherContainer.textContent = `Error: ${error.cod} - ${error.message}`;
  } finally {
    load.setAttribute("class", "load");
    getWeather.removeAttribute("disabled");
  }
};

//setInterval(getWeather, 10);

getWeather.addEventListener("click", getWeatherFunction);
