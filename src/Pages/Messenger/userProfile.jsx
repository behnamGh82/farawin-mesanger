import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function UserProfile(props) {
  // گرفتن دو مقدار کلید:شماره کاربر و عنوان: نام کاربر
  const {
    data,
    selectedUser,
    setSelectedUser,
    setChange,
    index,
    editButton,
    title,
    setOpenEditUserDialog,
  } = props;
  // انتخاب کابر   هنوز تکمیلش نکردم
  const handleSelect = () => {
    setSelectedUser({ contactDate: data, state: true });
    setChange(true);
  };
  return (
    <div
      key={index}
      className={
        "flex gap-3 place-items-center h-20 border-b-2 border-gray-400 relative"
      }
      onClick={handleSelect}
    >
      <div className="flex place-items-center h-16 w-16 mr-4 rounded-full bg-[#3d4785]">
        {/* نمایش حرف اول اسم کاربر بجای عکس */}
        <h1 className="m-auto text-xl text-white">{title.charAt(0)}</h1>
      </div>
      <h3 className="grow">{title}</h3>
      <button
        className="ml-5  z-10"
        onClick={(e) => {
          setOpenEditUserDialog(true);
        }}
      >
        <FontAwesomeIcon icon={editButton} />
      </button>
      {selectedUser.contactDate.username === index ? (
        <div className="bg-[#00000011] absolute w-full h-full "></div>
      ) : null}
    </div>
  );
}
