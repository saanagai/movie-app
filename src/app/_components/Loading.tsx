import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export const Loading = () => {
  return (
    <div>
      <header>Header</header>
      {/* <Skeleton /> */}
      <div>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, i) => {
          return <Skeleton key={i} className="w-[230px]" />;
        })}
      </div>
    </div>
  );
};
