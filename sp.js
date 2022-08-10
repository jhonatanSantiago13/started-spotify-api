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

// test();

const getAlbum = async (artist) => {

	const token = await _getToken();

	// https://api.spotify.com/v1/search/?q=${artist}&type=artist

	fetch(`https://api.spotify.com/v1/artists/${artist}/albums`,{

		method: "GET",
		headers: {
	    Authorization: `Bearer ${token}`
	  	}
	})

	.then(response => response.json())
	.then(response => {

		// console.log("response", response.items);

		const albums = response.items;

		albums.forEach((data, index)=>{

			console.log("album", data.name);

		})

	})

}

// getAlbum("06HL4z0CvFAxyc27GXpf02");

const getIdArtist = async (name) => {

	const token = await _getToken();

	fetch(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {

		method: "GET",
		headers: {
	    Authorization: `Bearer ${token}`
	  	}

	})
	.then(response => response.json())
	.then(response =>{

  		// console.log("response", response.artists.items);

  		const artist =  response.artists.items;

  		console.log("id", response.artists.items[0].id);

  		/*artist.forEach((data, index) =>{

  			console.log("id", data.id);

  		})*/

	})

}

// getIdArtist("taylor%20swift");


const getIdArtist1 = async (name) => {

	try {

		const token = await _getToken();

		const response = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=artist`, {

			method: "GET",
			headers: {
		    Authorization: `Bearer ${token}`
		  	}

		})

		const data = await response.json();

		// console.log("data", data.artists.items[0].id);

		return data.artists.items[0].id;




	} catch(error) {

		console.log(error);

	}


}

// getIdArtist1("taylor%20swift").then((value)=>console.log("id", value));


const getAlbumnsidArtist = async (name) =>{


 	try {

 		const token    = await _getToken();
 		const idArtist = await getIdArtist1(name);

 		const response = await fetch(`https://api.spotify.com/v1/artists/${idArtist}/albums`,{

 			method: "GET",
			headers: {
		    Authorization: `Bearer ${token}`
		  	}

 		})

 		const data = await response.json();

 		// console.log("data", data.items);

 		data.items.forEach((value, index, array)=>{

 			console.log("album", value.name);

 		})


 	} catch(error) {

 		console.log(error);
 	}

}

// getAlbumnsidArtist("taylor%20swift");


const getAlbumId = async (name) =>{

	try {
		const token = await _getToken();

		const response = await fetch(`https://api.spotify.com/v1/search?q=${name}&type=album`, {

			method: "GET",
		    mode: 'cors',
			headers: {
			ContentType: 'application/json',
		    Authorization: `Bearer ${token}`
		  	}

		})

		const data = await response.json();

		console.log("data", data);

	} catch(error) {

		console.log(error);

	}

}

getAlbumId("speak%now");
// mode: 'no-cors', https://ajaxhispano.com/ask/origen-http-localhost3000-no-esta-permitido-por-access-control-allow-origin-17092/



