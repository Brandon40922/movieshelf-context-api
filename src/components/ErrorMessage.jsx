
function ErrorMessage({ message }) {
    return (
      <div className="error-message" role="alert">
        <h3>Something went wrong!</h3>
        <p>{message}</p>
      </div>
    );
  }
  
  export default ErrorMessage;
  