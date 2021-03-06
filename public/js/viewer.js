let map
let markers = new Map()
document.addEventListener('DOMContentLoaded', () => {
	const socket = io('/')
	const breadCrumb = [];

	socket.on('locationsUpdate', locations => {
		console.log(locations)
		locations.forEach(([ id, position]) => {
			const marker = new google.maps.Marker({
				position,
				map,
				title: id
			})
			let eachMarker = breadCrumb.push(marker)
			for(var i = 0; i < breadCrumb.length; i++){
				console.log('this is the breadCrum: ', breadCrumb[i])
				console.log(breadCrumb.length)
			}
			if(markers.has(id)) {
				const oldMarker = markers.get(id)
				oldMarker.setMap(null)
				markers.delete(id)
			}
			markers.set(id, marker)
		})
	})

	setInterval(() => {
		socket.emit('requestLocations')
	}, 2000)
}) 

function initMap() {
	navigator.geolocation.getCurrentPosition(pos => {
		//this is destructuring the object!! very cool shit. I am assigning to lat/lng
		const { latitude: lat, longitude: lng } = pos.coords
		map = new google.maps.Map(document.getElementById('map'), {
	      center: { lat, lng },
	      zoom: 15
	    })
	}, err => {
		console.error(err)
	})
}