import { useRef, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Authorization } from './components/Authorization/Authorization';
import { Background } from './components/Background/Background';
import { Contacts } from './components/Contacts/Contacts';
import { Modal } from './components/Modal/Modal';
import { NewContactForm } from './components/NewContactForm/NewContactForm';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { useClickOutside } from './hooks/useClickOutside';

function App() {
  const modalRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [valuesToEdit, setValuesToEdit] = useState({ name: '', phone: '' });
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem('currentUser')) || { id: '', email: '', contacts: [] }
  );
  const handleModalClose = () => {
    setModalVisible(false);
    setValuesToEdit({ name: '', phone: '' });
  };
  useClickOutside(modalRef, handleModalClose);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Authorization onSuccessAuthorization={setCurrentUser} />} />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <Contacts
                currentUser={currentUser}
                onModalOpen={() => setModalVisible(true)}
                onContactDelete={(currentUser) => setCurrentUser(currentUser)}
                onValuesToEditChange={(values) => setValuesToEdit(values)}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Authorization onSuccessAuthorization={setCurrentUser} />} />
      </Routes>
      <Background />
      <ToastContainer />
      <Modal modalRef={modalRef} modalVisible={modalVisible} onModalClose={handleModalClose}>
        <NewContactForm
          valuesToEdit={valuesToEdit}
          onNewContactAdd={(currentUser) => setCurrentUser(currentUser)}
          onModalClose={handleModalClose}
        />
      </Modal>
    </>
  );
}

export default App;
