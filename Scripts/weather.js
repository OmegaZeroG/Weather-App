const apiKey = "dd5c6e4290448ca08ee181c6be04f5e5";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCard = document.querySelector(".card");
const weatherSection = document.querySelector(".weather");
const errorSection = document.querySelector(".err");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (response.status === 404 || !data.main) {
            weatherSection.style.display = "none";
            errorSection.style.display = "block";
            resetBackground();
        } 
        else {
        
            errorSection.style.display = "none";
            document.querySelector(".city").textContent = data.name;
            document.querySelector(".temp").textContent =
                Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").textContent =
                data.main.humidity + "%";
            document.querySelector(".wind").textContent = data.wind.speed + " Km/H";
            document.querySelector(".description").textContent =
                data.weather[0].description;
            document.querySelector(".pressure").textContent =
                data.main.pressure + " hPa";
            document.querySelector(".visibility").textContent =
                (data.visibility / 1000).toFixed(1) + " km";

            
            const weather = data.weather[0].main.toLowerCase();
            const iconPath = `Images/${weather}.png`;
            weatherIcon.onerror = () => (weatherIcon.src = "Images/clear.png"); 
            weatherIcon.src = iconPath;

            
            weatherSection.style.opacity = 0;
            weatherSection.style.display = "block";
            setTimeout(() => (weatherSection.style.opacity = 1), 50);

            
            updateBackground(weather);
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        weatherSection.style.display = "none";
        errorSection.style.display = "block";
        resetBackground();
    }

    searchBox.value = "";
}


function updateBackground(weatherType) {
    const backgrounds = {
        clear: "linear-gradient(135deg, #f6d365, #fda085)",
        clouds: "linear-gradient(135deg, #d7d2cc, #304352)",
        rain: "linear-gradient(135deg, #89f7fe, #66a6ff)",
        snow: "linear-gradient(135deg, #e0eafc, #cfdef3)",
        mist: "linear-gradient(135deg, #cfd9df, #e2ebf0)",
        thunderstorm: "linear-gradient(135deg, #3a3a3a, #1f1c2c)",
        default: "linear-gradient(135deg, #00feba, #5b548a)",
    };

    weatherCard.style.background =
        backgrounds[weatherType] || backgrounds["default"];
}


function resetBackground() {
    weatherCard.style.background = "linear-gradient(135deg, #00feba, #5b548a)";
}


searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") checkWeather(searchBox.value.trim());
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
        checkWeather(searchBox.value.trim());
    }
});
