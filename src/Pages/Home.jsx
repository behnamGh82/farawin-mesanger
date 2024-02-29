import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSignIn } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className=" flex flex-col gap-12 place-items-center items-center text-center w-3/4 md:w-2/5 lg:w-2/6 m-auto">
      {/* دکمه برای انقال به صفحه ورود */}
      <Link to={"/login"} className="w-full">
        <div className=" bg-[#ccc] h-20 w-3/4 rounded-full px-6 py-3 text-[#000000] shadow-md relative  text-center text-3xl pt-4 m-auto">
          <div className="bg-[#ff4a09] border-8 border-[#ccc]  w-24 h-24 rounded-full absolute -right-8 -top-2 text-white pt-5 shadow-lg ">
            <FontAwesomeIcon icon={faSignIn} />
          </div>
          <h1>ورود</h1>
        </div>
      </Link>
      {/* دکمه برای انتقال به صفحه ثبت نام */}
      <Link to={"/register"} className="w-full">
        <div className=" bg-[#ccc] h-20 w-3/4 rounded-full px-6 py-3 text-[#000000] shadow-md relative  text-center text-3xl pt-4 m-auto">
          <div className="bg-[#ff4a09] border-8 border-[#ccc]  w-24 h-24 rounded-full absolute -right-8 -top-2 text-white pt-5 shadow-lg ">
            <FontAwesomeIcon icon={faEdit} />
          </div>
          <h1>ثبت نام</h1>
        </div>
      </Link>
    </div>
  );
}
