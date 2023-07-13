import { UserMsg } from "./user-msg";
import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';

export function AppFooter() {


    return (
        <section className="app-footer">

            <div className="opening-details">
                <h1>שעות פעילות</h1>

                <section className="opening-hours">
                    <div className="day-row">
                        <span className="day-time">10:00 - 20:00</span>
                        <span className="day-title">ראשון - חמישי</span>
                    </div> <br />
                    <div className="day-row">
                        <span className="day-time">9:00 - 15:00</span>
                        <span className="day-title">שישי</span>
                    </div> <br />
                    <div className="day-row">
                        <span className="day-time">סגור</span>
                        <span className="day-title">שבת</span>
                    </div>
                </section>
            </div>

            <div className="contact-info">
                <h1>צרו איתנו קשר</h1>
                <h3>טלפון: 08-655-5557</h3>
                <h3>אימייל: mbeauty@gmail.com</h3>
                <h3>כתובת: שדרות יגאל אלון 501, דימונה</h3>
            </div>

            <div className="social-media">
                <span className="icon"> <BsFacebook /></span>
                <span className="icon"> <AiFillInstagram /></span>

            </div>


        </section>
    )
}