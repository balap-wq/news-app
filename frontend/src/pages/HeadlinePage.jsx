import React from "react";
import useHeadlines from "../hooks/useHeadlines";
import Headlinecards from "../Components/Headlinecards";

const HeadlinePage = () => {
  const { data, loading, error } = useHeadlines({ page: 1 });

  return (
    <div>
      <div className="text-center mt-7">
        <h1 className="text-3xl font-bold">Top Headlines</h1>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="p-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.map((article, index) => (
          <Headlinecards
            key={index}
            title={article.title}
            source={article.sourceName}
            publishedAt={article.publishedAt}
            urlToImage={article.urlToImage}
          />
        ))}
      </div>
    </div>
  );
};

export default HeadlinePage;