import { useState } from "react";

export default function UserProfile(props) {
  const { key, title } = props;
  const [selected, setSelected] = useState("");
  const handleSelect = () => {
    setSelected(key);
  };
  return (
    <div
      key={key}
      className="flex gap-3 place-items-center px-4 h-20 border-b-2 border-gray-400"
      onClick={handleSelect}
    >
      <div className="flex place-items-center h-16 w-16 rounded-full bg-[#3d4785]">
        <h1 className="m-auto text-xl text-white">{title.charAt(0)}</h1>
      </div>
      <h3 className="grow">{title}</h3>
    </div>
  );
}
