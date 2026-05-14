import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import "./Events.css";

function Events() {

    const navigate = useNavigate();

    const isAdmin = localStorage.getItem("isStaff") === "true";

    const defaultEvents =[
        {
            id: 1,
            title: "Hackathon",
            date: "May 10",
            location: "Campus",
            description:
                "Join us for a 24-hour coding marathon where students collaborate to create innovative projects."
        },
        {
            id: 2,
            title: "Career Fair",
            date: "May 15",
            location: "Hall A",
            description:
                "Meet top tech companies, explore internship and job opportunities, and get career advice from industry professionals."
        }
    ];

    const storedEvents =
        JSON.parse(localStorage.getItem("events"));

    const [events, setEvents] = useState(
        storedEvents || defaultEvents
    );

    useEffect(() => {

        if (!storedEvents) {

            localStorage.setItem(
                "events",
                JSON.stringify(defaultEvents)
            );
        }
    }, []);


    return (
        <div className="events-page">

            <div className="events-header">

                <h2>
                    {isAdmin ? "Events (Admin)" : "Events"}
                </h2>

                {isAdmin && (
                    <button
                        className="create-event-btn"
                        onClick={() => navigate("/create-event")}
                    >
                        Create Event
                    </button>
                )}

            </div>

            <div className="events-list">

                {events.length === 0 ? (

                    <h2>No events available.</h2>

                ) : (

                    events.map((event) => (
                        <EventCard
                            key={event.id}
                            event={event}
                        />
                    ))
                )}

            </div>

        </div>
    );
}

export default Events;