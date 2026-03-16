import React, { useEffect, useState } from "react";
import HeadlineCardSkeleton from "../Components/HeadlineCardSkeleton";
import HeadlineCard from "../Components/headlinecards";

export default function HeadlinesPage() {

  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    // fake API delay simulation
    setTimeout(() => {

      const data = [
        { id: 1, title: "Breaking News 1", source: "BBC", date: "Jun 10" },
        { id: 2, title: "Breaking News 2", source: "CNN", date: "Jun 10" },
        { id: 3, title: "Breaking News 3", source: "Reuters", date: "Jun 10" },
        { id: 4, title: "Breaking News 4", source: "BBC", date: "Jun 10" },
        { id: 5, title: "Breaking News 5", source: "CNN", date: "Jun 10" },
        { id: 6, title: "Breaking News 6", source: "Reuters", date: "Jun 10" },
        { id: 7, title: "Breaking News 7", source: "BBC", date: "Jun 10" },
        { id: 8, title: "Breaking News 8", source: "CNN", date: "Jun 10" },
        { id: 9, title: "Breaking News 9", source: "Reuters", date: "Jun 10" }
      ];

      setHeadlines(data);
      setLoading(false);

    }, 2000);

  }, []);

  return (

    <div className="max-w-7xl mx-auto p-6">

      <h1 className="text-2xl font-bold mb-6">
        Latest Headlines
      </h1>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {loading
        ? Array.from({ length: 9 }).map((_, index) => (
            <HeadlineCardSkeleton key={index} />
          ))
        : headlines.map((headline) => (
            <HeadlineCard key={headline.id} data={headline} />
          ))}
      </div>

    </div>
  );
}