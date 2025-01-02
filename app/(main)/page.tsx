import MasonryGrid from "@/components/home/masonry-grid";
import React from "react";

const HomePage = () => {
  return (
    <div className="h-full overflow-auto bg-red-100">
      <div className="h-20 flex items-center justify-center bg-green-100 select-none">
        <h1 className="text-3xl font-bold">Recent posters</h1>
      </div>

      <div>
        <MasonryGrid />
      </div>
    </div>
  );
};

export default HomePage;
