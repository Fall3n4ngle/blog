"use client";

import { usePathname } from "next/navigation";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  RedditIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

export default function ShareButtons() {
  const pathname = usePathname();
  const url = `${process.env.VERCEL_URL ?? "http://localhost:3000"}${pathname}`;

  return (
    <div className="flex items-center gap-2.5 flex-wrap">
      <FacebookShareButton url={url}>
        <FacebookIcon className="sm:w-10 sm:h-10 w-8 h-8 rounded-full" />
      </FacebookShareButton>
      <TwitterShareButton url={url}>
        <TwitterIcon className="sm:w-10 sm:h-10 w-8 h-8 rounded-full" />
      </TwitterShareButton>
      <LinkedinShareButton url={url}>
        <LinkedinIcon className="sm:w-10 sm:h-10 w-8 h-8 rounded-full" />
      </LinkedinShareButton>
      <RedditShareButton url={url}>
        <RedditIcon className="sm:w-10 sm:h-10 w-8 h-8 rounded-full" />
      </RedditShareButton>
      <WhatsappShareButton url={url}>
        <WhatsappIcon className="sm:w-10 sm:h-10 w-8 h-8 rounded-full" />
      </WhatsappShareButton>
      <EmailShareButton url={url}>
        <EmailIcon className="sm:w-10 sm:h-10 w-8 h-8 rounded-full" />
      </EmailShareButton>
    </div>
  );
}
