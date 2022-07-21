function setCookie(key, value) {
  const date = new Date();
  date.setTime(date.getTime() + (60 * 60 * 1000));
  const expires = `; expires=${date.toUTCString()}`;
  document.cookie = `${key}=${value}; expires=${expires}`;
}

function clearCookie(key) {
  document.cookie = `${key}=; `;
}

function clearCookies(cookies) {
  cookies.forEach((element) => {
    document.cookie = `${element}=;`;
  });
}

module.exports = { setCookie, clearCookie, clearCookies };
