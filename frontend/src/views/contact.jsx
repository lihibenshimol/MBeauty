import GoogleMapReact from 'google-map-react'
// import '../lib/animate.css'
import emailjs from '@emailjs/browser';
import { useRef, useState } from 'react';
import { AppFooter } from '../cpms/app-footer';








const AnyReactComponent = ({ text }) => <div>{text}</div>;
export function Contact() {
    const form = useRef()
    const [msg, showMsg] = useState(false)

    const sendEmail = (e) => {
        showMsg(false)
        e.preventDefault()

        emailjs.sendForm('service_fvfu8sq', 'template_ed4u1sk', form.current, 'BoY2LAzIgsVT8ZLts')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

        // showMsg(!msg)

    }


    const [coordinates, setCoordinates] = useState({ lat: 31.06376, lng: 35.03781 })
    const zoom = 17

    return (
        <>

            <div className='contact flex'>

                <div className="map">
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


                <div className='contact-form'>
                    <form ref={form} onSubmit={sendEmail} >
                        <h1>Mbeauty by Meriel</h1>

                        <input type="text" required name="from_name" placeholder='שם מלא' />

                        <input type="email" required name="from_email" placeholder='אימייל' />

                        <textarea name="message" placeholder='הודעה...' />
                        <div className='actions'>
                            <button>שליחה</button>
                        </div>
                    </form>

                </div>

            </div>

            < AppFooter />

        </>
    );
}