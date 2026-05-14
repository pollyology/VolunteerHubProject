import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyEvents.css";

function MyEvents() {

    const navigate = useNavigate();

    const storedRegisteredEvents =
        JSON.parse(localStorage.getItem("registeredEvents")) || [];

    const [registeredEvents, setRegisteredEvents] =
        useState(storedRegisteredEvents);

    const handleUnregister = (eventTitle) => {

        const updatedEvents = registeredEvents.filter(
            (event) => event.title !== eventTitle
        );

        setRegisteredEvents(updatedEvents);

        localStorage.setItem(
            "registeredEvents",
            JSON.stringify(updatedEvents)
        );
    };

    return (
        <div className="my-events-page">

            <div className="my-events-container">

                <h1>My Registered Events</h1>

                {registeredEvents.length === 0 ? (

                    <p>
                        You have not registered for any events yet.
                    </p>

                ) : (

                    registeredEvents.map((event, index) => (

                        <div
                            key={index}
                            className="registered-event-card"
                        >

                            <h2>{event.title}</h2>

                            <p>
                                <strong>Date:</strong>
                                {" "}
                                {event.date}
                            </p>

                            <p>
                                <strong>Location:</strong>
                                {" "}
                                {event.location}
                            </p>

                            <p>
                                <strong>Time:</strong>
                                {" "}
                                {event.time}
                            </p>

                            <p>
                                <strong>Description:</strong>
                                {" "}
                                {event.description}
                            </p>

                            <button
                                className="unregister-btn"
                                onClick={() => handleUnregister(event.title)}
                            >
                                Unregister
                            </button>

                        </div>
                    ))
                )}

                <button
                    className="back-btn"
                    onClick={() => navigate("/events")}
                >
                    Back to Events
                </button>

            </div>

        </div>
    );
}

export default MyEvents;