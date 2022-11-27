import { FormEvent } from "react";
import Button from "../../components/button/Button";
import TextField from "../../components/input/textField/TextField";

const AddNewPage = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div className="create-new-page">
      <h3>ساخت صفحه جدید</h3>
      <form onSubmit={handleSubmit}>
        <TextField helperText={{ text: "نام" }} />
        <TextField helperText={{ text: "عنوان" }} />
        <Button color="info" className="my-5" type="submit">
          ثبت
        </Button>
      </form>
    </div>
  );
};

export default AddNewPage;
