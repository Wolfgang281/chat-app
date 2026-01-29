import { useAppStore } from "../../../store";

const ContactList = ({ contacts, isChannel = false }) => {
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
        <div key={contact._id}>{contact._id}</div>
      ))}
    </div>
  );
};

export default ContactList;
