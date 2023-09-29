import "./Modal.css";

function Modal({ closeModal, turns, time }) {
  return (
    <div className="center">
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
            <p>You finished in {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
              <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>
              <span>{("0" + ((time / 10) % 100)).slice(-2)}</span></p>

          </div>

          <div className="footer">
            <form formAction="../process-form.php" formMethod="post">
              <input name="name" className="name-form" type="text" placeholder="Name" maxLength={11} />
              <button className="submit-btn">Submit</button>
            </form>


          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal;
