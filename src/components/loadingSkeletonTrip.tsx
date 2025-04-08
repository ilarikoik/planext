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
    <Stack spacing={3} className="flex items-center justify-center w-full ">
      {list.map(() => {
        return (
          <div className=" w-5/6 max-w-[700px] min-w-[250px] h-32 flex items-center justify-center">
            <Skeleton
              variant="rectangular"
              animation="pulse"
              width="100%"
              sx={{ maxWidth: 500 }}
              height={128}
            />
          </div>
        );
      })}
    </Stack>
  );
}
