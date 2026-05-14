import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./CreateEvent.css";

function EditEvent() {

    const location = useLocation();
    const navigate = useNavigate();

    const event = location.state?.event;

    const [title, setTitle] = useState(event?.title || "");
    const [date, setDate] = useState(event?.date || "");
    const [locationText, setLocationText] = useState(event?.location || "");
    const [time, setTime] = useState(event?.time || "");
    const [description, setDescription] = useState(event?.description || "");

    const handleSave = () => {

        const storedEvents =
            JSON.parse(localStorage.getItem("events")) || [];

        const updatedEvents = storedEvents.map((storedEvent) => {

            if (storedEvent.title === event.title) {

                return {
                    ...storedEvent,
                    title,
                    date,
                    location: locationText,
                    time,
                    description
                };
            }

            return storedEvent;
        });

        localStorage.setItem(
            "events",
            JSON.stringify(updatedEvents)
        );

        navigate("/events");
    };

    return (
        <div className="create-page">

            <div className="create-container">

                <h2>Edit Event</h2>

                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={locationText}
                    onChange={(e) => setLocationText(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <div className="button-group">

                    <button
                        className="cancel-btn"
                        onClick={() => navigate("/events")}
                    >
                        Cancel
                    </button>

                    <button
                        className="enter-btn"
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>

                </div>

            </div>

        </div>
    );
}

export default EditEvent;