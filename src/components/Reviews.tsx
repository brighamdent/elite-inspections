import React from "react";
import customer1 from "../../public/customer1.png";
import customer2 from "../../public/customer2.png";
import customer3 from "../../public/customer3.png";
import Image from "next/image";
import HomepageDivider from "./HomepageDivider";

export const Reviews = () => {
  const reviews = [
    {
      name: "Racheal D.",
      photo: customer1,
      review:
        "I couldn't be happier with the service provided by Elite Home Inspection Group. The inspector was thorough, professional, and took the time to explain everything in detail. The report was comprehensive and helped me feel confident in my home purchase. Highly recommend!",
    },
    {
      name: "Daniel G.",
      photo: customer2,
      review:
        "Elite Home Inspection Group exceeded my expectations. They were punctual, friendly, and incredibly knowledgeable. The inspector found issues that I would have never noticed, saving me from future headaches. Their detailed report and helpful recommendations made all the difference. Thank you!",
    },
    {
      name: "Laura P.",
      photo: customer3,
      review:
        "Working with Elite Home Inspection Group was a fantastic experience. From scheduling the appointment to receiving the final report, everything was seamless. The inspector was patient and answered all our questions. We felt reassured knowing that our new home was thoroughly inspected. Excellent service!",
    },
  ];
  return (
    <div className="flex flex-col items-center">
      <HomepageDivider>
        <h1>Reviews</h1>
        <p>Don’t take our word for it, hear our clients have to say!</p>
      </HomepageDivider>
      <div className="mt-4 mb-6 m-2 flex flex-col lg:flex-row">
        {reviews.map((review) => (
          <div className="flex flex-col items-center bg-royalblue rounded-xl p-6 h-[600px] lg:w-[30vw] lg:max-w-[390px] justify-around mt-8 m-4">
            {" "}
            <Image src={review.photo} alt="" />
            <h3>{review.review}</h3>
            <h2>- {review.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};
