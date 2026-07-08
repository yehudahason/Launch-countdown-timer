export default function EndScreen() {
  const baseUrl = import.meta.env.BASE_URL;
  return (
    <>
      <h1 className="absolute top-[20%] z-7001 sm:text-5xl text-3xl space-x-4 font-bold text-yellow-400 gradient-text">
        {" "}
        We've launched!
      </h1>
      <img
        src={`${baseUrl}BigBang.gif`}
        alt=""
        className="fixed top-0 left-0 h-screen   w-full z-7000"
      />
    </>
  );
}
