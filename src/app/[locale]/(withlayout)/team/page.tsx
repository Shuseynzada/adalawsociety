import React from "react";

const boardDirectors = [
  { name: "Muslum Mammadov", job: "President" },
  { name: "Murad Iskandar", job: "Vice-president" },
  { name: "Nilufar Taghiyeva", job: "Editor-in-chief" },
  { name: "Aytaj Shahmarova", job: "Event Manager" },
  { name: "Vatan Mammadova", job: "Marketing Manager" },
  { name: "Hayat Namazova", job: "Secretary" },
  { name: "Jalala Hajiyeva", job: "Treasurer" },
];

const eventCommittee = [
  { name: "Asim Zulfugarli", job: "Event Planner" },
  { name: "Tajira Maharramova", job: "Event Planner" },
  { name: "Hafiz Bayarli", job: "Logistic Coordinator" },
  { name: "Salman Huseynov", job: "Debate Organizer" },
  { name: "Aysel Salimova", job: "Debate Organizer" },
  {name:"Guler Gurbanli", job:"Debate Specialist"}
];

const blogCommittee = [
  { name: "Ayan Yusibli", job: "Blog Manager" },
  { name: "Maleyka Salamzada", job: "Blog Manager" },
];

const marketingCommittee = [
  { name: "Samira Sharifova", job: "Graphic Designer" },
  { name: "Arzu Mirzayeva", job: "Content Creator" },
  { name: "Zivar Naghizada", job: "Interviewer" },
];

const Section = ({ title, members }: { title: string; members: { name: string; job: string }[] }) => (
  <div className="text-center w-full">
    <h2 className="text-2xl font-semibold text-[#346178] mb-6">{title}</h2>
    <div className="flex flex-wrap justify-center gap-6">
      {members.map((member, index) => (
        <div key={index} className="w-60 bg-white shadow rounded-md p-4 border border-gray-200">
          <div className="w-full h-1 bg-[#D9D9D9] mb-3" />
          <h3 className="text-lg font-semibold">{member.name}</h3>
          <p className="text-sm text-gray-600">{member.job}</p>
        </div>
      ))}
    </div>
  </div>
);

const TeamPage = () => {
  return (
    <div className="flex flex-col gap-16 items-center justify-center px-4 py-10">
      <Section title="Board" members={boardDirectors} />
      <Section title="Event Committee" members={eventCommittee} />
      <Section title="Blog Committee" members={blogCommittee} />
      <Section title="Marketing Committee" members={marketingCommittee} />
    </div>
  );
};

export default TeamPage;
