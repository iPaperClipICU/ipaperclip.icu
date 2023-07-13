import { customAlphabet } from "nanoid/non-secure";
import { MD5 } from "crypto-js";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 10);

export const getSign = (FileURL: string): string => {
  const u = new URL(FileURL);
  if (u.host === "ipaperclip-file.xodvnm.cn") {
    const PKEY = String(import.meta.env.TencentCDN_PKEY);
    const uri = u.pathname; // url
    const ts = Math.floor(Date.now() / 1000); // ts
    const uid = 0;
    const rand = nanoid();
    const sign = `${ts}-${rand}-${uid}-${MD5(`${uri}-${ts}-${rand}-${uid}-${PKEY}`)}`;
    u.searchParams.set("sign", sign);

    return u.href;
  } else {
    return FileURL;
  }
};
