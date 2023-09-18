import "./Modal.css";

function Modal({ closeModal }) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <button className="x-btn" onClick={() => closeModal(false)}> X </button>
        <div className="title">
          <h1>You won!</h1>
        </div>
        <div className="body">
          <p>
            You won in 10 turns!
          </p>
        </div>

        <div className="footer">
          <button className="cancel-btn" onClick={() => closeModal(false)}>cancel</button>
          <button className="submit-btn">submit</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;
