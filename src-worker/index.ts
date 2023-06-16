import mime from "mime";
// @ts-ignore
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
const assetManifest = JSON.parse(manifestJSON) as { [key: string]: string };

import { getData } from "../src/assets/utils";
import { InternalServerErrorPage } from "./500";

const CACHE_ID = "4";
const fileData = getData();

const decURI = (str: string): string => {
  try {
    return decodeURIComponent(str);
  } catch (e) {
    return str;
  }
};

const matchFileData = (path: string): boolean => {
  path = path.replace(/^\/+/, "");
  console.log(`matchFileData: ${path}`);
  if (path === "") return true;
  const pathList = path.split("/");

  const filesName = decURI(pathList[0] ?? "");
  const filesData = fileData.data[filesName];
  let fileName: string | undefined;
  if (filesData !== undefined) {
    if (Array.isArray(filesData)) {
      // 无Tag
      fileName = decURI(pathList[1]);
    } else {
      // 有Tag
      const tagName = decURI(pathList[1]);
      console.log(`tagName: ${tagName}`);
      if (tagName in filesData) {
        fileName = decURI(pathList[2]);
      }
    }
  }
  console.log(`filesName: ${filesName}`, `fileName: ${fileName}`);

  if (fileName !== undefined && fileName in fileData.searchData) return true;
  else return false;
};

const getAssetKey = (
  path: string
): {
  kvKey: string;
  respStatus: number;
} => {
  path = path.replace(/^\/+/, "");

  let kvKey: string | undefined;
  let respStatus: 200 | 404 = 200;
  for (const [key, value] of Object.entries(assetManifest)) {
    if (key === path || value === path) {
      kvKey = value;
      break;
    }
  }
  if (kvKey === undefined) {
    kvKey = assetManifest["index.html"];
    respStatus = matchFileData(path) ? 200 : 404;
  }

  return { kvKey, respStatus };
};

export interface Env {
  __STATIC_CONTENT: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const { pathname, hostname } = url;

    const cache = caches.default;

    const rawPathKey = pathname.replace(/^\/+/, "");
    const { kvKey, respStatus } = getAssetKey(rawPathKey);
    const cacheKey = `https://${hostname}/${CACHE_ID}/${kvKey}`;
    if (kvKey !== undefined && request.headers.get("Cache-Control") !== "no-cache") {
      // 缓存
      const cacheResp = await cache.match(cacheKey);
      if (cacheResp !== undefined) {
        console.log("Cache HIT");
        return new Response(cacheResp.body, {
          headers: cacheResp.headers,
          status: respStatus,
        });
      }
    }
    console.log(
      "Cache MISS",
      `KvKey: ${kvKey}`,
      `Cache-Control: ${request.headers.get("Cache-Control")}`
    );
    const respData = await (async (): Promise<{
      body: BodyInit | null;
      headers?: HeadersInit;
      status: number;
    }> => {
      if (pathname === "/test/500.html") {
        throw new Error("Test 500.html");
      }
      if (kvKey === undefined) {
        throw new Error("KVKey is undefined");
      }

      const body = await env.__STATIC_CONTENT.get(kvKey, {
        type: "arrayBuffer",
        cacheTtl: 60 * 60 * 24,
      });
      if (body === null) {
        throw new Error("body is null");
      }

      const headers = new Headers();
      headers.set("Content-Type", `${mime.getType(kvKey) ?? "text/plain"}; charset=utf-8`);
      headers.set("ETag", `W/"${kvKey}"`);
      headers.set("Cache-Control", "max-age=86400");

      return {
        body,
        headers,
        status: respStatus,
      };
    })().catch((e) => {
      console.error(e);
      const headers = new Headers();
      headers.set("Content-Type", "text/html; charset=utf-8");
      return {
        body: InternalServerErrorPage,
        headers,
        status: 500,
      };
    });

    // 缓存
    if (respData.status === 200 || respData.status === 404) {
      ctx.waitUntil(
        cache.put(cacheKey, new Response(respData.body, { headers: respData.headers }))
      );
    }

    const resp = new Response(respData.body, {
      headers: respData.headers,
      status: respData.status,
    });
    resp.headers.set("Content-Encoding", "gzip"); // 压缩

    return resp;
  },
};
