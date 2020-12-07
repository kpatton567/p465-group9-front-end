import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Geocode from "react-geocode";
import axios from 'axios';
import { apiVariables } from '../../APIConstants';
var latitude = 0;
var longitude = 0;


class Map extends Component {
  address(props)
  {
    let [address, setAddress] = React.useState('');
    
    const fetchData = React.useCallback(() => {
      axios({
        "method": "GET",
        "url": apiVariables.apiUrl + '/api/home/theater_address/' + props.theaterId,
      })
        .then((response) => {
          setAddress(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])
    React.useEffect(() => {
      fetchData()
    }, [fetchData])
    Geocode.setApiKey("AIzaSyD9aslGTBwYBGkOZ858OLJtDvmmjovPs10");
    Geocode.setLanguage("en");
    Geocode.enableDebug();
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
    console.log(props.theaterId)
    this.state = {
      center: {
        lat: latitude,
        lng: longitude
      },
      zoom: 11,
      height: '25vh', 
      width: '50%',
      movieId:0
    };
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '25vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD9aslGTBwYBGkOZ858OLJtDvmmjovPs10' }}
          defaultCenter={this.state.center}
          defaultZoom={this.state.zoom}
        >
          <Marker
            lat={latitude}
            lng={longitude}
            title="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;