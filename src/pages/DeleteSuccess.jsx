import { useLocation, useNavigate } from "react-router-dom";
import "./DeleteSuccess.css";

function DeleteSuccess() {

    const location = useLocation();
    const navigate = useNavigate();

    const event = location.state?.event;

    if (!event) {
        return <h1>No event selected.</h1>;
    }

    return (
        <div className="success-page">

            <div className="success-container">

                <h1>
                    Event Successfully Deleted
                </h1>

                <p>
                    The following event has been removed:
                </p>

                <div className="event-summary">

                    <p>
                        <strong>Title:</strong>
                        {" "}
                        {event.title}
                    </p>

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

export default DeleteSuccess;