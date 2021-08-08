import "./Modal.css";

import Login from "./Login";

const ModalLogin = ({ modals, setModals, setUser }) => {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="boxClose-btn">
          <span
            className="close-btn"
            onClick={() => {
              const tab = [...modals];
              tab[1] = false;
              setModals(tab);
            }}
          >
            &times;
          </span>
        </div>
        <Login modals={modals} setModals={setModals} setUser={setUser} />
      </div>
    </div>
  );
};

export default ModalLogin;
