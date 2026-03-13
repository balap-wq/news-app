import React from "react";

export default function Headlinecards({
  title,
  source,
  publishedAt,
  urlToImage,
  onClick,
})
 {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const placeholder =
    "https://via.placeholder.com/400x200?text=No+Image";
    
    const item=[
      {
        title: "Sample News Title",
        source: "Sample Source",
        publishedAt: "2024-06-01T12:00:00Z",
        urlToImage: null,
      },
        {
        title: "Another News Title",
        source: "Another Source",
        publishedAt: "2024-06-02T15:30:00Z",
        urlToImage: null,
        } ,
        {
        title: "Third News Title",
        source: "Third Source",
        publishedAt: "2024-06-03T10:45:00Z",
        urlToImage: null,   
        }   ,
        {
        title: "Fourth News Title",     
        source: "Fourth Source",
        publishedAt: "2024-06-04T08:20:00Z",
        urlToImage: null,
        } , 
        {
        title: "Sample News Title",
        source: "Sample Source",
        publishedAt: "2024-06-01T12:00:00Z",
        urlToImage: null,
      },
        {
        title: "Another News Title",
        source: "Another Source",
        publishedAt: "2024-06-02T15:30:00Z",
        urlToImage: null,
        } ,
        {
        title: "Third News Title",
        source: "Third Source",
        publishedAt: "2024-06-03T10:45:00Z",
        urlToImage: null,   
        }   ,
        {
        title: "Fourth News Title",     
        source: "Fourth Source",
        publishedAt: "2024-06-04T08:20:00Z",
        urlToImage: null,
        }  ,
          {
        title: "Fourth News Title",     
        source: "Fourth Source",
        publishedAt: "2024-06-04T08:20:00Z",
        urlToImage: null,}


    ];

  return (
    <div className=" p-10 grid grid-cols-3 gap-10">
        {item.map((data,index)=>(

   
    <div key={index}
    // onClick={onClick}
      className=" cursor-pointer rounded-xl shadow-md hover:shadow-lg transition-shadow bg-amber-200 overflow-hidden"
    >
      <img
        src={data.urlToImage || placeholder}
        alt={ data.title}
        className="w-full h-40 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-2 mb-2">
          {data.title}
        </h2>

        <div className="text-sm text-gray-500 flex justify-between">
          <span>{data.source}</span>
          <span>{data.publishedAt}</span>
        </div>
      </div>
    </div>
    ))}
    </div>
    

  );
}

