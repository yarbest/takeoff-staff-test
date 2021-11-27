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
  useClickOutside(modalRef, () => setModalVisible(false));
  const [currentUser, setCurrentUser] = useState(
    () => JSON.parse(localStorage.getItem('currentUser')) || { id: '', email: '', contacts: [] }
  );

  return (
    <>
      <Routes>
        <Route path="/login" element={<Authorization onSuccessAuthorization={setCurrentUser} />} />
        <Route
          path="/contacts"
          element={
            <ProtectedRoute>
              <Contacts currentUser={currentUser} onModalOpen={() => setModalVisible(true)} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Authorization onSuccessAuthorization={setCurrentUser} />} />
      </Routes>
      <Background />
      <ToastContainer />
      <Modal modalRef={modalRef} modalVisible={modalVisible} onModalClose={() => setModalVisible(false)}>
        <NewContactForm onNewContactAdd={(currentUser) => setCurrentUser(currentUser)} onModalClose={() => setModalVisible(false)} />
      </Modal>
    </>
  );
}

export default App;
