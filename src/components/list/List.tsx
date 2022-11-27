import classNames from "classnames";
import { FC } from "react";
interface IData {
  id: number;
  content: string | number | JSX.Element | JSX.Element[];
  active?: boolean;
  disabled?: boolean;
  set?: () => void;
}
interface Props {
  data: IData[];
  className?: string;
  classNameItem?: string;
  hover?: boolean;
}
const List: FC<Props> = ({ data, className, classNameItem, hover }) => {
  return (
    <div className={classNames(className, "list flex justify-center")}>
      <ul className="bg-white rounded-lg border border-gray-200 w-full text-gray-900">
        {data.length > 0 &&
          data.map((item: IData) => {
            return (
              <li
                onClick={() => item.set && item.set()}
                className={classNames(
                  classNameItem,
                  "px-4 py-1 border-b border-gray-200 w-full rounded-t-lg select-none cursor-pointer",
                  {
                    "bg-blue-600 text-white": item.active,
                    "text-gray-400 cursor-default": item.disabled,
                    "hover:bg-gray-100 hover:text-gray-500 transition duration-500 cursor-pointer":
                      hover && !item.disabled && !item.active,
                  }
                )}
                key={item.id}
              >
                {item.content}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default List;
