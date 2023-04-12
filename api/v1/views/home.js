const home = {};

home.index = (req, res) => {
  const status = req.session.loggedIn;
  // const name = req.session.user.firstName;
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Leaflet Map Example</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.css" />
      <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/leaflet.js"></script>
    </head>
    <body>
      <div id="mapid" style="height: 500px;"></div>
<h2 id="location">  </h2>
      <h1>Home</h1>
      <h1> Welcome to the home page loggedin? ${status}</h1>
      <br>
      <img src="${req.session.profilePic}" alt="profile picture" width="200" height="200">
      <br>
      <form action="/logout" method="PUT">
          <button type="submit">Logout</button>
      </form>
<a href="/">login or sign</a>
      <script>
        if ("geolocation" in navigator) {
          // Geolocation available
          navigator.geolocation.getCurrentPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            console.log("Latitude: " + lat + ", Longitude: " + lon);

            var mymap = L.map('mapid').setView([lat, lon], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
              maxZoom: 18,
            }).addTo(mymap);
            document.getElementById("location").innerHTML = "Latitude: " + lat + ", Longitude: " + lon; 
          
            var marker = L.marker([lat, lon]).addTo(mymap);
            marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
          });
        } else {
          // Geolocation not available
          console.log("Geolocation not available");
        }
      </script>
    </body>
    </html>
  `;
  res.send(html);
};

export default home;
