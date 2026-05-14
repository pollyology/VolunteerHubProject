import "./LandingPage.css"
import EventCard from "../components/EventCard"
import { isAuthenticated } from "../services/authService";

function LandingPage() {

	const isAuth = isAuthenticated();
	const isAdmin = localStorage.getItem("isStaff") === "true";

	let userRole = "Guest";

	if (isAuth && isAdmin) 
	{
    	userRole = "Admin";
	} 
	else if (isAuth) 
	{
    	userRole = "Volunteer";
	}

	const events = 
	[
		{
            id: 1,
            title: "Event Title",
            date: "March 19",
            location: "CSU",
            description: "Short description here"
        },
        {
            id: 2,
            title: "Event Title",
            date: "March 19",
            location: "CSU",
            description: "Short description here"
        },
        {
            id: 3,
            title: "Event Title",
            date: "March 19",
            location: "CSU",
            description: "Short description here"
        }
	]

    return (
        <div className="landing">

            <h1>Volunteer Management Platform</h1>
			<p> Find and manage volunteer opportunities</p>

			{/*
			<div className={`role-badge ${userRole.toLowerCase()}-badge`}>
   				Viewing as {userRole}
			</div>
			*/}

			<h2>Upcoming Events</h2>

			<div className="events-list">
            {events.map(event => (
                <div className="landing-event-card" key={event.id}>
					<EventCard event={event} />
				</div>
            ))}
			</div>

			<section className="announcements-section">
				<h3>Announcements</h3>

				<div className="announcement-card">
					<h4>Announcement Title</h4>
					<p>
						New volunteer orientation will be held soon. Check back here for
						important updates and reminders.
					</p>
				</div>
			</section>
			
        </div>);
}
export default LandingPage; 