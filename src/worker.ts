import { getAssetFromKV, mapRequestToAsset, type Options } from "@cloudflare/kv-asset-handler";
// @ts-ignore
import manifestJSON from "__STATIC_CONTENT_MANIFEST";
const assetManifest = JSON.parse(manifestJSON);

export interface Env {
  __STATIC_CONTENT: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const Evt = {
      request,
      waitUntil: (promise: Promise<any>) => {
        ctx.waitUntil(promise);
      },
    };
    const publicOpts: Partial<Options> = {
      ASSET_NAMESPACE: env.__STATIC_CONTENT,
      ASSET_MANIFEST: assetManifest,
      cacheControl: {
        browserTTL: 60 * 60 * 24,
        edgeTTL: 60 * 60 * 24,
      },
    };
    const url = new URL(request.url);

    const resp = await (async () => {
      return await getAssetFromKV(Evt, {
        ...publicOpts,
        mapRequestToAsset: (request) => {
          if (url.pathname.startsWith("/assets/")) {
            return mapRequestToAsset(request);
          } else {
            url.pathname = "/index.html";
            return mapRequestToAsset(new Request(url.toString(), request));
          }
        },
      }).catch(async () => {
        return await getAssetFromKV(Evt, {
          ...publicOpts,
          mapRequestToAsset: (request) => {
            url.pathname = "/index.html";
            return mapRequestToAsset(new Request(url.toString(), request));
          },
        }).catch((e) => new Response(e.message || e.toString(), { status: 500 }));
      });
    })();

    resp.headers.set("Content-Encoding", "gzip");

    return resp;
  },
};
