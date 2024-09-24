import React from "react";

const boardDirectors = [
  {
    name: "Muslum Mammadov",
    job: "President",
  },
  {
    name: "Murad Iskandar",
    job: "Vice-president",
  },
  {
    name: "Jalala Hajiyeva",
    job: "Treasurer",
  },
  {
    name: "Hayat Namazova",
    job: "Secretary",
  },
  {
    name: "Nilufar Taghiyeva",
    job: "Editor-in-chief",
  },
  {
    name: "Maleyka Salamzada",
    job: "Blog Manager",
  },
  {
    name: "Ayan Yusibli",
    job: "Blog Manager",
  },
  {
    name: "Hayat Heydarova",
    job: "Blog Editor",
  },
  {
    name: "Sevinj Huseynova",
    job: "Blog Editor",
  },
  {
    name: "Aytaj Shahmarova",
    job: "Event Manager",
  },
  {
    name: "Asim Zulfugarli",
    job: "Event Planner",
  },
  {
    name: "Tajira Maharramova",
    job: "Event Planner",
  },
  {
    name: "Aysel Salimova",
    job: "Debate Organizer",
  },
  {
    name: "Salman Huseynov",
    job: "Debate Organizer",
  },
  {
    name: "Gular Mammadova",
    job: "Debate Specialist",
  },
  {
    name: "Hafiz Bayarli",
    job: "Logistic Coordinator",
  },
  {
    name: "Vatan Mammadova",
    job: "Marketing Manager",
  },
  {
    name: "Samira Sharifova",
    job: "Graphic Designer",
  },
  {
    name: "Arzu Mirzayeva",
    job: "Content Creator",
  },
  {
    name: "Zivar Naghizada",
    job: "Interviewer",
  },
  {
    name: "Ramzi Samadov",
    job: "Volunteer",
  },
];

const eventCommitte = [
  {
    name: "Full name",
    job: "Job Title",
  },
  {
    name: "Full name",
    job: "Job Title",
  },
  {
    name: "Full name",
    job: "Job Title",
  },
  {
    name: "Full name",
    job: "Job Title",
  },
  {
    name: "Full name",
    job: "Job Title",
  },
  {
    name: "Full name",
    job: "Job Title",
  },
  {
    name: "Full name",
    job: "Job Title",
  },
];

const TeamPage = () => {
  return (
    <div className="flex flex-col gap-12 items-center justify-center">
      <div className="text-center">
        <h1>Board</h1>
        <div className="flex justify-center gap-10 mt-5 flex-wrap">
          {boardDirectors.map((director, index) => (
            <div key={index} className="text-center">
              <div className="w-60 h-4 bg-[#D9D9D9]"></div>
              <h3>{director.name}</h3>
              <p>{director.job}</p>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="text-center">
        <h1>Event committie</h1>
        <div className="flex justify-center gap-10 mt-5 flex-wrap">
          {eventCommitte.map((director, index) => (
            <div key={index} className="text-center">
              <div className="w-60 h-4 bg-[#D9D9D9]"></div>
              <h3>{director.name}</h3>
              <p>{director.job}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <h1>Blog committie</h1>
        <div className="flex justify-center gap-10 mt-5 flex-wrap">
          {eventCommitte.map((director, index) => (
            <div key={index} className="text-center">
              <div className="w-60 h-4 bg-[#D9D9D9]"></div>
              <h3>{director.name}</h3>
              <p>{director.job}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center">
        <h1>Marketing committie</h1>
        <div className="flex justify-center gap-10 mt-5 flex-wrap">
          {eventCommitte.map((director, index) => (
            <div key={index} className="text-center">
              <div className="w-60 h-4 bg-[#D9D9D9]"></div>
              <h3>{director.name}</h3>
              <p>{director.job}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default TeamPage;
