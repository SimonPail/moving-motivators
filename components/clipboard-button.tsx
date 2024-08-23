"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import Icon from "./ui/icon";
import { useDictionary } from "@/providers/dictionary";

export default function ClipboardButton({ url }: { url: string }) {
 const [copied, setCopied] = useState<boolean>(false);
 const { dictionary } = useDictionary();

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
    <span className=" text-xs text-foreground">{dictionary.buttonCopied}</span>
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
