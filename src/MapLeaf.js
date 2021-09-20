import React from 'react'
import { MapContainer, TileLayer,Popup,Circle} from 'react-leaflet'
import numeral from "numeral"

const casesTypeColors = {
    cases: {
      hex: "#CC1034",
      multiplier: 150,
    },
    recovered: {
      hex: "#7dd71d",
      multiplier: 200,
    },
    deaths: {
      hex: "#fb4443",
      multiplier: 1000,
    },
  };

export default function MapLeaf({center,zoom,countryy,colorType,caseType}) {

    console.log('caetype is',caseType)
    console.log('colortype is',colorType)
    return (
        
        <div className="map">
            <MapContainer center={center} zoom={zoom}>
                <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                     
                     {
                         countryy.map((contry)=>(
                            <Circle
                            center={[contry.countryInfo.lat, contry.countryInfo.long]}
                            color={colorType}
                            fillColor={colorType} 
                            fillOpacity={0.4}
                            radius={
                              Math.sqrt(contry[caseType]) * casesTypeColors[caseType].multiplier
                            }
                          >
                         <Popup className="popup_setup">
                        <img src={contry.countryInfo.flag} alt="img" />
                        <h3>Country {contry.country}</h3> 
                         
                        <div className="setup_space">
                        <h4>Cases {numeral(contry.cases).format("0,0")}</h4>       
                        <h4>Recovered {numeral(contry.recovered).format("0,0")}</h4>       
                        <h4>Deaths {numeral(contry.deaths).format("0,0")}</h4> 
                        </div>           
                         </Popup>
                         </Circle>
                         ))
                    

                     }
                    
            </MapContainer>
        </div>
    )
}

