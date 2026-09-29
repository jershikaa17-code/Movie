import "./ErrorMessage.css";

export default function ErrorMessage({
  title = "Something went wrong.",
  message = "We couldn't load this right now. Please try again.",
  onRetry,
}) {
  return (
    <div className="error-message">
      <div className="error-message__icon">⚠</div>
      <h3 className="error-message__title">{title}</h3>
      <p className="error-message__text">{message}</p>
      {onRetry && (
        <button className="error-message__retry" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
