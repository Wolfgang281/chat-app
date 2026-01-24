import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Input } from "../../../components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../../../components/ui/tooltip";

const NewDM = () => {
  const [openNewContactModel, setOpenNewContactModel] = useState(false);

  const searchContacts = (searchedTerm) => {
    console.log("searchedTerm: ", searchedTerm);
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <FaPlus
            className="text-neutral-400 text-opacity-90 font-light text-start hover:text-neutral-100 cursor-pointer hover:text-opacity-100 transition-all duration-300 ease-in-out"
            onClick={() => setOpenNewContactModel(true)}
          />
        </TooltipTrigger>
        <TooltipContent className="bg-[#1c1b1e] border-none text-white mb-2 p-3">
          <p>Select New Contact </p>
        </TooltipContent>
      </Tooltip>
      <Dialog
        open={openNewContactModel}
        onOpenChange={setOpenNewContactModel}
        className="bg-black"
      >
        <DialogContent className="bg-[#181920] border-none text-white w-100 h-100 flex flex-col">
          <DialogHeader>
            <DialogTitle>Select New Contact</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              placeholder="Search Contacts"
              className="rounded-lg p-6 bg-[#2c2e3b] border-none text-white"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
