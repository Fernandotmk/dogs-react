import React from 'react';
import styles from './FeedModal.module.css';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import { PHOTO_GET } from '../../api';
import PhotoContent from '../Photo/PhotoContent';

const FeedModal = ({ photo, setModalPhoto}) => {
  const { data, loading, error, request } = useFetch();

  React.useEffect(() => {
    //photo.id veio do FeedPhotosItem.js apenas
    //para fornecer o numero do ID para que então 
    //seja feito um fetch especifico no ID
    //para retornar a foto para o PhotoContent
    //setando todas informações dentro de data do useFetch
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
  }, [photo, request]);

  function handleOutsideClick(event){
    if(event.target === event.currentTarget) setModalPhoto(null)
  };

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading error={error} />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;
