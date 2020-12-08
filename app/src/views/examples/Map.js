import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './Marker';
import Geocode from "react-geocode";
import './global.js';
var latitude = 0;
var longitude = 0;
Geocode.setApiKey("AIzaSyD9aslGTBwYBGkOZ858OLJtDvmmjovPs10");
    Geocode.setLanguage("en");
    Geocode.enableDebug();
    Geocode.fromAddress("2929 W 3rd St, Bloomington, IN 47404").then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        latitude = lat;
        longitude = lng;
      },
      error => {
        console.error(error);
      }
    );

class Map extends Component {
  // address()
  // {
    // let [address, setAddress] = React.useState('');
    
    // const fetchData = React.useCallback(() => {
    //   axios({
    //     "method": "GET",
    //     "url": apiVariables.apiUrl + '/api/home/theater_address/' + global.movietheaterId,
    //   })
    //     .then((response) => {
    //       console.log(response.data[0])
    //       setAddress(response.data[0])
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // }, [])
    // React.useEffect(() => {
    //   fetchData()
    // }, [fetchData])
  // }
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: latitude,
        lng: longitude
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
            lng={longitude}
            subtitle={"AMC 12"}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;