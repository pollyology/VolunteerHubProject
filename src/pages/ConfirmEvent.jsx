import { useNavigate } from "react-router-dom";
import "./ConfirmEvent.css";

function ConfirmEvent() {

    const navigate = useNavigate();

    const eventData =
        JSON.parse(localStorage.getItem("newEvent"));

    const handleConfirm = () => {

        const existingEvents =
            JSON.parse(localStorage.getItem("events")) || [];

        existingEvents.push(eventData);

        localStorage.setItem(
            "events",
            JSON.stringify(existingEvents)
        );

        navigate("/event-created");
    };

    return (
        <div className="confirm-page">

            <div className="confirm-container">

                <h2>Confirm Event Details</h2>

                <p>
                    <strong>Title:</strong> {eventData.title}
                </p>

                <p>
                    <strong>Date:</strong> {eventData.date}
                </p>

                <p>
                    <strong>Location:</strong> {eventData.location}
                </p>

                <p>
                    <strong>Time:</strong> {eventData.time}
                </p>

                <p>
                    <strong>Description:</strong>
                    {" "}
                    {eventData.description}
                </p>

                <div className="confirm-buttons">

                    <button
                        className="back-btn"
                        onClick={() => navigate("/create-event")}
                    >
                        Back
                    </button>

                    <button
                        className="confirm-btn"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ConfirmEvent;