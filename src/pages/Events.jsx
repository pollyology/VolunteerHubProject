import { useState } from "react";
import EventCard from "../components/EventCard";
function Events() {
    const [events] = useState([
        {
            id: 1,
            title: "Hackathon",
            date: "May 10",
            location: "Campus",
            description: "Join us for a 24-hour coding marathon where students collaborate to create innovative projects. Open to all skill levels!"
        },
        {
            id: 2,
            title: "Career Fair",
            date: "May 15",
            location: "Hall A",
            description: "Meet top tech companies, explore internship and job opportunities, and get career advice from industry professionals."
        }
    ]);
    return (<div className="container">
        <h2>Events</h2>
        <div className="events-list">
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    </div>
    );
}
export default Events;
