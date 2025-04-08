import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

interface Trip {
  place: string;
  year: number;
}

interface List {
  list: Trip[];
}

export default function LoadingSkeletonTrip({ list }: List) {
  return (
    <Stack spacing={3} className="flex items-center justify-center">
      {list.map(() => {
        return <Skeleton variant="rectangular" width={500} height={128} />;
      })}
    </Stack>
  );
}
