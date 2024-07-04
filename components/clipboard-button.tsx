"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Icon from "./ui/icon";

export default function ClipboardButton({ url }: { url: string }) {
 const [copied, setCopied] = useState<boolean>(false);
 const copyUrlToClipboard = () => {
  const tempInput = document.createElement("input");
  tempInput.value = url;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
  setCopied(true);

  setTimeout(() => {
   setCopied(false);
  }, 3000);
 };

 return (
  <>
   {copied ? (
    <span className=" text-xs text-slate-600">copied !</span>
   ) : (
    <Button
     variant="ghost"
     size="sm"
     className="px-3"
     onClick={() => copyUrlToClipboard()}>
     <Icon name="Copy"></Icon>
    </Button>
   )}
  </>
 );
}
