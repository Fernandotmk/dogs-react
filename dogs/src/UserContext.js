import React from 'react';
import { TOKEN_POST, TOKEN_VALIDATE_POST, USER_GET } from './api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [data, setData] = React.useState(null);
  const [login, setLogin] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();

  //foi utilizado como react useCallBack pois essa função
  //é uma dependencia do React Use effect abaixo
  const userLogout = React.useCallback(
    async function () {
      setData(null);
      setError(null);
      setLoading(false);
      setLogin(false);
      window.localStorage.removeItem('token');
      navigate('/login');
    },
    [navigate],
  );

  async function getUser(token) {
    const { url, options } = USER_GET(token);
    const response = await fetch(url, options);
    const json = await response.json();
    setData(json);
    setLogin(true);
  }

  async function userLogin(username, password) {
    try {
      setError(null);
      setLoading(true);
      // url e options estão dentro do token_post (em api.js)
      //esta desestruturado
      const { url, options } = TOKEN_POST({ username, password });
      // agora pega os dados vindos de api.js do TOKEN_POST
      const tokenRes = await fetch(url, options);
      //caso nao esteja ok o tokenRes já joga pro catch
      if (!tokenRes.ok) throw new Error(`Error: ${tokenRes.statusText}`);
      const { token } = await tokenRes.json();
      //insere o token no localStorage
      window.localStorage.setItem('token', token);
      await getUser(token);
      //com a funcao nativa do react router dom apos login o usuario vai até a conta
      navigate('/conta');
    } catch (err) {
      setError(err.message);
      setLogin(false);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    async function autoLogin() {
      const token = window.localStorage.getItem('token');
      //se tiver o token de login no localStorage
      if (token) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = TOKEN_VALIDATE_POST(token);
          const response = await fetch(url, options);
          //se o const response nao for ok ele executa e já joga pro catch
          if (!response.ok) throw new Error('Token inválido');
          await getUser(token);
        } catch (err) {
          //caso de um erro ele reseta todas as const
          userLogout();
        } finally {
          setLoading(false);
        }
      } else {
        setLogin(false);
      }
    }
    autoLogin();
    //qualquer funcao ou estado criado do lado de fora
    //tem que ser passado como dependencia
  }, [userLogout]);

  return (
    <UserContext.Provider
      value={{ userLogin, userLogout, data, error, loading, login }}
    >
      {children}
    </UserContext.Provider>
  );
};
