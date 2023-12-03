import Success from "../img/success.svg";
export const ConfirmationPage = () => {
  return (
    <div className="confirm-wrapper">
      <img
        src={Success}
        alt="success"
        height="200"
        width="200"
        className="success-img"
      />
      <h1 className="confirm-header">Success!</h1>
    </div>
  );
};
