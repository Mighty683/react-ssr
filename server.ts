import Express from "express";
import { readFile } from "fs/promises";
import { renderMicrofrontend } from "./src/entry-server";
import { load } from "cheerio";

export const app = Express();

app.use("/dist", Express.static("dist"));
app.use("/node_modules/systemjs/dist", Express.static("node_modules/systemjs/dist"));

app.use("/", async (_, res) => {
  try {
    const indexHtmlFile = await readFile("./index.html", "utf-8");
    const data = { exampleKey: "exampleValue" };
    const renderedElement = await renderMicrofrontend(data);
    const htmlTree = load(indexHtmlFile);
    // Inject HTML rendered by React into the micro-frontend element
    htmlTree("micro-frontend").html(renderedElement);
    // Set the data attribute with the server-side data
    // This will be used by the client-side code to hydrate the component
    htmlTree("micro-frontend").attr("data-server", JSON.stringify(data));
    const finalHtml = htmlTree.html();
    res.type("html").send(finalHtml);
  } catch (err) {
    console.error("Error loading index.html:", err);
    res.status(500).send("Error loading index.html");
  }
});
app.on("error", err => {
  console.error("Server error:", err);
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
