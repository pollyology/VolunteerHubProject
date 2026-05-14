import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateEvent.css";

function CreateEvent() {

    const navigate = useNavigate();

    const [eventData, setEventData] = useState({
        title: "",
        date: "",
        location: "",
        time: "",
        description: ""
    });

    const handleChange = (e) => {
        setEventData({
            ...eventData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = () => {

        console.log("New Event:", eventData);

        localStorage.setItem(
        "newEvent",
        JSON.stringify(eventData)
        );

        navigate("/confirm-event");
    };

    return (
        <div className="create-page">

            <div className="create-container">

                <h2>Enter event details below:</h2>

                <input
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    value={eventData.title}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="date"
                    placeholder="Date"
                    value={eventData.date}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={eventData.location}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="time"
                    placeholder="Time"
                    value={eventData.time}
                    onChange={handleChange}
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    value={eventData.description}
                    onChange={handleChange}
                />

                <div className="create-buttons">

                    <button
                        className="cancel-btn"
                        onClick={() => navigate("/events")}
                    >
                        Cancel
                    </button>

                    <button
                        className="enter-btn"
                        onClick={handleSubmit}
                    >
                        Enter
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CreateEvent;