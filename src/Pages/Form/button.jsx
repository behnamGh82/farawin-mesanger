export default function Button(props) {
  //title:strinng disable:boolean onclick:void
  const { title, disable, onclick } = props;
  return (
    <button
      onClick={onclick}
      disabled={disable}
      className="w-2/3 h-16  bg-[#ff4a09] text-white rounded-full disabled:bg-[#ccc]"
    >
      {title}
    </button>
  );
}
