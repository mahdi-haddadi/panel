import React, {
  Children,
  FC,
  Fragment,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import CSS from "csstype";
import classNames from "classnames";
import Portal from "../../utils/Portal";
import useOnClickOutside from "../../hooks/useClickOutSide";
import { freezeScreen } from "../../utils/functions";
interface Props {
  open: boolean;
  IsClose: () => void;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  style?: CSS.Properties;
  className?: string;
  children: ReactNode;
  backLayer?: boolean;
  freeze?: boolean;
}
interface IChildComponent {
  style?: CSS.Properties;
  className?: string;
  children: ReactNode;
}

const getChildrenOnDisplayName = (children: any, displayName: string) => {
  return Children.map(children, (child): any =>
    child?.type?.displayName === displayName ? child : null
  );
};

const Dialog = ({
  open,
  IsClose,
  size = "md",
  style,
  className,
  children,
  backLayer = true,
  freeze = true,
}: Props) => {
  const sizes = {
    xs: 444,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1560,
  };
  const Header: any = getChildrenOnDisplayName(children, "Header");
  const Body: any = getChildrenOnDisplayName(children, "Body");
  const Footer: any = getChildrenOnDisplayName(children, "Footer");
  const refDialog = useRef<any>();
  useOnClickOutside(refDialog, IsClose);
  useEffect(() => {
    if (freeze) {
      freezeScreen(open);
    }
  }, [freeze,open]);

  return (
    <Fragment>
      {open && (
        <Portal className="dialog">
          <div className="dialog w-full h-screen fixed z-50  flex justify-center items-center inset-0">
            {backLayer && (
              <div className="layer bg-black/[0.5] w-full -z-10 h-screen fixed transition-opacity top-0 left-0" />
            )}
            <div
              ref={refDialog}
              className={classNames(
                className,
                "dialog-box h-auto z-50 text-zinc-100 bg-slate-800 shadow-lg rounded-lg opacity-100"
              )}
              style={{
                ...style,
                width: "calc(100% - 64px)",
                maxWidth: `${sizes[size]}px`,
              }}
            >
              {Header}
              {Body}
              {Footer}
            </div>
          </div>
        </Portal>
      )}
    </Fragment>
  );
};

const Header: FC<IChildComponent> = ({
  className,
  style,
  children,
  ...rest
}) => {
  return (
    <div
      className={classNames(className, "dialog-header")}
      style={{ ...style }}
      {...rest}
    >
      {children}
    </div>
  );
};
Header.displayName = "Header";
Dialog.Header = Header;

const Body: FC<IChildComponent> = ({ children, className, style }) => {
  return (
    <div className={classNames(className, "dialog-body")} style={{ ...style }}>
      {children}
    </div>
  );
};
Body.displayName = "Body";
Dialog.Body = Body;

const Footer: FC<IChildComponent> = ({ children, className, style }) => {
  return (
    <div
      className={classNames(className, "dialog-footer bg-slate-900")}
      style={{ ...style }}
    >
      {children}
    </div>
  );
};
Footer.displayName = "Footer";
Dialog.Footer = Footer;

export default Dialog;
