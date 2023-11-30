export default (txt) => {
//   let pattern = /https?:\/\/\S+/g;
//   let links = new Set(txt.match(pattern));
//   if (links?.size) {
//     links.forEach((link) => {
//       let linkForReg = link.replace("?", "\\?").replace("+", "\\+");
//       let pattern = new RegExp(linkForReg, 'g');
//       txt = txt.replace(pattern, `<a class="description_link" target="_blank" href="${link}">${link}</a>`);
//     });
//   }
//   return txt;

const urlRegex = /((https?|ftp):\/\/[^\s/$.?#].[^\s]*)/gi;

const matches = txt?.match?.(urlRegex);

if (matches)
  txt = txt.replace(urlRegex, '<a class="description_link" target="_blank" href="$1">$1</a>');

return txt;
}