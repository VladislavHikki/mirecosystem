import { decode } from "html-entities";
export default (html) => {
    return decode(html);
}