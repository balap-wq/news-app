import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Articledetailpage from "./Articledetailpage";

export default function Headlinecards() {

  

  const navigate = useNavigate();

  const placeholder = "https://picsum.photos/seed/picsum/200/300";

  const item = [
    {
      id: 1,
      title: "ANNA ANNI",
      source: "Sample Source",
      publishedAt: "2024-06-01T12:00:00Z",
      description: `Sangeetha alleged that since 2021, Vijay had emotionally withdrawn from their relationship and treated her with verbal disdain. According to the petition, she experienced what she described as constructive desertion, which forced her to live separately within the same matrimonial home. During this period, Vijay reportedly continued traveling abroad and attending public events with a particular actress.

She also claimed that the actress frequently shared photos of their outings together on social media. Sangeetha stated that Vijay neither denied nor objected to these posts, which she believes implicitly endorsed the public perception of their association.

Vijay and Sangeetha first met in 1996. Originally from Sri Lanka and raised in Britain, Sangeetha later married Vijay in the United Kingdom in 1998 through a registered marriage. The couple also held a traditional Hindu wedding ceremony in Chennai on August 25, 1999. They have two children: a son, Jason, and a daughter, Dhivya.`
,
      urlToImage: placeholder,
    },
    {
      id: 2,
      title: "Another News Title",
      source: "Another Source",
      publishedAt: "2024-06-02T15:30:00Z",
      description: "Details about the second news article.",
      urlToImage: placeholder,
    },
    {
      id: 3,
      title: "Third News Title",
      source: "Third Source",
      publishedAt: "2024-06-03T10:45:00Z",
      description: "More information about the third article.",
      urlToImage: placeholder,
    },
    {
      id: 4,
      title: "Fourth News Title",
      source: "Fourth Source",
      publishedAt: "2024-06-04T08:20:00Z",
      description: "Insights on the fourth news article.",
      urlToImage: placeholder,
    },
    {
      id: 5,
      title: "Fifth News Title",
      source: "Fifth Source",
      publishedAt: "2024-06-05T14:15:00Z",
      description: "Details about the fifth news article.",
      urlToImage: placeholder,
    },
     {
      id: 6,
      title: "Third News Title",
      source: "Third Source",
      publishedAt: "2024-06-03T10:45:00Z",
      description: "More information about the third article.",
      urlToImage: placeholder,
    },
    {
      id: 7,
      title: "Fourth News Title",
      source: "Fourth Source",
      publishedAt: "2024-06-04T08:20:00Z",
      description: "Insights on the fourth news article.",
      urlToImage: placeholder,
    },
    {
      id: 8,
      title: "Fifth News Title",
      source: "Fifth Source",
      publishedAt: "2024-06-05T14:15:00Z",
      description: "Details about the fifth news article.",
      urlToImage: placeholder,
    },
      {
       id: 9,
      title: "Fourth News Title",
      source: "Fourth Source",
      publishedAt: "2024-06-04T08:20:00Z",
      description: "Insights on the fourth news article.",
      urlToImage: placeholder,
    },
    {
      id: 10,
      title: "Sixth News Title",
      source: "Sixth Source",
      publishedAt: "2024-06-06T11:30:00Z",
      description: "Details about the sixth news article.",
      urlToImage: placeholder,
    },
    {
      id: 11,
      title: "Seventh News Title",
      source: "Seventh Source",
      publishedAt: "2024-06-07T09:00:00Z",
      description: "Information about the seventh news article.",
      urlToImage: placeholder,
    },
      {
        id: 12,     
      title: "Eighth News Title",

      source: "Eighth Source",
      publishedAt: "2024-06-08T13:45:00Z",
      description: "Details about the eighth news article.",
      urlToImage: placeholder,
    },
  ];

  return (
   <div className="p-30 grid grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
      {item.map((data) => {

        const formattedDate = new Date(data.publishedAt).toLocaleDateString(
          "en-US",
          {
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        );

        return (
          <div
            key={data.id}
            onClick={() =>
              navigate(`/article/${data.id}`, { state: data })
            }
           className="w-2/2  flex justify-between cursor-pointer rounded-xl shadow-md hover:shadow-lg transition-shadow p-3 bg-blue-50 overflow-hidden"
    > 
            <div className="w-1/3">
            <img
              src={data.urlToImage || placeholder}
              alt={data.title}
              className="w-full h-40 object-cover"
            />
             </div>

            <div className="w-1/2 mt-3">
       <div className="">
              <h2 className="text-lg font-semibold line-clamp-2 mb-2">
                {data.title}
              </h2>
               </div>

              <div className="  text-sm text-gray-500">
          <span>Source: {data.source}</span><br />
          <span>{data.publishedAt}</span>
        </div>
     </div>
          </div>
        );
      })}
    </div>
  );
}