document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector("button");
  const input = document.querySelector("input");
  const forecastDiv = document.querySelector(".forecast");

  button.addEventListener("click", () => {
    const city = input.value.trim();
    if (!city) {
      forecastDiv.innerHTML = "<p>Lütfen bir şehir adı giriniz.</p>";
      return;
    }

    fetch(`https://wttr.in/${city}?format=j1`)
      .then(response => response.json())
      .then(data => {
        const current = data.current_condition[0];
        const temp = current.temp_C;
        const desc = current.weatherDesc[0].value;
        const humidity = current.humidity;
        const wind = current.windspeedKmph;

        forecastDiv.innerHTML = `
          <div class="weather-card">
            <h2>${city.toUpperCase()}</h2>
            <p><strong>Sıcaklık:</strong> ${temp}°C</p>
            <p><strong>Hava Durumu:</strong> ${desc}</p>
            <p><strong>Nem:</strong> ${humidity}%</p>
            <p><strong>Rüzgar:</strong> ${wind} km/h</p>
          </div>
        `;
      })
      .catch(error => {
        forecastDiv.innerHTML = "<p>Bilgiler alınamadı. Şehir ismini kontrol edin.</p>";
        console.error("Hata:", error);
      });
  });
});