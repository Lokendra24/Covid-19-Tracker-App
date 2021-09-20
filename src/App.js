import "./App.css";
import { Select, FormControl, MenuItem, Card, CardContent } from '@material-ui/core';
import { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import Tablee from "./Tablee";
import MapLeaf from "./MapLeaf";
import 'leaflet/dist/leaflet.css';
import { sortData, prettyprintstat } from './Util';


export default function App() {

  const [countrie, setcountrie] = useState([])
  const [decountry, setdecountry] = useState('Worldwide');
  const [countryInfo, setcontryInfo] = useState({})
  const [center, setCenter] = useState({ lat: 22.43, lng: 77.96 })
  const [zoom, setZoom] = useState(3)
  const [caseType,setCaseType]=useState('cases')
  const [colorType,setcolorType]=useState('red')

  const UseEffectAPI = () => {

    const getdata = async () => {

      await fetch('https://corona.lmao.ninja/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          setcountrie(data)
        })
    }

    useEffect(() => {
      getdata();
    }, [])
  }
  UseEffectAPI()

  // working on when page is reloded
  useEffect(() => {

    fetch('https://corona.lmao.ninja/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setcontryInfo(data)
      })

  }, [])

  // onchnage function
  const onCountryChange = async (event) => {

    const countrycode = event.target.value;
    // console.log("your country code is",countrycode.countryInfo.iso2);
    setdecountry(countrycode);

    console.log("country code is >>", countrycode)

    if (countrycode === 'Worldwide') {
      //  https://corona.lmao.ninja/v3/covid-19/all
      await fetch('https://corona.lmao.ninja/v3/covid-19/all')
        .then((response) => response.json())
        .then((data) => {
          setdecountry(countrycode)
          setcontryInfo(data)

          setCenter([data.countryInfo.lat, data.countryInfo.long])
          setZoom(13)
          // console.log('zoom value is .>>>>',zoom)
        })
    } else {
      await fetch(`https://disease.sh/v3/covid-19/countries/${countrycode}`)
        .then((response) => response.json())
        .then((data) => {
          setdecountry(countrycode)
          setcontryInfo(data)

          setCenter([data.countryInfo.lat, data.countryInfo.long])
          setZoom(13)
        })
    }
  }

  console.log("country detail >>", countryInfo)

  return (
    <div className="front_view">
      <div className="left_view">
        <div className="App__hader">
          <h1>Covid-19 tracker</h1>
          <FormControl >
            <Select variant="outlined" value={decountry} onChange={onCountryChange}>
              <MenuItem value="Worldwide">worldwide</MenuItem>
              {
                countrie.map((contry) => (
                  <MenuItem value={contry.countryInfo.iso2}>{contry.country}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </div>

        {/* infobox    */}
        <div className="App__left">
          <InfoBox title="coronavirus cases" cases={prettyprintstat(countryInfo.todayCases)} total={prettyprintstat(countryInfo.cases)}
          onClick={(e)  => {
            setCaseType('cases') 
            setcolorType('red')
          }
        } />

          <InfoBox title="recover" cases={prettyprintstat(countryInfo.todayRecovered)} total={prettyprintstat(countryInfo.recovered)}
           onClick={(e)  => {
            setCaseType('recovered') 
            setcolorType('green')          }
          } />
          
          <InfoBox title="daths" cases={prettyprintstat(countryInfo.todayDeaths)} total={prettyprintstat(countryInfo.deaths)} 
           onClick={(e) => {  
          setCaseType('deaths') 
           setcolorType('red')  
          }
          } />
        </div>

        {/* map */}

        <Card className="map-section">
          <CardContent>
            <MapLeaf center={center} zoom={zoom} countryy={countrie} colorType={colorType} caseType={caseType}/>
          </CardContent>
        </Card>

      </div>

      {/* table */}
      <div className="App_right">
        <Card >
          <CardContent>
            <h3>Corona Cases Country Wise</h3>
            <Tablee countrie={sortData(countrie)} /> {/*when pass the data not use first latter capital */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


