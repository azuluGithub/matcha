import React, { Component } from "react";
import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

var myIcon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],
});

class ViewUserMap extends Component {

  render() {
    const position = [this.props.lati, this.props.long]
      return (
        <Map style={{height:"50vh",zIndex:"-1"}} center={position} zoom="15">
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
         
          <Marker position={position} icon={myIcon} >
            <Popup> Just a pop-up. <br /> nothing serious!!.</Popup>
          </Marker>
        </Map>
      )
   }
}

export default ViewUserMap;