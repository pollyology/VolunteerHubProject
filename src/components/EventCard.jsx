import "./EventCard.css";
import { isAuthenticated } from "../services/authService";
import { useNavigate } from "react-router-dom";

function EventCard({ event }) {

	const navigate = useNavigate();
    const isAuth = isAuthenticated();
    const isAdmin = localStorage.getItem("isStaff") === "true";
    const registeredEvents =
        JSON.parse(localStorage.getItem("registeredEvents")) || [];

    const isRegistered = registeredEvents.some(
        (registeredEvent) =>
            registeredEvent.title === event.title
    );

    const handleRegister = () => {

        navigate("/register-event", {
            state: { event }
        });
    };

	const handleLoginRedirect = () => {
        navigate("/login");
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
                <button 
					className="register-btn"
					onClick={handleLoginRedirect}
				>
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
                        onClick={() =>
                            navigate("/delete-event", {
                                state: { event }
                            })
                        }
                    >
                        Delete Event
                    </button>
                </div>
            ) : (
                <button
                    className="register-btn"
                    onClick={handleRegister}
                    disabled={isRegistered}
                >
                    {isRegistered
                        ? "Already Registered"
                        : "Sign Up"}
                </button>
            )}

        </div>
    );
}

export default EventCard;