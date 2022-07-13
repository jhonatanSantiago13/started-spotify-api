
// const url = "https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f";

// const userAccessToken = "9c82550d1631498bb990da4102e975c1";

// fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
//   method: "GET",
//   headers: {
//     Authorization: `Bearer ${userAccessToken}`
//   }
// })
// .then(response8 => response.json())
// .then(({beats}) => {
//   /*beats.forEach((beat, index) => {
//     console.log(`Beat ${index} starts at ${beat.start}`);
//   })*/

//   console.log("beats", beats);

  
// })

const REACT_APP_SPOTIFY_CLIENT_ID     = "f6058e5363584ca4ae6b0492d2cd6174";
const REACT_APP_SPOTIFY_CALLBACK_HOST = "http://localhost:8080//pruebaspotify/";

/*const urlSpotify = `https://accounts.spotify.com/authorize=?client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&
response_type=code&redirect_uri=${process.env.REACT_APP_SPOTIFY_CALLBACK_HOST}&scope=user-read-private}`;*/

const urlSpotify = `https://accounts.spotify.com/authorize=?client_id=${REACT_APP_SPOTIFY_CLIENT_ID}&
response_type=code&redirect_uri=${REACT_APP_SPOTIFY_CALLBACK_HOST}&scope=scope`;

const handleLoginClick = () => {

	window.location.replace(urlSpotify);

}

function hola(){

	alert("mensaje");

}