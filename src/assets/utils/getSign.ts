import { customAlphabet } from "nanoid/non-secure";
import { MD5 } from "crypto-js";
import NaiveUIDiscreteAPI from "../NaiveUIDiscreteAPI";

const w = window as any;
const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 10);

const waiteReCaptchaLoad = () => {
  return new Promise<boolean>((resolve) => {
    if (w.grecaptcha) resolve(true);
    else {
      w.reCaptchaOnloadList.push((success: boolean) => {
        resolve(success);
      });
    }
  });
};
const getReCaptchaToken = () => {
  return new Promise<string | null>((resolve) => {
    w.grecaptcha.enterprise.ready(async () => {
      try {
        const token: string = await w.grecaptcha.enterprise.execute(
          "6LewyaMpAAAAAGk7sPDTBVxK3mI-SYeykrIkeKM8",
          { action: "get_play_sign" },
        );
        resolve(token);
      } catch (e) {
        console.error("获取 reCaptchaToken 失败", e);
        resolve(null);
      }
    });
  });
};

type CaptchaData =
  | {
      type: "reCaptcha";
      token: string;
    }
  | {
      type: "vaptcha";
      url: string;
      token: string;
    };
const API = async (data: CaptchaData, uri: string): Promise<string | null | false> => {
  const resp = await fetch("/api/getPlayUrlSign", {
    method: "POST",
    headers: {
      id: "ipaperclip-icu",
    },
    body: JSON.stringify(
      data.type === "reCaptcha"
        ? {
            uri,
            reCaptchaToken: data.token,
          }
        : {
            uri,
            vaptchaUrl: data.url,
            vaptchaToken: data.token,
          },
    ),
  });
  try {
    if (resp.status === 200) {
      const resp_json = (await resp.json()) as {
        code: number;
        msg: string;
        data: {
          sign: string | null;
        };
      };
      if (resp_json.code === 200) {
        return resp_json.data.sign;
      }
    }
  } catch (e) {
    console.error("getPlayUrlSignError:", e);
  }
  NaiveUIDiscreteAPI.message.error("人机验证加载失败, 请 切换线路 或 刷新页面");
  return false;
};

export const getSign = async (
  FileURL: string,
  vaptchaData?: {
    url: string;
    token: string;
  },
): Promise<string> => {
  const u = new URL(FileURL);
  if (u.host === "ipaperclip-file.xodvnm.cn") {
    if (!vaptchaData) {
      // Google reCaptcha
      if (!w.grecaptcha) {
        const success = await waiteReCaptchaLoad();
        if (!success) {
          NaiveUIDiscreteAPI.message.error("人机验证加载失败, 请 切换线路 或 刷新页面");
          return "";
        }
      }
      const reCaptchaToken = await getReCaptchaToken();
      if (!reCaptchaToken) {
        NaiveUIDiscreteAPI.message.error("人机验证加载失败, 请 切换线路 或 刷新页面");
        return "";
      }

      const reCaptchaResult = await API(
        {
          type: "reCaptcha",
          token: reCaptchaToken,
        },
        u.pathname,
      );
      if (reCaptchaResult === false) {
        return "";
      } else if (reCaptchaResult) {
        u.searchParams.set("sign", reCaptchaResult);
        return u.href;
      }
    } else {
      const vaptchaResult = await API(
        {
          type: "vaptcha",
          url: vaptchaData.url,
          token: vaptchaData.token,
        },
        u.pathname,
      );
      if (vaptchaResult === false) {
        return "";
      } else if (vaptchaResult) {
        u.searchParams.set("sign", vaptchaResult);
        return u.href;
      }
    }
    return "vaptcha";

    // const PKEY = String(import.meta.env.TencentCDN_PKEY);
    // const uri = u.pathname; // url
    // const ts = Math.floor(Date.now() / 1000); // ts
    // const uid = 0;
    // const rand = nanoid();
    // const sign = `${ts}-${rand}-${uid}-${MD5(`${uri}-${ts}-${rand}-${uid}-${PKEY}`)}`;
    // u.searchParams.set("sign", sign);

    // return u.href;
  } else {
    return FileURL;
  }
};
