export const getUrl = (baseUrl, paramObj) => {
  let url = baseUrl + '?';
  let paramKeyArray = Object.keys(paramObj);
  let length = paramKeyArray.length;
  paramKeyArray.map((key, index) => {
    url = url + key + '=' + paramObj[key];
    if (index !== length - 1) {
      url = url + '&';
    }
  });
  return url;
};
