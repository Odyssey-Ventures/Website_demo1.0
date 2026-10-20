import { Hero } from "@/components/home/Hero";
import { Focus } from "@/components/home/Focus";
import { About } from "@/components/home/About";
import { Services } from "@/components/home/Services";
import { Testimonials } from "@/components/home/Testimonials";
import { Contact } from "@/components/home/Contact";
import { Banner } from "@/components/home/Banner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Focus />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Banner />
    </>
  );
}
