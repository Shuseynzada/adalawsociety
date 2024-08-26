import { eventPicture1, placeholderImg } from "@/assets";
import EventCard from "@/components/EventCard";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Pin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Event1 = {
  id: 1,
  title: "ADA LAW SOCIETY'S FIRST EVENT",
  date: new Date(2024,7,26),
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
      <Contact />
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
    <div className="flex flex-col-reverse sm:grid grid-cols-2 w-full my-8">
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
    <div className="flex flex-col max-w-[500px] lg:max-w-[1100px] my-6">
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

function Contact(){
  return (
    <div className="text-center mb-10 mt-5">
      <h1>Contact us</h1>
      <p className="">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-center gap-10 mt-10">
        <div className="flex flex-col gap-1 justify-center items-center">
          <Mail className="size-16 bg-custom p-3 text-white rounded-full"/>
          <h3 className="p-0 m-0">Email</h3>
          <Button variant="link" className="text-customprimary text-lg"><Link href="mailto:example@gmail.com">example@gmail.com</Link></Button>
        </div>
        <div className="flex flex-col gap-1 justify-center items-center">
          <Phone className="size-16 bg-custom p-3 text-white rounded-full"/>
          <h3 className="p-0 m-0">Phone</h3>
          <Button variant="link" className="text-customprimary text-lg"><Link href="tel:+994500000000">+994 50 000 00 00</Link></Button>
        </div>
        <div className="flex flex-col sm:col-span-2 lg:col-span-1 gap-1 justify-center items-center">
          <MapPin className="size-16 bg-custom p-3 text-white rounded-full"/>
          <h3 className="p-0 m-0">Office</h3>
          <Button variant="link" className="text-customprimary text-lg text-wrap"><Link href="https://maps.app.goo.gl/ZWhfMzsPijn67dJK9" target="_blank">Ahmadbey Aghaoglu str. 61 Baku, 1008</Link></Button>
        </div>
      </div>
    </div>
  )
}
