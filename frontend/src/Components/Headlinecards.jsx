import React from "react";
import { useNavigate } from "react-router-dom";
import useHeadlines from "../hooks/useHeadlines";
import HeadlineCardSkeleton from "./HeadlineCardSkeleton";

export default function Headlinecards() {

  const navigate = useNavigate();

  const { data, loading, error } = useHeadlines({
    page: 1,
    category: "general",
    country: "us"
  });

  const placeholder = "https://picsum.photos/seed/picsum/200/300";

  if (error) {
    return (
      <h2 className="text-center mt-10 text-red-500">
        Error loading headlines
      </h2>
    );
  }

  return (
    <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">

      {/*Skeleton */}
      {loading
        ? Array.from({ length: 9 }).map((_, index) => (
            <HeadlineCardSkeleton key={index} />
          ))

        : data.map((article, index) => {

            const formattedDate = new Date(
              article.publishedAt
            ).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <div
                key={article.url || index}
                onClick={() =>
                  navigate(`/article/${index}`, { state: article })
                }
                className="flex justify-between cursor-pointer rounded-xl shadow-md hover:shadow-lg transition-shadow p-3 bg-blue-50 overflow-hidden"
              >

                {/* Image */}
                <div className="w-1/3">
                  <img
                    src={article.urlToImage || placeholder}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                </div>

                {/* Content */}
                <div className="w-1/2 mt-3">

                  <h2 className="text-lg font-semibold line-clamp-2 mb-2">
                    {article.title}
                  </h2>

                  <div className="text-sm text-gray-500">
                    <span>
                      Source: {article.source?.name || "Unknown"}
                    </span>
                    <br />
                    <span>{formattedDate}</span>
                  </div>

                </div>

              </div>
            );
          })}
    </div>
  );
}