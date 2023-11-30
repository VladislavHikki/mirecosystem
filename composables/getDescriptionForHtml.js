export default (object) => {
  [...object.getElementsByTagName('a')].map((value) => value.classList.add('description_link'));
  [...object.getElementsByTagName('table')].map((table) => {
    table.classList.add('description_table');
    let tds = [...table.getElementsByTagName('td')];
    tds.map((td) => td.classList.add('description_table_td'));
  });
};
