import React from "react";
import { useLocation } from "react-router-dom";

const Articledetailpage = () => {

  const location = useLocation();
  const article = location.state;

  if (!article) {
    return <h2 className="text-center mt-10">Article not found</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto p-10">

     

      <h1 className="text-3xl font-bold mt-4">
        {article.title}
      </h1>

     

      <p className="mt-6 text-lg">
        {article.description}
      </p>

    </div>
  );
};

export default Articledetailpage;