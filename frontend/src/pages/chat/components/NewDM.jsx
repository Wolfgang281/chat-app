import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import Lottie from "react-lottie";
import { toast } from "sonner";
import { CONTACT_ROUTES } from "../../../../utils/constants";
import { Avatar, AvatarImage } from "../../../components/ui/avatar";
import { Input } from "../../../components/ui/input";
import { ScrollArea } from "../../../components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import apiClient from "../../../lib/axios";
import { animationDefaultOptions, getColor } from "../../../lib/utils";
import { useAppStore } from "../../../store";

const NewDM = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();

  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);
  console.log("searchedContacts: ", searchedContacts);

  const searchContacts = async (searchedTerm) => {
    console.log("searchedTerm:", searchedTerm);
    try {
      if (searchedTerm.length > 0) {
        const response = await apiClient.post(CONTACT_ROUTES.SEARCH, {
          searchedContact: searchedTerm,
        });
        console.log("response: ", response);
        if (response.status == 200) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const selectNewContact = async (contact) => {
    try {
      setOpenNewContactModel(false);
      setSelectedChatType("contact");
      setSelectedChatData(contact);
      setSearchedContacts([]);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <FaPlus
            className="text-neutral-400 text-opacity-90 hover:text-neutral-100 cursor-pointer transition-all duration-300"
            onClick={() => setOpenNewContactModel(true)}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-[#1c1b1e] border-none text-white mb-2 p-3">
          <p>Select New Contact</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#181920] border-none text-white max-w-md h-[70vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Select New Contact
            </DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Search contacts..."
            className="rounded-lg p-6 bg-[#2c2e3b] border-none text-white"
            onChange={(e) => searchContacts(e.target.value)}
          />

          <ScrollArea className="h-62.5">
            <div className="flex flex-col gap-5">
              {searchedContacts.map((contact) => (
                <div
                  key={contact._id}
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() => selectNewContact(contact)}
                >
                  <div className="w-12 h-12 relative">
                    <Avatar className="h-10 w-10 md:w-15 md:h-12 rounded-full overflow-hidden">
                      {contact["profile-image"] ? (
                        <AvatarImage
                          src={contact["profile-image"]}
                          alt="profile"
                          className="object-cover w-full h-full bg-black rounded-full"
                        />
                      ) : (
                        <div
                          className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border flex items-center justify-center rounded-full ${getColor(
                            contact.selectedColor,
                          )}`}
                        >
                          {contact.firstName
                            ? contact.firstName.split("").shift()
                            : contact.email.split("").shift()}
                        </div>
                      )}
                    </Avatar>
                  </div>
                  <div className="flex flex-col">
                    <span>
                      {contact.firstName && contact.lastName
                        ? `${contact.firstName} ${contact.lastName}`
                        : contact.email}
                    </span>
                    <span className="text-xs">{contact.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          {searchedContacts.length === 0 && (
            <div className="flex-1 mt-6 flex flex-col justify-center items-center animate-fadeIn">
              <Lottie
                isClickToPauseDisabled
                height={220}
                width={220}
                options={animationDefaultOptions}
                speed={0.8}
                style={{
                  filter: "drop-shadow(0 0 30px rgba(168,85,247,0.4))",
                }}
              />

              <div className="text-white text-opacity-80 text-center mt-6">
                <h3 className="text-xl font-medium leading-relaxed">
                  Start a new conversation ✨
                  <br />
                  <span className="text-purple-500">
                    Search and select a contact
                  </span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
