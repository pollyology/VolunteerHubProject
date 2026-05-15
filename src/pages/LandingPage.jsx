import "./LandingPage.css"
import EventCard from "../components/EventCard"
import AnnouncementCarousel from "../components/AnnouncementCarousel";
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
            title: "Battle at the Hive 4",
            date: "May 8",
            location: "The Nest",
            description: "Volunteers needed for tabling and setting up."
        },
        {
            id: 2,
            title: "5th Annual Beach Volleyball Tournament",
            date: "May 14",
            location: "Hornet Commons",
            description: "Volunteers needed for handing out t-shirts and prizes."
        },
        {
            id: 3,
            title: "River Clean Up",
            date: "May 15",
            location: "American River - Meet at Peak Adventures",
            description: "Join Peak for our monthly clean-up of our section of the American River."
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

			<AnnouncementCarousel />
			
        </div>);
}
export default LandingPage; 