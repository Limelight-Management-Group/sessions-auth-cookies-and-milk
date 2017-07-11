let map
let markers = new Map()
document.addEventListener('DOMContentLoaded', () => {
	const socket = io('/')

	socket.on('locationsUpdate', locations => {
		console.log(locations)
		locations.forEach(([ id, position]) => {
			const marker = new google.maps.Marker({
				position,
				map,
				title: id
			})
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
	}, 1000)
}) 

function initMap() {
	navigator.geolocation.getCurrentPosition(pos => {
		//this is destructuring the object!! very cool shit. I am assigning to lat/lng
		const { latitude: lat, longitude: lng } = pos.coords
		map = new google.maps.Map(document.getElementById('map'), {
	      center: { lat, lng },
	      zoom: 8
	    })
	}, err => {
		console.error(err)
	})
}