// Gestion du formulaire
document.getElementById('cityForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const city = document.getElementById('cityInput').value.trim();
    if (city === '') return;
    fetchWeather(city);
  });
  
  const apiKey = '806f27cf72ed1660990b02d33064b114'; // Remplacez par votre clé API OpenWeatherMap
  
  function fetchWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${apiKey}`;
    
    // Afficher le spinner et masquer les infos ou erreurs précédentes
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('weatherInfo').classList.add('hidden');
    document.getElementById('error').classList.add('hidden');
    
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Ville non trouvée ou problème avec l’API');
        }
        return response.json();
      })
      .then(data => {
        document.getElementById('loading').classList.add('hidden');
        updateWeatherInfo(data);
        updateBackground(data.weather[0].main);
      })
      .catch(error => {
        document.getElementById('loading').classList.add('hidden');
        console.error('Erreur:', error);
        document.getElementById('error').textContent = error.message;
        document.getElementById('error').classList.remove('hidden');
      });
  }
  
  function updateWeatherInfo(data) {
    // Données principales
    const cityName = `${data.name}, ${data.sys.country}`;
    const condition = data.weather[0].main;
    const description = data.weather[0].description;
    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  
    // Mise à jour de la carte principale
    document.getElementById('cityName').textContent = cityName;
    const mainIcon = document.getElementById('weatherMainIcon');
    mainIcon.src = iconUrl;
    mainIcon.alt = description;
    document.getElementById('mainCondition').textContent = condition;
    document.getElementById('mainDescription').textContent = description;
  
    // Mise à jour des cartes d'infos
    document.getElementById('temperature').textContent = Math.round(data.main.temp);
    document.getElementById('feels_like').textContent = Math.round(data.main.feels_like);
    document.getElementById('temp_min').textContent = Math.round(data.main.temp_min);
    document.getElementById('temp_max').textContent = Math.round(data.main.temp_max);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('pressure').textContent = data.main.pressure;
    document.getElementById('wind_speed').textContent = data.wind.speed;
    document.getElementById('clouds').textContent = data.clouds.all;
    document.getElementById('sunrise').textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString('fr-FR');
    document.getElementById('sunset').textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString('fr-FR');
    
    // Affichage avec animation fade-in
    const weatherInfoDiv = document.getElementById('weatherInfo');
    weatherInfoDiv.classList.remove('hidden');
    weatherInfoDiv.classList.remove('fade-in');
    // Forcer le reflow pour relancer l'animation
    void weatherInfoDiv.offsetWidth;
    weatherInfoDiv.classList.add('fade-in');
  }
  
  function updateBackground(condition) {
    // Choix du background selon la condition météo
    let backgroundStyle = '';
    
    switch (condition.toLowerCase()) {
      case 'clear':
        backgroundStyle = 'linear-gradient(to right, #56ccf2, #2f80ed)';
        break;
      case 'clouds':
        backgroundStyle = 'linear-gradient(to right, #bdc3c7, #2c3e50)';
        break;
      case 'rain':
      case 'drizzle':
        backgroundStyle = 'linear-gradient(to right, #4b79a1, #283e51)';
        break;
      case 'thunderstorm':
        backgroundStyle = 'linear-gradient(to right, #373b44, #4286f4)';
        break;
      case 'snow':
        backgroundStyle = 'linear-gradient(to right, #83a4d4, #b6fbff)';
        break;
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'dust':
      case 'fog':
      case 'sand':
      case 'ash':
      case 'squall':
      case 'tornado':
        backgroundStyle = 'linear-gradient(to right, #3e5151, #decba4)';
        break;
      default:
        backgroundStyle = 'linear-gradient(to right, #00c6ff, #0072ff)';
    }
    
    document.body.style.background = backgroundStyle;
  }
  