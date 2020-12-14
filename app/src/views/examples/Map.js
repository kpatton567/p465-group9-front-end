import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import { apiVariables} from '../../APIConstants';
import Geocode from "react-geocode";
import './global.js';
import Marker from './Marker';
var latitude = 0;
var longitude = 0;
var latitude1 = 0;
var longitude1 = 0;
var latitude2 = 0;
var longitude2 = 0;

Geocode.setApiKey("AIzaSyD9aslGTBwYBGkOZ858OLJtDvmmjovPs10");
    Geocode.setLanguage("en");
    Geocode.enableDebug();
    
    Geocode.fromAddress("4005 South Ave, Springfield, MO 65807").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        latitude = lat;
        longitude = lng;
      },
      error => {
        console.error(error);
      }
    );
    Geocode.fromAddress("650 W Washington St, Indianapolis, IN 46204").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        latitude2 = lat;
        longitude2 = lng;
      },
      error => {
        console.error(error);
      }
    );
class Map extends Component {
  address()
  {
    let [address, setAddress] = React.useState('');
    
    const fetchData = React.useCallback(() => {
      axios({
        "method": "GET",
        "url": apiVariables.apiUrl + '/api/home/theater_address/' + global.movietheaterId,
      })
        .then((response) => {
          console.log(response.data)
          setAddress(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])
    React.useEffect(() => {
      fetchData()
    }, [fetchData])
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        latitude = lat;
        longitude = lng;
      },
      error => {
        console.error(error);
      }
    );
  }
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: latitude1,
        lng: longitude1
      },
      zoom: 15,
      height: '25vh', 
      width: '50%',
    };
  }

  render() {
    return (
      <div style={{ height: '25vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD9aslGTBwYBGkOZ858OLJtDvmmjovPs10' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <Marker
              lat={latitude}
              lng={longitude}/>
          <Marker
              lat={latitude1}
              lng={longitude1}/>
            <Marker
              lat={latitude2}
              lng={longitude2}/>
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;