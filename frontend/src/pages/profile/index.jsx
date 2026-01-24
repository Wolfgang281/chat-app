import { useEffect, useRef, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AUTH_ROUTES } from "../../../utils/constants";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import apiClient from "../../lib/axios";
import { colors, getColor } from "../../lib/utils";
import { useAppStore } from "../../store";

const Profile = () => {
  const navigate = useNavigate();

  const { userInfo, setUserInfo } = useAppStore();
  console.log("userInfo: ", userInfo);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!userInfo) return;

    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName ?? "");
      setLastName(userInfo.lastName ?? "");
      setSelectedColor(userInfo.color ?? 0);
    }
    if (userInfo["profile-image"]) setImage(userInfo["profile-image"]);
  }, [userInfo]);

  const saveChanges = async () => {
    try {
      const response = await apiClient.patch(AUTH_ROUTES.UPDATE_PROFILE, {
        firstName,
        lastName,
        // image,
        color: selectedColor,
      });

      toast.success(response?.data?.message);
      if (response?.data?.success) {
        setUserInfo(response?.data?.user);
        navigate("/chat");
      }
    } catch (error) {
      setUserInfo(null);
      toast.error(error.response?.data?.message);
    }
  };

  const handleNavigate = () => {
    if (userInfo?.profileSetup) navigate("/chat");
    else toast.error("Please complete your profile setup");
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    console.log(file);

    // ✅ instant preview
    const previewURL = URL.createObjectURL(file);
    setImage(previewURL);

    const formData = new FormData();
    formData.append("profile-image", file);
    try {
      setImageLoading(true);
      const response = await apiClient.patch(AUTH_ROUTES.ADD_IMAGE, formData);
      console.log(response);
      setUserInfo({
        ...userInfo,
        "profile-image": response.data.user["profile-image"],
      });
      toast.success(response.data.message);
      // add
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setImageLoading(false);
    }
  };

  const handleDeleteImage = async () => {
    try {
      setImageLoading(true);
      const response = await apiClient.patch(AUTH_ROUTES.DELETE_IMAGE);
      console.log(response);
      toast.success(response.data.message);
      setUserInfo({
        ...userInfo,
        "profile-image": null,
      });
      setImage(null);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setImageLoading(false);
    }
  };

  return (
    <div className="bg-[#1b1c24] h-screen flex items-center justify-center flex-col gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div onClick={handleNavigate}>
          <IoArrowBack className="text-4xl lg:text-6xl text-white/90 cursor-pointer" />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center"
            onMouseEnter={() => {
              setHovered(true);
            }}
            onMouseLeave={() => {
              setHovered(false);
            }}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border flex items-center justify-center rounded-full ${getColor(
                    selectedColor,
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full"
                onClick={
                  imageLoading
                    ? undefined
                    : image
                      ? handleDeleteImage
                      : handleFileInputClick
                }
              >
                {imageLoading ? (
                  <div className="h-8 w-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}

                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleImageChange}
                  name="profile-image"
                  accept=".png, .jpg, .jpeg, .svg, .webp"
                  disabled={imageLoading}
                />
              </div>
            )}
          </div>
          <div className="flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo?.email ?? ""}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className="w-full flex gap-5">
              {colors.map((color, index) => (
                <div
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all ${
                    selectedColor === index ? "outline-white/50 outline-3" : ""
                  } duration-300`}
                  key={index}
                  onClick={() => {
                    setSelectedColor(index);
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full">
          <Button
            disabled={imageLoading}
            className="h-16 w-full bg-purple-700 hover:bg-purple-900 disabled:opacity-50"
            onClick={saveChanges}
          >
            {imageLoading ? "Please wait..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
