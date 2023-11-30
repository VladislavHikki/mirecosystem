export default (file) => {
  switch (file?.type) {
    case 'image/png':
    case 'image/jpeg':
    case 'image/jpg':
      return {
        url: file?.objectURL,
        name: file?.name,
        status: file?.size > 1024 * 1024 * 20 ? 'Размер больше 20 мб!' : null,
      };
    default:
      return {
        class: 'pi pi-paperclip',
        name: file?.name,
        status: file?.size > 1024 * 1024 * 20 ? 'Размер больше 20 мб!' : null,
      };
  }
};
