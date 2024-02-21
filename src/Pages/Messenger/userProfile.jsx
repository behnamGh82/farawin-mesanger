export default function UserProfile(props) {
  const { key, title } = props;
  return (
    <div
      key={key}
      className="flex gap-3 place-items-center px-4 h-20 border-b-2 border-gray-400"
    >
      <div className="h-16 w-16 rounded-full bg-green-500"></div>
      <h3 className="grow">{title}</h3>
    </div>
  );
}
