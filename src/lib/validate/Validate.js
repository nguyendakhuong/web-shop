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
    /^(3[0-9]|4[0-5]|S|M|L|XL|XXL):(0[1-9]|[1-9][0-9]{0,2}|1000)(,(3[0-9]|4[0-5]|S|M|L|XL|XXL):(0[1-9]|[1-9][0-9]{0,2}|1000))*$/;
  const regexSize = /^[a-zA-Z0-9]+:\d+(,[a-zA-Z0-9]+:\d+)*$/;
  const regexColor = /^#[a-fA-F0-9]{6}$/;
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
            ? ERROR_CHECK_LIST_TYPE[key] + " " + listError[key] + " kí tự"
            : null;
        break;
      case "regEmail":
        error = !reg.test(inputValue) ? ERROR_CHECK_LIST_TYPE[key] : null;
        break;
      case "checkNumber":
        error = isNaN(inputValue) ? ERROR_CHECK_LIST_TYPE[key] : null;
        break;
      case "min":
        error = error =
          inputValue < +listError[key]
            ? ERROR_CHECK_LIST_TYPE[key] + " " + listError[key]
            : "";
        break;
      case "max":
        error = error =
          inputValue > +listError[key]
            ? ERROR_CHECK_LIST_TYPE[key] + " " + listError[key]
            : "";
        break;
      case "regexSizeAndQuantity":
        error = !regex.test(inputValue) ? ERROR_CHECK_LIST_TYPE[key] : null;
        break;
      case "checkRegexSize":
        error = !regexSize.test(inputValue) ? ERROR_CHECK_LIST_TYPE[key] : null;
        break;
      case "checkCodeColor":
        error = !regexColor.test(inputValue)
          ? ERROR_CHECK_LIST_TYPE[key]
          : null;
        break;
      case "checkSize":
        const pairs = inputValue.split(",");
        const uniqueNumber1s = new Set();
        let isValid = true;
        for (let i = 0; i < pairs.length; i++) {
          const pairComponents = pairs[i].split(":");
          const number1 = pairComponents[0];
          if (uniqueNumber1s.has(number1)) {
            isValid = false;
            break;
          } else {
            uniqueNumber1s.add(number1);
          }
        }
        error = !isValid ? ERROR_CHECK_LIST_TYPE[key] : null;
        break;
      default:
    }
    if (error) {
      break;
    }
  }
  return error;
};
