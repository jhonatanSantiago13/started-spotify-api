
const client_id     = 'f6058e5363584ca4ae6b0492d2cd6174';
const client_secret = '9c82550d1631498bb990da4102e975c1';
const redirect_uri  = 'http%3A%2F%2Flocalhost%3A8080%2Fstarted-spotify-api%2F';

const boton = document.getElementById("probar");

boton.addEventListener("click", ()=>{

   const url = `https://accounts.spotify.com/authorize?client_id=${client_id}&scope=user-read-recently-played%20user-top-read
  &response_type=code&redirect_uri=${redirect_uri}`;

  document.location.href=url;

  // user-top-read

})



const _autToken = async () =>{

    // const link = new URLSearchParams(window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code != null) {

         try {

           const body = new URLSearchParams();
           body.append("grant_type", "authorization_code");
           body.append("redirect_uri", 'http://localhost:8080/started-spotify-api/');
           body.append("code", code);

           const result = await fetch(`https://accounts.spotify.com/api/token`,{

             method: 'POST',
             headers: {

                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)

            },
            body: body

           });

           const data = await result.json();

           // console.log("refresh_token", data.refresh_token);

           return data.refresh_token;

         } catch(e) {

             console.log(e);

         }

    }

}

// _autToken();

const getAccessToken = async ()=>{

  const urlParams = new URLSearchParams(window.location.search);
  const code      = urlParams.get('code');

  if (code != null) {

        try {

           const refresh_token = await _autToken();

           const body = new URLSearchParams();
           body.append("grant_type", "refresh_token");
           body.append("refresh_token", refresh_token);

           const result = await fetch('https://accounts.spotify.com/api/token',{

                 method: 'POST',
                headers: {

                  'Content-Type' : 'application/x-www-form-urlencoded',
                  'Authorization' : 'Basic ' + btoa(client_id + ':' + client_secret)

                },

                body: body

           });

            const data = await result.json();

           // console.log("data", data);

           return data.access_token;

        } catch(e) {

          console.log(e);

        }

  }

}

const getTopTracks = async () =>{

  const urlParams = new URLSearchParams(window.location.search);
  const code      = urlParams.get('code');

  if (code != null){

      try {

          const access_token = await getAccessToken();

          const result = await fetch('https://api.spotify.com/v1/me/top/tracks',{

              headers: {
                Authorization: `Bearer ${access_token}`
              }

          });

           const data = await result.json();

           console.log("datatracks", data);

      } catch(e) {

        console.log(e);

      }

  }

}

// getTopTracks();

/*escuchando receintemente*/

const recentlyTracks = async () =>{

  const urlParams = new URLSearchParams(window.location.search);
  const code      = urlParams.get('code');

  if (code != null){

      try {

        const access_token = await getAccessToken();

        const result = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=10&after=1661277600000`,{

             method: 'GET',
             headers:{

                 Authorization: `Bearer ${access_token}`

             }

        });

         const data = await result.json();

         console.log("recentlyTracks", data);

      } catch(e) {

        console.log(e);

      }

  }

}

// recentlyTracks();

/*const   date = new Date("08/23/2022 18:00:00"); // some mock date
const   milliseconds = date.getTime();

console.log("milliseconds", milliseconds);*/


/*Date.now()

new Date(1381216317325);*/


/*const dateStr = '08/23/2022 18:00:00 GMT';

const date = new Date(dateStr);
console.log(date); // 👉️ Wed Jun 22 2022

const timestampInMs = date.getTime();

const unixTimestamp = Math.floor(date.getTime() / 1000);
console.log(unixTimestamp); // 👉️ 1655856000*/

/*const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido);

console.log(hoy.toUTCString()); // "Sat, 13 Jun 2020 18:30:00 GMT"*/

// crea un nuevo objeto `Date`
/*var today = new Date();

// obtener la fecha y la hora
var now = today.toLocaleString();
console.log(now);*/

/*var MyDate = new Date();
console.log(MyDate);*/



/*OBTENER LA ZONA HORARIA*/

/*var MyDate = new Date();

var MyString = MyDate.toTimeString();

var MyOffset = MyString.slice(9,17);
console.log(MyOffset);*/

// https://www.epochconverter.com/


const createDate = async (fecha) =>{

      try {

        const localdate = new Date();

        const MyString = localdate.toTimeString();

        const MyOffset = MyString.slice(9,17);

        fecha += ` ${MyOffset}`;

        const date = new Date(fecha);

        const timestampInMs = date.getTime();

        const unixTimestamp = Math.floor(date.getTime() / 1000);

        return unixTimestamp;

      } catch(e) {

        console.log(e);

      }

}

// createDate("08/23/2022 18:00:00").then((result)=> console.log(result));

const recentlyTracks1 = async () =>{

  const urlParams = new URLSearchParams(window.location.search);
  const code      = urlParams.get('code');

  if (code != null){

      try {

        const access_token = await getAccessToken();

        const fechaUnix = await createDate("09/01/2022 18:00:00");

        const result = await fetch(`https://api.spotify.com/v1/me/player/recently-played?limit=10&after=${fechaUnix}`,{

             method: 'GET',
             headers:{

                 Authorization: `Bearer ${access_token}`

             }

        });

         const data = await result.json();

         console.log("recentlyTracks", data);

      } catch(e) {

        console.log(e);

      }

  }

}

recentlyTracks1();

/*https://jmperezperez.medium.com/playing-with-the-spotify-connect-api-f5c8cb62a849

https://github.com/JMPerez/spotify-player

https://developer.spotify.com/documentation/web-playback-sdk/

https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#authenticating-with-spotify

*/

