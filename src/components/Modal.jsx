import "./Modal.css";

function Modal({ closeModal, turns }) {
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="title-close-btn">
          <button className="x-btn" onClick={() => closeModal(false)}> X </button>
        </div>

        <div className="title">
          <h1>You won!</h1>
        </div>
        <div className="body">
          <p>
            You won in {turns} turns!
          </p>

        </div>

        <div className="footer">
          <input className="name-form" type="text" placeholder="Name" maxLength={10} />
          <button className="submit-btn">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Modal;
