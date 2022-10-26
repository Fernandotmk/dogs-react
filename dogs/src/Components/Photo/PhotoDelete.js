import React from 'react';
import { PHOTO_DELETE } from '../../api';
import useFetch from '../../Hooks/useFetch';
import styles from './PhotoDelete.module.css';

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();

  async function handleClick() {
    const confirm = window.confirm('Tem certeza?');
    if (confirm) {
      const token = window.localStorage.getItem('token');
      const { url, options } = PHOTO_DELETE(id, token);
      const { response } = await request(url, options);
      if (response.ok) window.location.reload();
    }
  }

  return (
    <>
      {loading ? (
        <button ClassName={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button onClick={handleClick} ClassName={styles.delete}>
          Deletar
        </button>
      )}
    </>
  );
};

export default PhotoDelete;
