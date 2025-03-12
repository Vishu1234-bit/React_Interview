export default function ModalDialog({ children, title,onClose }) {
  return (
    <div className="modal-backdrop">
    <div className="modal">
      <h1>{title}</h1>
      {children}
      <button onClick = {onClose}>Close</button>
      </div>
    </div>
  );
}
