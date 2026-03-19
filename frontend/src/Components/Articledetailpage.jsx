import React from "react";
import { useLocation } from "react-router-dom";
import EmptyState from "./Emptystate";
import Errormessage from "./Errormessage";

const Articledetailpage = () => {

  const location = useLocation();
  const article = location.state;
  const error = location.state?.error;
  

    //  Handle no article (refresh / direct URL access)
  if (!article) {
    return <EmptyState />;
  }

  //  Handle missing data
  if (!article.title || !article.description) {
    return <EmptyState />;
  }

  return (
   <div className="min-h-screen flex items-center justify-center bg-amber-50 px-4">
  <div className="w-full max-w-3xl bg-amber-100 rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
    
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center leading-tight">
      {article.title}
    </h1>

    <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 leading-relaxed text-justify">
      {article.description}
    </p>

  </div>
</div>
  );
};

export default Articledetailpage;