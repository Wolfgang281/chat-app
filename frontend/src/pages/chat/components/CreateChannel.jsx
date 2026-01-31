import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import { CONTACT_ROUTES } from "../../../../utils/constants";
import { Input } from "../../../components/ui/input";
import { ScrollArea } from "../../../components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import apiClient from "../../../lib/axios";
import { useAppStore } from "../../../store";

const CreateChannel = () => {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();

  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchedTerm) => {
    try {
      if (searchedTerm.length > 0) {
        const response = await apiClient.post(CONTACT_ROUTES.SEARCH, {
          searchedContact: searchedTerm,
        });

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
            <div className="flex flex-col gap-5"></div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateChannel;
