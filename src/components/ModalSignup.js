import "./Modal.css";

import Signup from "./Signup";

const ModalSignup = ({ modals, setModals, setUser }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="boxClose-btn">
          <span
            className="close-btn"
            onClick={() => {
              const tab = [...modals];
              tab[0] = false;
              setModals(tab);
            }}
          >
            &times;
          </span>
        </div>
        <Signup modals={modals} setModals={setModals} setUser={setUser} />
      </div>
    </div>
  );
};

export default ModalSignup;
