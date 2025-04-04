//
//

interface prop {
  user: boolean;
  handleUser: () => void;
}

export default function Index({ user, handleUser }: prop) {
  return (
    <div className="bg-background h-screen w-screen">
      <button onClick={() => handleUser()} className=" hover:underline">
        ETUSIVU {user.toString()}
      </button>
    </div>
  );
}
