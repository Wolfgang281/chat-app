import { FaEdit } from "react-icons/fa";
import { IoPowerSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AUTH_ROUTES } from "../../../../utils/constants";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import apiClient from "../../../lib/axios";
import { getColor } from "../../../lib/utils";
import { useAppStore } from "../../../store";

const ProfileInfo = () => {
  const { userInfo, setUserInfo } = useAppStore();

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await apiClient.post(AUTH_ROUTES.LOGOUT);
      if (response.status == 200) {
        setUserInfo(null);
        navigate("/auth");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center">
        <div className="w-12 h-12 relative ">
          <Avatar className="h-12 w-12  rounded-full overflow-hidden">
            {userInfo["profile-image"] ? (
              <AvatarImage
                src={userInfo["profile-image"]}
                alt="profile"
                className="object-cover w-full h-full bg-black"
              />
            ) : (
              <div
                className={`uppercase h-32 w-32 md:w-48 md:h-48 text-lg border flex items-center justify-center rounded-full ${getColor(
                  userInfo.color,
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div>
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName} ${userInfo.lastName}`
            : userInfo.email}
        </div>
      </div>
      <div className="flex gap-5">
        <Tooltip>
          <TooltipTrigger>
            <FaEdit
              className="text-purple-300 text-xl font-medium"
              onClick={() => navigate("/profile")}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none text-white">
            <p>Edit Profile</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger>
            <IoPowerSharp
              className="text-red-400 text-xl font-medium"
              onClick={logout}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none text-white">
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default ProfileInfo;
