import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

const MessageBar = () => {
  const emojiRef = useRef();

  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (emojiRef.current && !emojiRef.current.contains(e.target)) {
        setEmojiPickerOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () =>
      document.removeEventListener("pointerdown", handleClickOutside);
  }, [emojiRef]);

  const handleSendMessage = async () => {};

  const handleAddEmoji = (emoji) => {
    console.log("emoji: ", emoji);

    setMessage((msg) => msg + emoji.emoji);
  };

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline"
          placeholder="Enter Message...."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="text-neutral-400 focus:outline-none transition-all duration-200 ease-out hover:text-white hover:scale-105 hover:shadow-[0_0_10px_rgba(79,70,229,0.45)] active:scale-95 active:rotate-3 active:text-indigo-400 active:shadow-[0_0_12px_rgba(79,70,229,0.6)]">
          <GrAttachment className="text-2xl" />
        </button>
        <div className="relative">
          <button
            className=" text-neutral-400 focus:outline-none transition-all duration-200 ease-out hover:text-white hover:scale-105 hover:shadow-[0_0_10px_rgba(79,70,229,0.45)] active:scale-95 active:rotate-3 active:text-indigo-400 active:shadow-[0_0_12px_rgba(79,70,229,0.6)]"
            onClick={() => setEmojiPickerOpen((prev) => !prev)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        className="text-neutral-400 focus:outline-none transition-colors duration-200 ease-out hover:text-white hover:scale-105 hover:shadow-[0_0_10px_rgba(79,70,229,0.45)] active:scale-95 active:rotate-2 active:text-indigo-400 active:shadow-[0_0_12px_rgba(79,70,229,0.6)]"
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
