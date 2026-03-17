import React from "react";
import { useNavigate } from "react-router-dom";
import Articledetailpage from "./Articledetailpage";
import EmptyState from "./Emptystate";
import Errormessage from "./Errormessage";


export default function Headlinecards({ title, source, publishedAt, urlToImage,article}) {

  const navigate = useNavigate();

  const { data, loading, error } = useHeadlines({
    page: 1,
    category: "general",
    country: "us"
  });

  const placeholder = "https://picsum.photos/seed/picsum/200/300";

  

  return (
  <div className=" mx-auto">

      <div
        key={article.id}
        onClick={() => navigate(`/article/${article.id}`, { state: article })}
        className="cursor-pointer bg-blue-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
      >
        
        {/* Image */}
        <img
          src={urlToImage || placeholder}
          alt={title}
          className="w-full h-48 sm:h-44 md:h-48 object-cover"
        />

        {/* Content */}
        <div className="p-4 flex flex-col justify-between">
          
          <h2 className="text-base sm:text-lg font-semibold line-clamp-2 leading-snug">
            {title}
          </h2>

          <div className="mt-3 text-sm text-gray-500">
            <p className="truncate">Source: {source}</p>
            <p>{publishedAt}</p>
          </div>

        </div>

      </div>
  
</div>
  );
}