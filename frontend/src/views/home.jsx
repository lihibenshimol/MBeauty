import { AiOutlineArrowLeft } from 'react-icons/ai'
import { NavLink } from 'react-router-dom'

export function HomePage() {

    const treatments = [
        {
            type: 'facial',
            name: 'טיפול פנים',
            desc: 'מבחר טיפולי פנים מקצועיים ומותאמים באופן אישי'
        },
        {
            type: 'manicure',
            name: 'מניקור&פדיקור',
            desc: 'טיפולים יסודיים לרמת ניקיון מושלמת'
        },
        {
            type: 'hair-removal',
            name: ' הסרת שיער',
            desc: 'באמצעות מכונת לייזר קר מהמתקדמות בעולם'
        },
        {
            type: 'makeup-removal',
            name: ' הסרת איפור קבוע',
            desc: 'הסרת קעקועי גבות, גוף ופיגמנט שפתיים באמצעות מכשיר B-flaxy'
        },
        {
            type: 'makeup',
            name: ' איפור ערב מקצועי',
            desc: 'איפור מקצועי ועמיד לכל אירוע, בידי מאפרות מוסמכות ומוצרים באיכות הגבוהה ביותר'
        },
    ]


    return (
        <section className="home flex">


            {/* <img className="logo" src={require(`../assets/img/hero/hero1.png`)} /> */}
            <div className='main-hero'>

                <h1 className="title animate__animated animate__slideInUp">MBeauty</h1>
                <div className='actions animate__animated animate__slideInUp'>
                    <NavLink className='cta booking' to="/contact"> <h1> תיאום תור </h1></NavLink>
                    <NavLink className='cta shop' to="/store"> <h1>  חנות </h1></NavLink>
                </div>

            </div>


            <div className="info">

                <div className='treatments-container'>

                    <div className="treatments animate__animated animate__flipInY">
                        {treatments.map((t, idx) => (
                            <div className='flip-card' key={idx}>
                                <div className='flip-card-inner'>
                                    <div className='flip-card-front treatment'>
                                        <img key={idx} className="treatment" src={require(`../assets/img/${t.type}.jpg`)} />
                                    </div>
                                    <div className='flip-card-back'>
                                        <h1>{t.name}</h1>
                                        <span>{t.desc}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                <div className="text-info full">
                    <h1>Mbeauty salon</h1>
                    <article className='text'>
                        <p className='first'>
                            הינו מכון קוסמטיקה בדימונה אשר מציע את כל פתרונות הקוסמטיקה המתקדמים במקום אחד, במחירים אטרקטיביים במיוחד ועם שירות מנצח.
                        </p>
                        <div
                        >
                            <ul>
                                מבין פתרונות האסתטיקה שאנחנו מציעות במכון:
                                <li>
                                    הסרת שיער בשיטת  shr - הסרה ללא כאבים, תופעות לוואי וסימנים. מתאימה לכל סוגי העור וצבעי השיער
                                </li>
                                <li>
                                    טיפולי פנים ואנטי אייג׳ינג פילינג
                                </li>
                                <li>
                                    בניית ציפורניים, פדיקור רפואי ומניקור רוסי
                                </li>
                                <li>
                                    הסרת איפור קבוע ופיגמנט שפתיים
                                </li>

                            </ul>
                        </div>
                    </article>
                        <img className='element2' src={require('../assets/img/text-info2.png')} alt="" />
                </div>

                <section className='about-m'>
                    <div>
                        <h3>היי! בואי נכיר</h3>
                        <p>נעים מאוד, אני מריאל בן שימול. לפני 5 שנים הקמתי את סלון היופי הראשון שלי בדימונה</p>
                        <p>וממש השנה הוקם הסניף השני בראשון לציון.</p>
                        <p>אני מאמינה בחדשות והתקדמות, באסתטיקה </p>
                        <p>אני מאמינה להוסיף עוד מלא מלא תוכן ומיליםבחדשות והתקדמות, באסתטיקה </p> 
                    </div>

                </section>

            </div>

        </section>
    )
}