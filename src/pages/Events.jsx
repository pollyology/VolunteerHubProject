import { useState } from "react";
import EventCard from "../components/EventCard";
function Events() {
const [events] = useState([
{
id: 1,
title: "Hackathon",
date: "May 10",
location: "Campus"
},
{
id: 2,
title: "Career Fair",
date: "May 15",
location: "Hall A"
}
]);
return (<div className="container">
<h2>Events</h2>
<div className="events-list">
{events.map(event => (
<EventCard key={event.id} event={event} />
))}
</div>
</div>
);
}
export default Events;
