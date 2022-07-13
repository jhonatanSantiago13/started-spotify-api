const clientId = "f6058e5363584ca4ae6b0492d2cd6174";
const clientSecret = "9c82550d1631498bb990da4102e975c1";


// obtener el token

let token = "";

/*const _getToken = async () => {

	const result = await fetch('https://accounts.spotify.com/api/token', {

		method: 'POST',
		headers: {

			'Content-Type' : 'application/x-www-form-urlencoded',
			'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)

		},
		body: 'grant_type=client_credentials'	

	});

	const data = await result.json();
	return data.access_token;

	

}*/

const _getToken = async () =>{

	try{

		const result = await fetch('https://accounts.spotify.com/api/token', {

			method: 'POST',
			headers: {

				'Content-Type' : 'application/x-www-form-urlencoded',
				'Authorization' : 'Basic ' + btoa(clientId + ':' + clientSecret)

			},
			body: 'grant_type=client_credentials'	

		});

		const data = await result.json();
	return data.access_token;

	} catch(error){

		console.error(error);

	}

	



}

// https://www.youtube.com/watch?v=eExhxGevI6E

// const token = _getToken();


/*async function getToken(){

	const token = await _getToken();

	console.log("token", token);

}
*/

const test = async () => {

	const token = await _getToken();

		fetch("https://api.spotify.com/v1/audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
	  method: "GET",
	  headers: {
	    Authorization: `Bearer ${token}`
	  }
	})
	.then(response => response.json())
	.then(({beats}) => {
	  beats.forEach((beat, index) => {
	    console.log(`Beat ${index} starts at ${beat.start}`);
	  })
	})

}


test();