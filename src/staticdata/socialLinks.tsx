import React, { ReactNode } from "react";
import { LuGithub, LuInstagram, LuLinkedin, LuTwitter, } from "react-icons/lu";
import { SiPeerlist } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";

type SocialLink = {
    linkName: string,
    linkHref: string,
    linkIcon: ReactNode
}

const socialLinks: SocialLink[] = [
  {
    linkName: "Twitter",
    linkHref: "https://x.com/kevinnn_tw",
    linkIcon: <FaXTwitter  size={28} />,
  },
  {
    linkName: "GitHub",
    linkHref: "https://github.com/kevin-t11",
    linkIcon: <LuGithub size={28} />,
  },
  {
    linkName: "Instagram",
    linkHref: "https://www.instagram.com/kevinnn._.11",
    linkIcon: <LuInstagram size={28} />,
  },
  {
    linkName: "LinkedIn",
    linkHref: "https://www.linkedin.com/in/kevin-thumbar-00152b221/",
    linkIcon: <LuLinkedin size={28} />,
  },
  {
    linkName: "Peerlist",
    linkHref: "https://peerlist.io/kevint11",  
    linkIcon: <SiPeerlist size={28} />,
  }
];

export default socialLinks;
