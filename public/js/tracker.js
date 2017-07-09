

document.addEventListener('DOMContentLoaded', () => {
	const socket = io('/')



	const positionOptions = {
		enableHighAccuracy: true,
		maximumAge: 0
	}

	navigator.getlocation.getCurrentPosition(pos => {
		console.log(pos.coords)
	}, err => {
		console.error(err)
	}, positionOptions)
})