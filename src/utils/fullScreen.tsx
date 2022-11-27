let elem: any = document.documentElement;
export const openFullscreen = () => {
  if (!document.fullscreen) {
    if (elem.requestFullscreen) {
      elem?.requestFullscreen();
    } else if (elem?.webkitRequestFullscreen) {
      /* Safari */
      elem?.webkitRequestFullscreen();
    } else if (elem?.msRequestFullscreen) {
      /* IE11 */
      elem?.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};
