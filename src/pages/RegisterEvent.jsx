import { useLocation, useNavigate } from "react-router-dom";
import "./RegisterEvent.css";

function RegisterEvent() {

    const location = useLocation();
    const navigate = useNavigate();

    const event = location.state?.event;

    const handleRegister = () => {

        const registeredEvents =
            JSON.parse(localStorage.getItem("registeredEvents")) || [];

        const alreadyRegistered = registeredEvents.some(
            (registeredEvent) =>
                registeredEvent.title === event.title
        );

        if (alreadyRegistered) {

            alert("You are already registered for this event.");

            navigate("/my-events");

            return;
        }

        registeredEvents.push(event);

        localStorage.setItem(
            "registeredEvents",
            JSON.stringify(registeredEvents)
        );

        navigate("/registration-success");
    };

    return (
        <div className="register-page">

            <div className="register-container">

                <h1>Confirm Registration</h1>

                <p>
                    Are you sure you want to register for:
                </p>

                <div className="register-summary">

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

                <div className="register-buttons">

                    <button
                        className="cancel-btn"
                        onClick={() => navigate("/events")}
                    >
                        Cancel
                    </button>

                    <button
                        className="enter-btn"
                        onClick={handleRegister}
                    >
                        Confirm Registration
                    </button>

                </div>

            </div>

        </div>
    );
}

export default RegisterEvent;