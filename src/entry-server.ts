import { h } from "vue";
import { pipeToNodeWritable } from "vue/server-renderer";
import { Writable } from "node:stream";
import { createServer } from "vite";
const viteServer = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
});
export const renderMicrofrontend = async (props?: Record<string, string>) => {
  const ssrModule = await viteServer.ssrLoadModule("./src/App.vue");
  const stream = new TextWritableStream();
  const element = h(ssrModule.default, { serverData: props || {} });
  pipeToNodeWritable(element, undefined, stream);

  return new Promise<string>(resolve => {
    stream.on("drain", () => {
      resolve(stream.result);
    });
    stream.on("finish", () => {
      console.log("Stream finished writing.");
      resolve(stream.result);
    });
  });
};

class TextWritableStream extends Writable {
  result: string = "";
  _write(chunk: string, _: string, callback: (error?: Error | null) => void): void {
    this.result += chunk;
    callback();
  }
  _final(callback: (error?: Error | null) => void): void {
    callback();
  }
}
