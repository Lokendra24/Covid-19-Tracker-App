const map=L.map('map').setView([22.431521860466756,77.96101362499995], 2);

const tilesUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'

const tlayer=L.tileLayer(tilesUrl,{attribution})
tlayer.addTo(map)

const clayer=L.circle([22.431,77.96],2500000)
clayer.addTo(map)


const marker=L.marker([22.431,77.96])
marker.addTo(map)

marker.bindPopup('<h1>hello i am the map</h1><img src="https://leafletjs.com/docs/images/logo.png" class="image"></img>')


// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);