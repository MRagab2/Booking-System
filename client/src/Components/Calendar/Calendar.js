import "./Calendar.css"
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import TimeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from "react"
import { BaseUrl } from "../../assets/Data"
import Cookies from "js-cookie"
import axios from "axios"


const Calendar = () => {
    const [closedResirvationStatus, setClosedResirvationStatus] = useState()
    useEffect(() => {
        axios.get(`${BaseUrl}/closed/calender`, {
            headers: {
                authToken: Cookies.get("userToken")
            }
        })
            .then(res => {

                setClosedResirvationStatus(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    }, [])



    return (
        <>
            <FullCalendar
                plugins={[dayGridPlugin, TimeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay"
                }}

                // duration={"03:00"}

                events={closedResirvationStatus}
            />
        </>
    )
}


export default Calendar