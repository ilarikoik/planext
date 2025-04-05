//
//

// interface prop {
//   user: boolean;
//   handleUser: () => void;
// }
// { user, handleUser }: prop

export default function Profile() {
  return (
    <div className="bg-background h-screen w-screen">
      <button  className=" hover:underline">
        vaihda user boolean arvoa tästä
      </button>
      <div className="bg-red-200 h-4/5 w-full justify-center items-center flex">
        <div className="h-2/3 w-4/5 max-w-[1000px] bg-green-500">
          <div className="bg-neutral-500 h-1/3 w-full flex justify-center items-center">
            <h1 className="text-4xl font-bold">Profiili</h1>
          </div>
          <div className="bg-blue-500 h-2/3 w-full flex-col flex justify-center items-center">
            <div className="h-16 w-full bg-background m-3"> Kaverit</div>
            <div className="h-16 w-full bg-background m-3"> Matkat</div>
            <div className="h-16 w-full bg-background m-3"> Jotain</div>
          </div>
        </div>
      </div>
    </div>
  );
}
