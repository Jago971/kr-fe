import { FaRegUser } from "react-icons/fa";
import { KindRemindResponse } from "../types/KindRemindResponse";
import { FiAtSign } from "react-icons/fi";
import { AiOutlineNumber } from "react-icons/ai";

type User = KindRemindResponse["data"]["payload"]["user"];

interface ProfileInfoProps {
  itemKey: keyof User;
  userData: User;
}

const iconStyle = "h-2/3 w-2/3 text-white";

const icons: { [key in keyof User]?: React.ReactNode } = {
    userId: <AiOutlineNumber className={iconStyle} />,
  email: <FiAtSign className={iconStyle} />,
  username: <FaRegUser className={iconStyle} />,
};

const ProfileItem = ({ itemKey, userData }: ProfileInfoProps) => {
  return (
    <div className="w-full flex items-center gap-4">
      <div className="rounded-xl p-2 w-14 flex justify-center items-center border bg-blue-400 border-b-3 border-neutral-800 text-neutral-800">
        {icons[itemKey]}
      </div>

      <div>
        <p className="text-md text-neutral-500">{itemKey}</p>
        <p className="text-lg">{userData[itemKey]}</p>
      </div>
    </div>
  );
};

export default ProfileItem;
