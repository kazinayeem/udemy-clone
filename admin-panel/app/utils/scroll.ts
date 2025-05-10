export function saveScrollPosition(key = "scroll-y") {
  sessionStorage.setItem(key, JSON.stringify(window.scrollY));
}

export function restoreScrollPosition(key = "scroll-y") {
  const scrollY = JSON.parse(sessionStorage.getItem(key) || "0");
  window.scrollTo(0, scrollY);
}
