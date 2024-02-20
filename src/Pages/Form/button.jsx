export default function Button(props) {
  const { title, disabale, onclick } = props;
  return (
    <button
      onClick={onclick}
      disabled={disabale}
      className="w-2/3 h-16  bg-[#3d4785] text-white rounded-full disabled:bg-slate-400"
    >
      {title}
    </button>
  );
}
