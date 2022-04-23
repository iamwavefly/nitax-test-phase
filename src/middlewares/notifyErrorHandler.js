import newToast from "./toast";

const notifyErrorHandler = ({ type, title, msg, duration }) => {
  let errorMsg = null;

  if (typeof msg === "object") {
    const message = JSON.parse(JSON.stringify(msg));

    if (message?.message === "Network Error") {
      errorMsg = "Network Error. Please check your internet connection";
    } else if (msg?.response?.status === 401) {

      return;
    } else if (Object.entries(msg).length === 0) {
      errorMsg = String(msg);
      return;
    } else if (msg.response) {
      errorMsg = msg?.response?.data?.message;
    } else {
      errorMsg = String(msg);
    }
  }

  const toastConfig = {
    type,
    title,
    msg: errorMsg,
    duration,
  };
  newToast(toastConfig);
};

export default notifyErrorHandler;
