import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="w-[1400px] flex flex-col justify-between items-center gap-6 m-auto">
      <Skeleton className="w-full h-[50px]" />
      <div className="w-full h-[450px] flex gap-5 m-auto justify-center">
        <Skeleton className="w-[350px]  cursor-pointer rounded-lg" />
        <Skeleton className="w-[650px]" />
      </div>
      <div className="w-full px-20">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
      <Skeleton className="w-full h-[50px]" />
      <div className="flex gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="w-[230px] h-[380px] rounded-2 overflow-hidden object-contain bg-secondary my-5"
          />
        ))}
      </div>
    </div>
  );
}
