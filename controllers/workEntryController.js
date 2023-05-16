import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as taskService from "../services/taskService.js";
import * as workEntryService from "../services/workEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};



const additem = async(request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const formData = await request.formData();
    const name = formData.get("name");
    await workEntryService.createitem(urlParts[2], name);
    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};
const viewitem = async(request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    const data = {
        list: await taskService.findById(urlParts[2]),

        shoppingitems: await workEntryService.findAllitems(urlParts[2]),
    };

    return new Response(await renderFile("items.eta", data), responseDetails);
};

const deleteitem = async(request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await workEntryService.deleteitem(urlParts[4]);
    return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { additem, viewitem, deleteitem };