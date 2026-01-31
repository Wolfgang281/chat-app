import { RiCloseFill } from "react-icons/ri";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { getColor } from "../../../lib/utils";
import { useAppStore } from "../../../store";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();

  if (!selectedChatData) return null;

  return (
    <div className="h-[10vh] border-b-2 border-[#2f03cb] flex items-center px-6 md:px-20">
      <div className="flex items-center justify-between w-full">
        {/* LEFT: Avatar + Name */}
        <div className="flex items-center gap-4">
          {/* Avatar with Status Dot */}
          <div className="relative">
            <Avatar className="h-10 w-10 md:h-14 md:w-14 rounded-full overflow-hidden">
              {selectedChatData.profileImage ? (
                <AvatarImage
                  src={selectedChatData.profileImage}
                  alt="profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div
                  className={`h-full w-full uppercase text-lg md:text-xl flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.selectedColor,
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName[0]
                    : selectedChatData.email[0]}
                </div>
              )}
            </Avatar>

            {/* Online Status Dot */}
            {selectedChatData.isOnline && (
              <span className="absolute bottom-0 right-0 h-3 w-3 md:h-4 md:w-4 rounded-full border-2 border-[#0f0f14] bg-green-500" />
            )}
          </div>

          {/* Name */}
          <span className="text-white font-medium text-base md:text-lg">
            {selectedChatType === "contact" &&
              `${selectedChatData.firstName} ${selectedChatData.lastName}`}
          </span>
        </div>

        {/* RIGHT: Close Button */}
        <button
          onClick={closeChat}
          className="
            text-neutral-500
            transition-all duration-200
            hover:text-white
            active:scale-90
            active:text-red-400
          "
        >
          <RiCloseFill className="text-3xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
