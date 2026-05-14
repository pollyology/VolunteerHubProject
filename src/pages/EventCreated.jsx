import { useNavigate } from "react-router-dom";
import "./EventCreated.css";

function EventCreated() {

    const navigate = useNavigate();

    const eventData =
        JSON.parse(localStorage.getItem("newEvent"));

    return (
        <div className="success-page">

            <div className="success-container">

                <h1>
                    Event Successfully Created!
                </h1>

                <p>
                    Your event has been added successfully.
                </p>

                <div className="event-summary">

                    <p>
                        <strong>Title:</strong>
                        {" "}
                        {eventData.title}
                    </p>

                    <p>
                        <strong>Date:</strong>
                        {" "}
                        {eventData.date}
                    </p>

                    <p>
                        <strong>Location:</strong>
                        {" "}
                        {eventData.location}
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

export default EventCreated;