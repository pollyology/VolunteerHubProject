import "./EventCard.css";
import { isAuthenticated } from "../services/authService";

function EventCard({ event, onDelete }) {

    const isAuth = isAuthenticated();
    const isAdmin = localStorage.getItem("isStaff") === "true";

    const handleRegister = () => {
        console.log("Registered for:", event.title);
    };

    return (
        <div className="event-card">

            <h3>{event.title}</h3>

            <p>
                <strong>Date:</strong> {event.date}
            </p>

            <p>
                <strong>Location:</strong> {event.location}
            </p>

            <p className="event-description">
                {event.description}
            </p>

            {!isAuth ? (
                <button className="register-btn">
                    Login to Register
                </button>
            ) : isAdmin ? (
                <div className="admin-buttons">

                    <button className="edit-btn">
                        Edit Event
                    </button>

                    <button
                        className="delete-btn"
                        onClick={() => onDelete(event.title)}
                    >
                        Delete Event
                    </button>

                </div>
            ) : (
                <button
                    className="register-btn"
                    onClick={handleRegister}
                >
                    Register
                </button>
            )}

        </div>
    );
}

export default EventCard;