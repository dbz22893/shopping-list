import { renderFile } from "https://deno.land/x/eta@v2.0.0/mod.ts";
import * as taskService from "../services/taskService.js";
import * as workEntryService from "../services/workEntryService.js";

const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const redirectTo = (path) => {
    return new Response(`Redirecting to ${path}.`, {
        status: 303,
        headers: {
            "Location": path,
        },
    });
};

const addList = async(request) => {
    const formData = await request.formData();
    const name = formData.get("name");

    await taskService.create(name);

    return redirectTo("/lists");
};

const viewLists = async(request) => {
    const data = {
        shoppinglists: await taskService.findAllShopping_lists(),
    };

    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const showMainpage = async(request) => {
    const data = {
        Lists: "Lists",
        numberofshoppinglists: await taskService.numberofshoppinglists(),
        numberofshoppinglistitems: await workEntryService.numberofshoppinglistitems(),

    };

    return new Response(await renderFile("mainpage.eta", data), responseDetails);
};




export { addList, viewLists, showMainpage };