import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { getColor } from "../../../lib/utils";
import { useAppStore } from "../../../store";

const ContactList = ({ contacts, isChannel = false }) => {
  // console.log("contacts: ", contacts);
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    selectedChatType,
    setSelectedChatMessages,
  } = useAppStore();

  const handleClickContact = (contact) => {
    setSelectedChatData(contact);
    setSelectedChatType(isChannel ? "channel" : "contact");
    if (selectedChatData && selectedChatData._id === contact._id)
      setSelectedChatMessages([]);
  };

  return (
    <div className="mt-5">
      {contacts.map((contact) => (
        <div
          key={contact._id}
          className={`pl-10 py-2 cursor-pointer transition-all duration-300
          hover:bg-[#1c1d25]
          ${
            selectedChatData && selectedChatData._id === contact._id
              ? "bg-[#8417ff] text-white"
              : "hover:bg-[#f1f1f111]"
          }
        `}
          onClick={() => handleClickContact(contact)}
        >
          <div className="flex gap-5 items-center text-neutral-300">
            {!isChannel && (
              <Avatar className="h-10 w-10 rounded-full overflow-hidden">
                {contact.profileImage ? (
                  <AvatarImage
                    src={contact.profileImage}
                    alt="profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div
                    className={`
                      ${selectedChatData && selectedChatData._id === contact._id ? "bg-white" : "bg-[#ffffff22]"}
                      h-10 w-10 flex border items-center justify-center rounded-full text-sm font-medium uppercase ${getColor(
                        contact.color,
                      )}`}
                  ></div>
                )}
              </Avatar>
            )}
            {isChannel && (
              <div className="gb-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
                #
              </div>
            )}
            {isChannel ? (
              <span>{contact.name}</span>
            ) : (
              <span>{`${contact.firstName} ${contact.lastName}`}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
