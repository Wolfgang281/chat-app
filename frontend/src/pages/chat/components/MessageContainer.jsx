import moment from "moment/moment";
import { useEffect, useRef, useState } from "react";
import { IoArrowDownCircleOutline } from "react-icons/io5";
import { MdFolderZip } from "react-icons/md";
import { MESSAGE_ROUTES } from "../../../../utils/constants";
import apiClient from "../../../lib/axios";
import { useAppStore } from "../../../store";

const MessageContainer = () => {
  const containerRef = useRef(null); // ✅ REAL SCROLL CONTAINER

  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
    setSelectedChatMessages,
  } = useAppStore();

  const [showImage, setShowImage] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  // 🔥 FETCH MESSAGES
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

    if (selectedChatData?._id && selectedChatType === "contact") {
      getMessages();
    }
  }, [selectedChatType, selectedChatData, setSelectedChatMessages]);

  // 🔥 ALWAYS SCROLL TO BOTTOM (WORKS WITH IMAGES)
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [selectedChatMessages]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setShowImage(false);
        setImageURL(null);
      }
    };

    if (showImage) {
      window.addEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [showImage]);

  const checkIfImage = (file) => {
    return /\.(jpg|jpeg|png|gif|svg|webp|bmp|ico|tiff|raw|heic)$/i.test(file);
  };

  const downloadFile = (fileURL) => {
    window.open(fileURL, "_blank");
  };

  const forceDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();

      const blobURL = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      a.href = blobURL;
      a.download = url.split("/").pop(); // filename
      document.body.appendChild(a);
      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobURL);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  const renderDmMessage = (message) => (
    <div
      className={`${
        message.sender === selectedChatData._id ? "text-left" : "text-right"
      } mb-4`}
    >
      {message.messageType === "text" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
              : "bg-[#2a2b33]/5 text-white/80 border-white/20"
          } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
        >
          {message.content}
        </div>
      )}

      {message.messageType === "file" && (
        <div
          className={`${
            message.sender !== selectedChatData._id
              ? "bg-[#8417ff]/10 border-[#8417ff]/40"
              : "bg-[#2a2b33]/40 border-white/10"
          } border rounded-lg p-3 inline-block max-w-[60%]`}
        >
          {checkIfImage(message.fileURL) ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowImage(true);
                setImageURL(message.fileURL);
              }}
            >
              <img
                src={message.fileURL}
                alt="file"
                className="rounded-md max-h-64 w-auto"
              />
            </div>
          ) : (
            <div className="flex items-center gap-4 bg-black/30 rounded-md p-3">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-indigo-500/20 text-indigo-400 text-2xl">
                <MdFolderZip />
              </div>

              <div className="flex flex-col overflow-hidden">
                <span className="text-sm text-white truncate max-w-56">
                  {message.fileURL.split("/").pop()}
                </span>
                <button
                  onClick={() => downloadFile(message.fileURL)}
                  className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md flex items-center gap-2"
                >
                  <IoArrowDownCircleOutline className="text-xl" />
                  Download
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="text-xs text-gray-600">
        {moment(message.createdAt).format("LT")}
      </div>
    </div>
  );

  const renderMessages = () => {
    let lastDate = null;

    return selectedChatMessages.map((message) => {
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
    });
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] ls:w-[70vw] xl:w-[80vw]"
    >
      {renderMessages()}

      {showImage && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={() => {
            setShowImage(false);
            setImageURL(null);
          }}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            {/* ❌ CLOSE BUTTON */}
            <button
              onClick={() => {
                setShowImage(false);
                setImageURL(null);
              }}
              className="absolute -top-4 -right-4 bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl hover:bg-red-600 transition"
            >
              ✕
            </button>

            {/* 🖼 IMAGE */}
            <img
              src={imageURL}
              alt="preview"
              className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-xl"
            />

            {/* ⬇️ DOWNLOAD BUTTON */}
            <button
              onClick={() => forceDownload(imageURL)}
              className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg"
            >
              <IoArrowDownCircleOutline className="text-xl" />
              Download
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
