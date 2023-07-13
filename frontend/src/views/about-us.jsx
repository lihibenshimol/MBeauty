import React, { useState } from "react";
import GoogleMapReact from 'google-map-react'


const AnyReactComponent = ({ text }) => <div>{text}</div>;
export function AboutUs() {

    const [coordinates, setCoordinates] = useState({ lat: 31.06376, lng: 35.03781 })
    const zoom = 17

    return (
        <>
            {/* <button onClick={() => setCoordinates({lat: 32.082690, lng: 34.774140})}>Tel Aviv</button>
       <button onClick={() => setCoordinates({lat: 31.243870, lng: 34.793991})}>Be'er Sheva</button>
       <button onClick={() => setCoordinates({lat: 25.784560, lng: -80.366470})}>Miami</button> */}
            {/* <button onClick={() => setCoordinates({lat: 25.784560, lng: -80.366470})}>Miami</button> */}

            <div>



                <div className="map" style={{ height: '50vh', width: '50%', margin: 'auto' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyB4O57BhI5-NEa91dIdJp0kZQWc81W6Q48" }}
                        center={coordinates}
                        zoom={zoom}
                    >
                        <AnyReactComponent
                            coordinates={coordinates}
                            text="🚩"

                        />
                    </GoogleMapReact>
                </div>
            </div>
        </>
    );
}
