import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

interface Event {
  time: string;
  activity: string;
  description: string[];
}

interface DaySchedule {
  day: string;
  events: Event[];
}

const schedule: DaySchedule[] = [
    {
      day: "Saturday, March 22nd",
      events: [
        {
          time: "09:00 – 10:00",
          activity: "Registration and Breakfast",
          description: [
            "Participants check-in",
            "Receive welcome kits and swag",
            "Light breakfast provided"
          ]
        },
        {
          time: "10:00 – 10:15",
          activity: "Welcome and Introductions",
          description: [
            "Host welcomes participants",
            "Overview of the event agenda",
            "Introduction to organizers and sponsors"
          ]
        },
        {
          time: "10:15 – 10:45",
          activity: "Opening Remarks and Sponsorship Acknowledgements",
          description: [
            "Special thanks to sponsors",
            "Highlight key sponsors (e.g., Poutine Patron)"
          ]
        },
        {
          time: "10:45 – 11:30",
          activity: "Keynote Presentation",
          description: [
            'Topic: "Harnessing Cohere"',
            "Speaker: [Keynote Speaker's Name and Title]"
          ]
        },
        {
          time: "11:30 – 12:00",
          activity: "Challenge Announcement and Rules",
          description: [
            "Presentation of hackathon challenges",
            "Explanation of judging criteria and submission guidelines"
          ]
        },
        {
          time: "12:00 – 12:30",
          activity: "Team Formation",
          description: [
            "Facilitated team formation",
            "Icebreaker games to foster collaboration"
          ]
        },
        {
          time: "12:30 – 13:30",
          activity: "Lunch",
          description: [
            "Buffet-style lunch provided",
            "Networking opportunity"
          ]
        },
        {
          time: "14:00 – 16:00",
          activity: "Hacking Session Begins",
          description: [
            "Teams start working on their projects",
            "Mentors available for guidance"
          ]
        },
        {
          time: "16:00 – 16:30",
          activity: "Coffee Break and Networking",
          description: [
            "Refreshments provided",
            "Opportunity to interact with sponsors and other participants"
          ]
        },
        {
          time: "16:30 – 18:00",
          activity: "Hacking Continues",
          description: [
            "Focused development time",
            "Access to Cohere and Neo4j workshops"
          ]
        },
        {
          time: "18:00 – 19:00",
          activity: "Dinner",
          description: [
            "Buffet-style dinner provided",
            "Informal networking"
          ]
        },
        {
          time: "19:00 – 00:00",
          activity: "Hacking Continues",
          description: [
            "Late evening development"
          ]
        }
      ]
    },
    {
      day: "Sunday, March 23rd",
      events: [
        {
          time: "08:00 – 09:00",
          activity: "Breakfast",
          description: [
            "Continental breakfast provided",
            "Opportunity for early morning networking"
          ]
        },
        {
          time: "09:00 – 11:00",
          activity: "Hacking Continues",
          description: [
            "Final development push",
            "Mentors available for last-minute assistance"
          ]
        },
        {
          time: "11:00 – 11:30",
          activity: "Coffee Break and Check-In",
          description: [
            "Refreshments provided",
            "Brief check-in with teams to monitor progress and address any issues"
          ]
        },
        {
          time: "11:30 – 12:30",
          activity: "Final Hacking Session",
          description: [
            "Last hour of development",
            "Teams finalize their prototypes"
          ]
        },
        {
          time: "12:30 – 13:30",
          activity: "Lunch",
          description: [
            "Light lunch provided",
            "Opportunity for participants to relax and prepare for presentations"
          ]
        },
        {
          time: "13:30 – 14:30",
          activity: "Project Presentations",
          description: [
            "Each team presents their prototype (5 minutes per team)",
            "Q&A session with judges"
          ]
        },
        {
          time: "14:30 – 15:00",
          activity: "Judging",
          description: [
            "Judges review projects and decide on winners"
          ]
        },
        {
          time: "15:00 – 15:30",
          activity: "Awards Ceremony",
          description: [
            "Announcement of winners",
            "Presentation of prizes (1st, 2nd, 3rd Place)",
            "Special acknowledgments for sponsors"
          ]
        },
        {
          time: "15:30 – 16:00",
          activity: "Closing Remarks and Thank Yous",
          description: [
            "Summary of the event",
            "Thank sponsors, participants, volunteers",
            "Information on post-event follow-ups"
          ]
        },
        {
          time: "16:00 - 16:05",
          activity: "Event Concludes",
          description: [
            "Participants depart",
            "Optional post-event networking or socializing"
          ]
        }
      ]
    }
  ]
  
const EventRow = ({ event }: { event: Event }) => (
  <TableRow key={event.time}>
    <TableCell className="font-medium text-left w-[150px] sm:w-[100px]">{event.time}</TableCell>
    <TableCell className="text-middle w-[500px] sm:w-[200px]">{event.activity}</TableCell>
  </TableRow>
);

const DayScheduleRow = ({ daySchedule }: { daySchedule: DaySchedule }) => (
  <TableRow key={daySchedule.day}>
    <TableCell className="font-medium">{daySchedule.day}</TableCell>
    <TableCell>
      {daySchedule.events.map((event) => (
        <EventRow event={event} key={event.time} />
      ))}
    </TableCell>
  </TableRow>
);

const Schedule = () => {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] sm:w-[200px]">Day</TableHead>
            <TableHead className="w-[500px] sm:w-[200px]">Events</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schedule.map((daySchedule) => (
            <DayScheduleRow daySchedule={daySchedule} key={daySchedule.day} />
          ))}
        </TableBody>

      </Table>
    )
  }
  
  export default Schedule