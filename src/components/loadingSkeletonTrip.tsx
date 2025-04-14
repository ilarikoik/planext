import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function LoadingSkeletonTrip() {
  return (
    <Stack spacing={3} className="flex items-center justify-center w-full ">
      {Array.from({ length: 10 }).map((item, index) => {
        return (
          <div
            key={index}
            className=" w-5/6 max-w-[700px] min-w-[250px] h-32 flex items-center justify-center"
          >
            <Skeleton
              variant="rectangular"
              animation="pulse"
              width="100%"
              sx={{ maxWidth: 500, borderRadius: 3 }}
              height={128}
            ></Skeleton>
          </div>
        );
      })}
    </Stack>
  );
}
