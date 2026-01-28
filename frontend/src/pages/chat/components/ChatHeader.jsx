import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { getColor } from "../../../lib/utils";
import { useAppStore } from "../../../store";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  return (
    <div className="h-[10vh] border-b-2 border-[#2f03cb] flex items-center  px-20">
      <div className="flex gap-5 items-center w-full">
        <div className="flex gap-9 items-center w-full">
          <div className="w-12 h-12 relative">
            <Avatar className="h-5 w-5 md:w-15 md:h-12 rounded-full overflow-hidden">
              {selectedChatData.image ? (
                <AvatarImage
                  src={selectedChatData.image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.selectedColor,
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.email.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>
          <div>
            {selectedChatType === "contact" &&
              " " +
                selectedChatData.firstName +
                " " +
                selectedChatData.lastName}
          </div>
        </div>

        <div className="flex items-center justify-center gap-5">
          <button
            className="
              text-neutral-500
              focus:outline-none
              transition-all duration-200 ease-in-out
              hover:text-white
              active:scale-90
              active:rotate-6
              active:text-red-400
              active:shadow-[0_0_12px_rgba(255,0,0,0.6)]
            "
            onClick={closeChat}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
