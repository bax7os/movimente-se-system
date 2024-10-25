const email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

const validation = (values) => {
  const error = {};

  if (values.nome === "") {
    error.nome = 'Nome é obrigatório';
  } else {
    error.nome = '';
  }

  if (values.email === "") {
    error.email = 'Email é obrigatório';
  } else {
    error.email = '';
  }

  if (values.password === "") {
    error.password = 'Senha é obrigatória';
  } else {
    error.password = '';
  }

  return error;
};

export default validation;