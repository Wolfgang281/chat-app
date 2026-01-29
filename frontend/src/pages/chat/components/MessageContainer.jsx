import moment from "moment/moment";
import { useEffect, useRef } from "react";
import { MESSAGE_ROUTES } from "../../../../utils/constants";
import apiClient from "../../../lib/axios";
import { useAppStore } from "../../../store";

const MessageContainer = () => {
  const scrollRef = useRef(null);
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    selectedChatMessages,
    setSelectedChatMessages,
  } = useAppStore();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(MESSAGE_ROUTES.GET_MESSAGES, {
          id: selectedChatData._id,
        });

        if (response.data.messages) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
    }
  }, [selectedChatType, selectedChatData, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;
    return (
      <>
        {selectedChatMessages.map((message) => {
          const messageDate = moment(message.createdAt).format("DD-MM-YYYY");

          const showDate = messageDate !== lastDate;
          lastDate = messageDate;

          return (
            <div key={message._id}>
              {showDate && (
                <div className="text-center text-gray-500 my-2">
                  {moment(message.createdAt).format("LL")}
                </div>
              )}
              {selectedChatType === "contact" && renderDmMessage(message)}
            </div>
          );
        })}
        {/* 👇 THIS IS IMPORTANT */}
        <div ref={scrollRef} />
      </>
    );
  };

  const renderDmMessage = (message) => (
    <div
      className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"} mb-4`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] wrap-break-word`}
        >
          {message.content}
        </div>
      )}
      <div className="text-xs text-gray-600">
        {moment(message.createdAt).format("LT")}
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] ls:w-[70vw] xl:w-[80vw]">
      {renderMessages()}
    </div>
  );
};

export default MessageContainer;
