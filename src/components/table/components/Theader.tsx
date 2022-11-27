import { FC } from "react";
import { AiOutlineFileExcel, AiOutlineSearch } from "react-icons/ai";
import Translator from "../../../i18n/Translator";
import { exportTableToExcel } from "../../../utils/exportTableToExcel";
import Button from "../../button/Button";
import InputBase from "../../input/textField/components/InputBase";
interface Props {
  tableId?: string;
  value?: string;
  changeValue?: any;
}

const Theader: FC<Props> = ({ tableId, value, changeValue }) => {
  return (
    <div className="py-4 px-10 flex justify-between items-center">
      <InputBase
        // placeholder={<Translator>search</Translator>}
        icon={[
          {
            icon: <AiOutlineSearch className="text-text-primary" />,
            position: "start",
          },
        ]}
        initialValue={value}
        onChange={changeValue}
        className="bg-bg-paper"
      />
      <Button
        color="info"
        className="border-0"
        onClick={() => tableId && exportTableToExcel(tableId)}
      >
        <Translator>export</Translator>
        <AiOutlineFileExcel className="inline-block mx-1" size={"1rem"} />
      </Button>
    </div>
  );
};

export default Theader;
