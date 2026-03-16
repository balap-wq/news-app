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
        urlToImage: "https://picsum.photos/200/300?grayscale",
      },
        {
        title: "Another News Title",
        source: "Another Source",
        publishedAt: "2024-06-02T15:30:00Z",
        urlToImage: "https://picsum.photos/200/300?grayscale",
        } ,
        {
        title: "Third News Title",
        source: "Third Source",
        publishedAt: "2024-06-03T10:45:00Z",
        urlToImage: "https://picsum.photos/200/300?grayscale",   
        }   ,
        {
        title: "Fourth News Title",     
        source: "Fourth Source",
        publishedAt: "2024-06-04T08:20:00Z",
        urlToImage: "https://picsum.photos/200/300?grayscale",
        } , 
        {
        title: "Sample News Title",
        source: "Sample Source",
        publishedAt: "2024-06-01T12:00:00Z",
        urlToImage: "https://picsum.photos/200/300?grayscale",
      },
        {
        title: "Another News Title",
        source: "Another Source",
        publishedAt: "2024-06-02T15:30:00Z",
        urlToImage: "https://picsum.photos/200/300?grayscale",
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
    <div className="p-30 grid grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto">
        {item.map((data,index)=>(

   
    <div key={index}
    // onClick={onClick}
      className="w-2/2  flex justify-between cursor-pointer rounded-xl shadow-md hover:shadow-lg transition-shadow p-3 bg-amber-200 overflow-hidden"
    > 
    
    <div className="w-1/3">
       <img
        src={data.urlToImage || placeholder}
        alt={ data.title}
        className="w-full h-40 "
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
    ))}
    </div>
    

  );
}

