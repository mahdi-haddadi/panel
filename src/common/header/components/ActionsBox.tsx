import useWindowDimensions from "../../../hooks/useWindowDimensions";
import Actions from "./Actions";
import Profile from "./Profile";

const ActionsBox = () => {
  const { width } = useWindowDimensions();
  return (
    <div className="actions-box md:mr-8">
      <div className="flex justify-center items-center">
        {width > 768 && <Actions />}
        <Profile />
      </div>
    </div>
  );
};

export default ActionsBox;
