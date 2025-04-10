import { useEffect, useState } from "react";
import { fetchProfileData } from "../services/profile";
import { useNavigate } from "react-router-dom";
import ProfileItem from "../components/profile.info";
import Button from "../components/profile.button";
import { KindRemindResponse } from "../types/KindRemindResponse";

const Profile: React.FunctionComponent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<KindRemindResponse | null>(null);
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const response = await fetchProfileData();
        if (response) {
          setData(response);
        }
      } catch (error) {
        console.error(error);
        navigate("/kind-remind/login");
      }
    };

    loadProfileData();
  }, []);

  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    action: string
  ) => {
    e.preventDefault();
    setClickedButton(action);
    setTimeout(() => {
      setClickedButton(null);
    }, 100);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className="border rounded-full aspect-square w-1/3 border-b-3 border-neutral-800 text-neutral-800 bg-white"
        style={{
          backgroundImage: `url(${data?.data.payload.user.profile_pic})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="bg-white p-4 gap-2 flex flex-col w-full rounded-xl shadow-sm shadow-neutral-300">
        {data && (
          <>
            <ProfileItem itemKey={"userId"} userData={data.data.payload.user} />
            <ProfileItem
              itemKey={"username"}
              userData={data.data.payload.user}
            />
            <ProfileItem itemKey={"email"} userData={data.data.payload.user} />
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 w-full">
      <Button
      type="email"
          text="Change email"
          handleClick={handleClick}
          clickedButton={clickedButton}
          style="bg-yellow-200"
        />
        <Button
        type="password"
          text="Change password"
          handleClick={handleClick}
          clickedButton={clickedButton}
          style="bg-yellow-200"
        />
        <Button
        type="logout"
          text="Logout"
          handleClick={handleClick}
          clickedButton={clickedButton}
          style="bg-red-300"
        />
        <Button
        type="delete"
          text="Delete account"
          handleClick={handleClick}
          clickedButton={clickedButton}
          style="border-red-400 border-3 text-red-400 shadow-none"
        />
      </div>
    </div>
  );
};

export default Profile;
