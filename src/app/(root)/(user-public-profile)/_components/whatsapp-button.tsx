"use client";

import { Button } from "@/components/ui/button";
import {
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

export const WhatsappButton = () => {
  return (
    <>
      <WhatsappShareButton url="/" title={"whatsapp"}>
        <Button>Share on Whatsapps</Button>
      </WhatsappShareButton>
      <TwitterShareButton
        openShareDialogOnClick={false}
        url="/"
        title={"whatsapp"}
      >
        <Button>Share on X</Button>
      </TwitterShareButton>
      <LinkedinShareButton
        url={"https://www.100xcoding.com/techysiddhant"}
        title={"whatsapp"}
      >
        <Button>Share on linkedin</Button>
      </LinkedinShareButton>
    </>
  );
};
