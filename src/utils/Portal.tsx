import { FC, ReactNode, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
interface Props {
  children: ReactNode;
  className?: string;
  parent?: HTMLElement;
  style?:any
}
const Portal: FC<Props> = ({ children, parent, className , style}) => {
  const el:any = useMemo(() => document.createElement("div"), []);
  for(const p in style){
    el.style[p] = style[p]
  }
  useEffect(() => {
    const target = (parent && parent.appendChild) ? parent : document.body;
    const classList = ["portal-container"];
    if (className)
      className.split(" ").forEach((item: string) => classList.push(item));
    classList.forEach((item: string) => el.classList.add(item));
    target.appendChild(el);
    return () => {
      target.removeChild(el);
    };
  }, [className, el, parent]);

  return createPortal(children, el);
};
export default Portal;
