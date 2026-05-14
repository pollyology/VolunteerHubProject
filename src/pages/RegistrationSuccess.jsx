import { useNavigate } from "react-router-dom";
import "./RegistrationSuccess.css";

function RegistrationSuccess() {

    const navigate = useNavigate();

    const registeredEvents =
        JSON.parse(localStorage.getItem("registeredEvents")) || [];

    const latestEvent =
        registeredEvents[registeredEvents.length - 1];

    return (
        <div className="success-page">

            <div className="success-container">

                <h1>
                    Thank you for volunteering for this event!
                </h1>

                <p>
                    Look forward to seeing you there!
                </p>

                <div className="event-summary">

                    <h3>Event Details:</h3>

                    <p>
                        <strong>Event Title:</strong>
                        {" "}
                        {latestEvent?.title}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        {" "}
                        {latestEvent?.date}
                    </p>

                    <p>
                        <strong>Location:</strong>
                        {" "}
                        {latestEvent?.location}
                    </p>

                    <p>
                        <strong>Time:</strong>
                        {" "}
                        {latestEvent?.time}
                    </p>

                    <p>
                        <strong>Description:</strong>
                        {" "}
                        {latestEvent?.description}
                    </p>

                </div>

                <button
                    className="events-btn"
                    onClick={() => navigate("/events")}
                >
                    Back to Events
                </button>

            </div>

        </div>
    );
}

export default RegistrationSuccess;