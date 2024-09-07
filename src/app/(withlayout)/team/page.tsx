import React from "react";

const boardDirectors = [
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
      <div className="text-center">
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
      </div>
    </div>
  );
};

export default TeamPage;
