export default function Messenger() {
  return (
    <div className="h-full w-full flex ">
      <div className="h-full w-full md:w-[45%] lg:w-[35%] p-10">
        <div className="h-full w-full bg-white rounded-3xl shadow-lg overflow-hidden ">
          <div className="h-20 bg-red-500"></div>
          <div className=" h-full bg-blue-400 overflow-y-scroll"></div>
        </div>
      </div>
      <div className="h-full w-0 md:w-[55%] lg:w-[65%] bg-blue-500 flex-grow"></div>
    </div>
  );
}
