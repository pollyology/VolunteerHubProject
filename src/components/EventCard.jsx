import "./EventCard.css";
import { isAuthenticated } from "../services/authService";
import { useNavigate } from "react-router-dom";

function EventCard({ event, onDelete }) {

    const isAuth = isAuthenticated();
    const isAdmin = localStorage.getItem("isStaff") === "true";
    const navigate = useNavigate();

    const handleRegister = () => {

        navigate("/register-event", {
            state: { event }
        });
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

                    <button
                        className="edit-btn"
                        onClick={() =>
                            navigate("/edit-event", {
                                state: { event }
                            })
                        }
                    >
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