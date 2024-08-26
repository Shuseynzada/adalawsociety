import { eventPicture1, placeholderImg } from "@/assets";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Event1 = {
  id: 1,
  title: "ADA LAW SOCIETY'S FIRST EVENT",
  date: new Date(2024,2,12),
  location: "New York, USA",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
  picture: eventPicture1,
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Events />
    </>
  );
}

function Hero() {
  return (
    <div className="flex flex-col justify-center items-center gap-3 my-10 text-center w-full">
      <h1>ADA LAW SOCIETY</h1>
      <p className="text-xl max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
        varius enim in eros elementum tristique.
      </p>
      <Image
        src={placeholderImg}
        alt={"hero section banner"}
        className="border w-full h-96 object-cover bg-center bg-[#D9D9D9]"
      />
    </div>
  );
}

function About() {
  return (
    <div className="grid grid-cols-2 w-full my-8">
      <Image
        src={placeholderImg}
        alt={"about section banner"}
        className="border w-[500px] aspect-[1/1] object-cover bg-center bg-[#D9D9D9]"
      />
      <div className="flex flex-col justify-center pl-2">
        <h1>About us</h1>
        <p className="text-xl max-w-md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique.
        </p>
      </div>
    </div>
  );
}

function Events() {
  return (
    <div className="flex flex-col w-[500px] lg:w-[1100px] my-6">
      <div className="flex justify-between px-6">
        <h1>Events</h1>
        <Button variant="outline" className="shadow-md">View All</Button>
      </div>
      <div className="grid lg:grid-cols-2 gap-x-20 gap-y-10 px-2 py-6 mx-auto">
        <EventCard id={Event1.id} title={Event1.title} description={Event1.description} date={Event1.date} picture={Event1.picture}/>
        <EventCard id={Event1.id} title={Event1.title} description={Event1.description} date={Event1.date} picture={null}/>
      </div>
    </div>
  );
}
