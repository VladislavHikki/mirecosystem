import { encode } from 'html-entities';
export function replaceXSS(value) {
    // const entityMap = {
    //     '&': '&amp;',
    //     '<': '&lt;',
    //     '>': '&gt;',
    //     '"': '&quot;',
    //     "'": '&#39;',
    //     '/': '&#x2F;',
    // };
    // return value.replace(/[&<>"'/]/g, function (s) {
    //     return entityMap[s];
    // });
    return encode(value);
}