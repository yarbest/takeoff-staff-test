import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import styles from './NewContactForm.module.css';
import { addNewContact, checkIfPhoneExists, deleteContact, error } from '../../utils/utils';

export const NewContactForm = ({ onNewContactAdd, onModalClose, valuesToEdit }) => {
  return (
    <Formik
      initialValues={{ ...valuesToEdit }}
      onSubmit={async (values, { setSubmitting }) => {
        if (values.name.trim() === '' || values.phone.trim() === '') return;

        if (checkIfPhoneExists(values.phone)) {
          error('Contact with such phone already exists!');
          return;
        }

        if (valuesToEdit.phone) {
          await deleteContact(valuesToEdit.phone);
          const updatedCurrentUser = await addNewContact(values);
          onNewContactAdd(updatedCurrentUser);
        } else {
          const updatedCurrentUser = await addNewContact(values);
          onNewContactAdd(updatedCurrentUser);
        }
        onModalClose();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <p className={styles.formTitle}>{valuesToEdit.name ? 'Change' : 'Add'} a new Contact</p>
          <Field type="text" name="name" placeholder="Name" className={styles.name} />
          <ErrorMessage name="name" component="div" className={styles.error} />
          <Field type="phone" name="phone" placeholder="Phone" className={styles.phone} />
          <ErrorMessage name="phone" component="div" className={styles.error} />
          <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
            Add
          </button>
        </Form>
      )}
    </Formik>
  );
};
