export const freezeScreen = (freeze: Boolean) => {
  if (freeze) {
    document.body.style.width = "100%";
    document.body.style.height = "100vh";
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.width = "100%";
    document.body.style.height = "unset";
    document.body.style.overflow = "auto";
  }
};
