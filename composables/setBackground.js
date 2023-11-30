export default (url, bgs) => {
    let wrapper = document.querySelector('.wrapper');
    let currentTheme = bgs?.length ? bgs?.filter((item) => item?.active)[0] : 'white';
    if (currentTheme?.type == 0) {
      wrapper.style.backgroundImage = `url(${url}/api/${currentTheme?.background})`;
      wrapper.style.backgroundPosition = 'center';
      wrapper.style.backgroundRepeat = 'no-repeat';
      wrapper.style.backgroundSize = 'cover';
      wrapper.style.backgroundAttachment = 'fixed';
    } else if (currentTheme?.type == 1) {
       wrapper.style.backgroundImage = "none";
      wrapper.style.backgroundColor = `#${currentTheme?.background}`;
    } else {
       wrapper.style.backgroundImage = "none";
      wrapper.style.backgroundColor = `#${currentTheme}`;
    }
}