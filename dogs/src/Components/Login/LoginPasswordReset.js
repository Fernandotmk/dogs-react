import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import useFetch from '../../Hooks/useFetch';
import { PASSWORD_RESET } from '../../api';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

const LoginPasswordReset = () => {
  const [login, setLogin] = React.useState();
  const [key, setKey] = React.useState();
  const password = useForm();
  const { error, loading, request } = useFetch();
  //para utilizar a navegação de forma programatica
  //utilizamos o useNavigate, assim apos resetar a senha
  //o usuario será direcionado a área de login
  const navigate = useNavigate();

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const key = params.get('key');
    const login = params.get('login');
    //as chaves vem da url , exemplo www.go.com.br/?key=83218?login=teste
    if (key) setKey(key);
    if (login) setLogin(login);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.validate()) {
      const { url, options } = PASSWORD_RESET({
        login,
        key,
        //password vem do UseForm
        password: password.value,
      });
      const { response } = await request(url, options);
      if (response.ok) navigate('/login');
    }
  }

  //foi desestruturado o password {...password} que vem do useFetch
  //para deixar o formulario reativo
  return (
    <section className='animeLeft'>
      <Head title='Resete a Senha' />
      <h1 className='title'>Resete a Senha</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label='Nova senha'
          type='password'
          name='password'
          {...password}
        />
        {loading ? (
          <Button disabled>Resetando...</Button>
        ) : (
          <Button>Resetar</Button>
        )}
      </form>
      <Error error={error} />
    </section>
  );
};

export default LoginPasswordReset;
