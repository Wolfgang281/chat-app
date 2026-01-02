import { useAppStore } from "../../store";

const Profile = () => {
  const { userInfo } = useAppStore();
  console.log(userInfo);
  return <div>{userInfo?._id}</div>;
};

export default Profile;
