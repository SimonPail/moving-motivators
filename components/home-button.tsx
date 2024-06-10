import React from "react";
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
 Dialog,
 DialogClose,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Icon from "./ui/icon";
import { useState } from "react";
import { nanoid } from "nanoid";
import { socket } from "@/socket";
import { Button } from "@/components/ui/button";
import ClipboardButton from "@/components/clipboard-button";

export default function HomeButton() {
 const [sessionUrl, setSessionUrl] = useState<string>("");
 const [openDialog, setOpenDialog] = useState<boolean>(false);

 async function createLiveSession() {
  console.log("createLiveSession");
  const sessionId = nanoid(5);
  socket.emit("create-session", sessionId);
  return `${window.location.origin}/live?sessionId=${sessionId}`;
 }

 async function startSession() {
  const url = await createLiveSession();
  window.open(url, "_blank", "noopener,noreferrer");
 }

 async function createForLater() {
  setOpenDialog(true);
  const url = await createLiveSession();
  setSessionUrl(url);
 }

 return (
  <>
   <DropdownMenu>
    <DropdownMenuTrigger className="outlined-none" asChild>
     <Button>Create Live Session</Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
     <DropdownMenuItem onClick={createForLater}>
      <Icon name="Link2" className="w-5 mr-2" />
      Get link for Later
     </DropdownMenuItem>
     <DropdownMenuItem onClick={startSession}>
      <Icon name="Plus" className="w-5 mr-2" />
      Start a session
     </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>

   <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
    <DialogContent className="sm:max-w-md">
     <DialogHeader>
      <DialogTitle>Share link</DialogTitle>
      <DialogDescription>
       Share the link to the users you want to invite to the session.
      </DialogDescription>
     </DialogHeader>
     <div className="flex items-center justify-between space-x-4">
      <div className="grid flex-1 gap-2">
       <Label htmlFor="link" className="sr-only">
        Link
       </Label>
       <Input id="link" value={sessionUrl} readOnly />
      </div>

      <ClipboardButton url={sessionUrl} />
     </div>
    </DialogContent>
   </Dialog>
  </>
 );
}
