import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import styles from './NewContactForm.module.css';
import { addNewContact } from '../../utils/utils';

export const NewContactForm = ({ onNewContactAdd, onModalClose }) => {
  return (
    <Formik
      initialValues={{ name: '', phone: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        const updatedCurrentUser = await addNewContact(values);
        onNewContactAdd(updatedCurrentUser);
        onModalClose();
      }}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <p className={styles.formTitle}>Add a new Contact</p>
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
