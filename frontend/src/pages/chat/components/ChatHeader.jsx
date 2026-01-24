import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  return (
    <div className="h-[10vh] border-b-2 border-[#2f03cb] flex items-center justify-between px-20">
      <div className="flex gap-5 items-center">
        <div className="flex gap-3 items-center justify-center"></div>

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
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
