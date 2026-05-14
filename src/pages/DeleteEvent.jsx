import { useLocation, useNavigate } from "react-router-dom";
import "./DeleteEvent.css";

function DeleteEvent() {

    const location = useLocation();
    const navigate = useNavigate();

    const event = location.state?.event;
    if (!event) {
        return <h1>No event selected.</h1>;
    }

    const handleDelete = () => {

        const storedEvents =
            JSON.parse(localStorage.getItem("events")) || [];

        const updatedEvents = storedEvents.filter(
            (storedEvent) =>
                storedEvent.title !== event.title
        );

        localStorage.setItem(
            "events",
            JSON.stringify(updatedEvents)
        );

        navigate("/delete-success", {
            state: { event }
        });
    };

    return (
        <div className="delete-page">

            <div className="delete-container">

                <h1>Delete Event</h1>

                <p>
                    Are you sure you want to delete this event?
                </p>

                <div className="delete-summary">

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

                <div className="delete-buttons">

                    <button
                        className="cancel-btn"
                        onClick={() => navigate("/events")}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-btn"
                        onClick={handleDelete}
                    >
                        Confirm Delete
                    </button>

                </div>

            </div>

        </div>
    );
}

export default DeleteEvent;