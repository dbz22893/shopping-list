import { serve } from "https://deno.land/std@0.171.0/http/server.ts";
import { configure } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as taskController from "./controllers/taskController.js";
import * as workEntryController from "./controllers/workEntryController.js";


configure({
    views: `${Deno.cwd()}/views/`,
});


const handleRequest = async(request) => {
    const url = new URL(request.url);

    if (url.pathname === "/" && request.method === "GET") {
        return await taskController.showMainpage(request);
    } else if (url.pathname === "/lists" && request.method === "POST") {
        return await taskController.addList(request);
    } else if (url.pathname === "/lists" && request.method === "GET") {
        return await taskController.viewLists(request);
    } else if (url.pathname.match("/lists/[0-9]+/items/[0-9]+") && request.method === "POST") {
        return await workEntryController.deleteitem(request);
    } else if (url.pathname.match("/lists/[0-9]+") && request.method === "GET") {
        return await workEntryController.viewitem(request);
    } else if (url.pathname.match("/lists/[0-9]+") && request.method === "POST") {
        return await workEntryController.additem(request);
    } else {
        return new Response("Not found", { status: 404 });
    }
};

serve(handleRequest, { port: 7777 });