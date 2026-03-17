import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Articledetailpage from "./Articledetailpage";
import EmptyState from "./Emptystate";
import Errormessage from "./Errormessage";
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
      urlToImage: "https://wallpapercave.com/wp/wp8319044.jpg",
    },
    {
      id: 2,
      title: "Another News Title",
      source: "Another Source",
      publishedAt: "2024-06-02T15:30:00Z",
      // description: "Details about the second news article.",
      urlToImage: placeholder,
    },
    {
      id: 3,
      // title: "Third News Title",
      source: "Third Source",
      publishedAt: "2024-06-03T10:45:00Z",
      // description: "More information about the third article.",
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
  <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        onClick={() => navigate(`/article/${data.id}`, { state: data })}
        className="cursor-pointer bg-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
      >
        
        {/* Image */}
        <img
          src={data.urlToImage || placeholder}
          alt={data.title}
          className="w-full h-48 sm:h-44 md:h-48 object-cover"
        />

        {/* Content */}
        <div className="p-4 flex flex-col justify-between flex-grow">
          
          <h2 className="text-base sm:text-lg font-semibold line-clamp-2 leading-snug">
            {data.title}
          </h2>

          <div className="mt-3 text-sm text-gray-500">
            <p className="truncate">Source: {data.source}</p>
            <p>{formattedDate}</p>
          </div>

        </div>

      </div>
    );
  })}
</div>
  );
}