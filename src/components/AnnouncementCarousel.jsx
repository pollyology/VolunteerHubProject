import { useState, useEffect } from "react";
import "./AnnouncementCarousel.css";

function AnnouncementCarousel() 
{

    const [currentAnnouncement, setCurrentAnnouncement] = useState(0);

    const announcements = 
	[
        {
            id: 1,
            title: "Volunteer Orientation",
            message:
                "New volunteer orientation will be held soon. Check back here for important updates and reminders."
        },
        {
            id: 2,
            title: "Event Reminder",
            message:
                "Please arrive 10 minutes early for all volunteer events this month."
        },
        {
            id: 3,
            title: "New Opportunities",
            message:
                "Additional volunteer opportunities have been added for May."
        }
    ];

	// Move to prev announcement
    const goPrevious = () => 
	{
        setCurrentAnnouncement((prev) =>
            prev === 0 ? announcements.length - 1 : prev - 1
        );
    };

	// Move to next announcement
    const goNext = () => 
	{
        setCurrentAnnouncement((prev) =>
            prev === announcements.length - 1 ? 0 : prev + 1
        );
    };

	// Automatically moves to next announcement every X milliseconds
	useEffect(() => 
	{

		const interval = setInterval(() => 
		{
			goNext();
		}, 6000);

    	return () => clearInterval(interval);

	}, [currentAnnouncement]);

	// &#8249 -> HTML entity for: ' ‹ '  
	// &#8249 -> HTML entity for: ' › '
    return (
        <section className="announcements-section">

            <h3>Announcements</h3>

            <div className="announcement-carousel">

                <button
                    className="announcement-arrow"
                    onClick={goPrevious}
                >
                    &#8249;
                </button>

                <div className="announcement-card" key={currentAnnouncement}>

                    <h4>
                        {announcements[currentAnnouncement].title}
                    </h4>

                    <p>
                        {announcements[currentAnnouncement].message}
                    </p>

                </div>

                <button
                    className="announcement-arrow"
                    onClick={goNext}
                >
                    &#8250;
                </button>

            </div>

            <div className="announcement-dots">

                {announcements.map((announcement, index) => (
                    <button
                        key={announcement.id}
                        className={
                            index === currentAnnouncement
                                ? "dot active-dot"
                                : "dot"
                        }
                        onClick={() => setCurrentAnnouncement(index)}
                    />
                ))}

            </div>

        </section>
    );
}

export default AnnouncementCarousel;