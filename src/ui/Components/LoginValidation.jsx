
  
  const email_pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
  
  const validation = (values) => {
    const error = {};
  
    if (values.email === "") {
      error.email = 'Email é obrigatório';
    } else if (!email_pattern.test(values.email)) {
      error.email = 'Email inválido';
    }
  
    if (values.password === "") {
      error.password = 'Senha é obrigatória';
    } else if (!password_pattern.test(values.password)) {
      error.password = 'Senha inválida';
    }
  
    return error;
  };
  
  export default validation;