import url from '~/store/config';

export const getImageUrl = (image, template = '@/assets/images/avatar.svg') => {
  if (image) {
    if (typeof image === 'string') {
      return `${url}/api/public${image}`;
    } else {
      return image.objectURL;
    }
  } else {
    return template;
  }
};
