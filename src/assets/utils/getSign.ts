// import { customAlphabet } from "nanoid/non-secure";
// import { MD5 } from "crypto-js";
import { nextTick, type Ref } from "vue";
import NaiveUIDiscreteAPI from "../NaiveUIDiscreteAPI";

const w = window as any;
// const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 10);

const waiteReCaptchaLoad = () => {
  return new Promise<boolean>((resolve) => {
    if (w.grecaptcha) resolve(true);
    else {
      w.reCaptchaOnloadList.push((success: boolean) => resolve(success));
    }
  });
};
const getReCaptchaToken = async () => {
  const success = await waiteReCaptchaLoad();
  if (success) {
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
  } else return null;
};

const loadScript = (url: string) => {
  return new Promise<boolean>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = url;
    s.onload = () => {
      resolve(true);
    };
    s.onerror = () => {
      reject(false);
    };
    s.async = true;
    document.body.appendChild(s);
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
  fileUrl: string,
  vaptchaModalRef: Ref<boolean>,
): Promise<string | null> => {
  const u = new URL(fileUrl);
  if (u.host === "ipaperclip-file.xodvnm.cn") {
    const loadingMessage = NaiveUIDiscreteAPI.message.loading("人机验证中~", { duration: 0 });
    // Google reCaptcha
    const reCaptchaToken = await getReCaptchaToken();
    if (!reCaptchaToken) {
      loadingMessage.destroy();
      NaiveUIDiscreteAPI.message.error("人机验证加载失败, 请重新尝试~");
      return null;
    }
    const reCaptchaResult = await API(
      {
        type: "reCaptcha",
        token: reCaptchaToken,
      },
      u.pathname,
    );
    if (reCaptchaResult === false) {
      loadingMessage.destroy();
      NaiveUIDiscreteAPI.message.error("人机验证加载失败, 请重新尝试~");
      return null;
    } else if (reCaptchaResult) {
      loadingMessage.destroy();
      u.searchParams.set("sign", reCaptchaResult);
      return u.href;
    }

    // vaptcha
    vaptchaModalRef.value = true;
    await nextTick();
    let loadResult = true;
    if (!w.vaptcha) {
      console.log("Vaptcha 未加载JS");
      loadResult = await loadScript("https://v-sea.vaptcha.com/v3.js");
    }
    if (!loadResult) {
      vaptchaModalRef.value = false;
      loadingMessage.destroy();
      NaiveUIDiscreteAPI.message.error("人机验证加载失败, 请重新尝试~");
      return null;
    }
    const obj = await w.vaptcha({
      vid: "6601a585d3784602950e811c",
      mode: "click",
      scene: 1,
      container: "#captcha-vaptcha",
      color: "#70c0e8",
    });
    return new Promise<string | null>((resolve) => {
      obj.listen("pass", () => {
        vaptchaModalRef.value = false;
        const { server, token } = obj.getServerToken();
        API(
          {
            type: "vaptcha",
            url: server,
            token,
          },
          u.pathname,
        ).then((vaptchaResult) => {
          loadingMessage.destroy();
          if (vaptchaResult) {
            u.searchParams.set("sign", vaptchaResult);
            resolve(u.href);
          } else {
            NaiveUIDiscreteAPI.message.error(
              `人机验证${vaptchaResult === false ? "加载" : ""}失败, 请重新尝试~`,
            );
            resolve(null);
          }
        });
      });
      obj.render();
      // obj.reset(); // 重置
    });
  } else return fileUrl;
};

// const PKEY = String(import.meta.env.TencentCDN_PKEY);
// const uri = u.pathname; // url
// const ts = Math.floor(Date.now() / 1000); // ts
// const uid = 0;
// const rand = nanoid();
// const sign = `${ts}-${rand}-${uid}-${MD5(`${uri}-${ts}-${rand}-${uid}-${PKEY}`)}`;
// u.searchParams.set("sign", sign);

// return u.href;
