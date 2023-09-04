import PropTypes from 'prop-types';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';
import {
  Main,
  PhonebookForm,
  PhonebookInput,
  Button,
  Error,
} from './Phonebook.styled';

export default function Phonebook({ onSubmit }) {
  const schema = yup.object().shape({
    name: yup
      .string()
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d\'Artagnan'
      )
      .required('This field cannot be empty'),
    number: yup
      .string()
      .matches(
        /\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}/,
        'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
      )
      .min(6, 'Phone number is too short')
      .max(18, 'Phone number is too long')
      .required('This field cannot be empty'),
  });

  const handleSubmit = (values, { resetForm }) => {
    onSubmit(values);
    resetForm();
  };

  return (
    <>
      <Formik
        initialValues={{ name: '', number: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Main>
          <PhonebookForm htmlFor="name">
            Name:
            <PhonebookInput
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            />
            <ErrorMessage
              name="name"
              render={message => <Error>{message}</Error>}
            />
          </PhonebookForm>
          <PhonebookForm htmlFor="number">
            Number:
            <PhonebookInput
               type="tel"
                name="number"
                pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            />
            <ErrorMessage
              render={message => <Error>{message}</Error>}
              name="number"
            />
          </PhonebookForm>
          <Button type="submit">Add contact</Button>
        </Main>
      </Formik>
    </>
  );
}

Phonebook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
