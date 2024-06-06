"use client";

import React from "react";
import { Button } from "./ui/button";
import Icon from "./ui/icon";

export default function ClipboardButton({ url }: { url: string }) {
 const copyUrlToClipboard = () => {
  const tempInput = document.createElement("input");
  tempInput.value = url;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
 };

 return (
  <Button variant="ghost" onClick={() => copyUrlToClipboard()}>
   <Icon name="Copy"></Icon>
  </Button>
 );
}
