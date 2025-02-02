import {urlParams} from "../index";

export function checkActiveUser() {
    return urlParams.has("id") ? "options" : "user";
}