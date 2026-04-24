function EventCard({ event }) {
const handleRegister = () => {
// TODO: Add registration logic
console.log("Registered for:", event.title);
};
return (
<div className="event-card">
<h3>{event.title}</h3>
<p>Date: {event.date}</p>
<p>Location: {event.location}</p>
<button onClick={handleRegister}>
Register
</button>
</div>
);
}
export default EventCard;