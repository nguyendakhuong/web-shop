import { ERROR_CHECK_LIST_TYPE } from "./ListError";

export const Validate = (
  type = "email",
  inputValue,
  listError = {},
  price,
  priceSale,
  timeStart
) => {
  let error = null;
  const reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const regex =
    /^(3[0-9]|4[0-5]):(0[1-9]|[1-9][0-9]|[1-4][0-9]{2}|500)(,(3[0-9]|4[0-5]):(0[1-9]|[1-9][0-9]|[1-4][0-9]{2}|500))*$/;
  const regexSize = /^\d+:\d+(,\d+:\d+)*$/;
  const today = new Date();

  for (let key in listError) {
    switch (key) {
      case "required":
        error = !inputValue ? ERROR_CHECK_LIST_TYPE[key] : null;
        break;
      case "minLength":
        error =
          inputValue.length < +listError[key]
            ? ERROR_CHECK_LIST_TYPE[key] + listError[key] + " kí tự"
            : null;
        break;
      case "maxLength":
        error =
          inputValue.length > +listError[key]
            ? ERROR_CHECK_LIST_TYPE[key] + listError[key] + " kí tự"
            : null;
        break;
      case "regEmail":
        error = !reg.test(inputValue) ? ERROR_CHECK_LIST_TYPE[key] : null;
        break;
      default:
    }
    if (error) {
      break;
    }
  }
  return error;
};
