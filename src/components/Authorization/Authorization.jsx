import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';

import { validateEmailAndPassword, login } from '../../utils/utils';

import styles from './Authorization.module.css';

export const Authorization = ({ onSuccessAuthorization }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrap}>
      <div className={styles.body}>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.subTitle}>Please enter your Login and your Password</p>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={validateEmailAndPassword}
          onSubmit={async (values, { setSubmitting }) => {
            await login(values, (currentUser) => {
              onSuccessAuthorization(currentUser);
              navigate('/contacts');
            });
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.form}>
              <Field type="email" name="email" placeholder="Email" className={styles.email} />
              <ErrorMessage name="email" component="div" className={styles.error} />
              <Field type="password" name="password" placeholder="Password" className={styles.password} />
              <ErrorMessage name="password" component="div" className={styles.error} />
              <button type="submit" disabled={isSubmitting} className={styles.submitBtn}>
                Login
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
