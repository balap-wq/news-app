import React from "react";

export default function HeadlineCard({
  title,
  source,
  publishedAt,
  urlToImage,
  onClick,
}) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const placeholder =
    "https://via.placeholder.com/400x200?text=No+Image";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white overflow-hidden"
    >
      <img
        src={urlToImage || placeholder}
        alt={title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-2 mb-2">
          {title}
        </h2>

        <div className="text-sm text-gray-500 flex justify-between">
          <span>{source}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </div>
  );
}