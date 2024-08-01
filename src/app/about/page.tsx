import Image from "next/image";
import React from "react";
import aboutPortrait from "../../../public/about_portrait.jpg";
import aboutPortrait2 from "../../../public/about_portrait2.jpg";
import Footer from "@/components/Footer";

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col lg:flex-row">
        <div className="flex flex-col items-center">
          <h1 className="z-10 relative hidden sm:block m-4">About Us</h1>
          <div className="relative h-[500px] sm:rounded-3xl w-full sm:w-96 overflow-hidden">
            <h1 className="z-10 relative sm:hidden">About Us</h1>
            <Image
              src={aboutPortrait2}
              alt="About Portrait"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className=""
            />
          </div>
        </div>
        <div className="p-6">
          <h2>Who we are</h2>
          <p className="mb-4">
            At Elite Home Inspection Group, we are dedicated to providing
            thorough, reliable, and professional inspection services. With years
            of experience in the industry, our team of certified inspectors
            ensures that every inspection is conducted with the highest level of
            accuracy and integrity.
          </p>
          <h2>Our Mission</h2>
          <p className="mb-4">
            Our mission is to deliver peace of mind to our clients by offering
            comprehensive inspection services that meet and exceed industry
            standards. We strive to be the most trusted inspection company,
            known for our commitment to quality and customer satisfaction.
          </p>
          <h2>Why Choose Us</h2>
          <p className="mb-4">
            Certified Professionals: Our inspectors are fully certified and
            trained to provide the highest quality inspections. Detailed
            Reports: We provide clear, comprehensive reports to help you
            understand the condition of your property. Customer Focused: We
            prioritize your satisfaction and work diligently to address all your
            inspection needs.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
