interface trip {
  place: string;
  year: number;
}

interface triplist {
  list: trip[];
}

export default function TripList({ list }: triplist) {
  return (
    <>
      <div className=" w-full h-fit flex flex-col justify-center items-center p-3">
        {list.map((item, index) => {
          return (
            <>
              <div
                key={index}
                className="h-32 w-full max-w-[700px] flex-row justify-center items-center m-5"
              >
                <div className="flex flex-col justify-center items-center">
                <h2 className="font-semibold text-3xl text-accent">
                  {item.place}
                </h2>
                <hr className="border-2 border-accent w-4/5" />
                <h2 className="font-semibold text-3xl text-accent">
                  {item.year}
                </h2>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
