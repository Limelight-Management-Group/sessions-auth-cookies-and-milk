
// console.log('this is linked together automatically!!')
document.addEventListener('DOMContentLoaded', () => {
	const socket = io('/')
	socket.emit('registerTracker')

	const positionOptions = {
		enableHighAccuracy: true,
		maximumAge: 0,
		zoom: 15
	}

	setInterval(() => {
		console.log('tick')
		navigator.geolocation.getCurrentPosition(pos => {
		//this is destructuring the object!! very cool shit. I am assigning to lat/lng
		const { latitude: lat, longitude: lng } = pos.coords
		socket.emit('updateLocation', { lat, lng })

	}, err => {
		console.error(err)
	}, positionOptions)

	}, 2000)

})