import React from 'react';
import FeedPhotos from './FeedPhotos';
import FeedModal from './FeedModal';
import PropTypes from 'prop-types';

//dados do user vem do user.js através do usercontext
// que fornece os dados de data.id
const Feed = ({ user }) => {
  const [modalPhoto, setModalPhoto] = React.useState(null);
  //conteudo do modalPhoto vem do FeedPhotosItem no handleClick
  //que passa como propriedade por FeedPhotos.js e depois vem pro Feed.js
  const [pages, setPages] = React.useState([1]);
  const [infinite, setInfinite] = React.useState(true);
  //o setInfinite é tratado dentro do FeedPhotos.js

  React.useEffect(() => {
    let wait = false;
    function infiniteScroll() {
      if (infinite) {
        //pegando a posição atual do scroll
        const scroll = window.scrollY;
        //pegando altura da pagina
        const height = document.body.offsetHeight - window.innerHeight;
        //quando chegar a 75% da altura da pagina ele ativa
        //a funcao e adiciona uma nova pagina abaixo
        //funcao executa desde que o wait ainda seja falso
        if (scroll > height * 0.75 && !wait) {
          setPages((pages) => [...pages, pages.length + 1]);
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 500);
        }
      }
    }

    window.addEventListener('wheel', infiniteScroll);
    window.addEventListener('scroll', infiniteScroll);
    return () => {
      window.removeEventListener('wheel', infiniteScroll);
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [infinite]);
  return (
    <div>
      {modalPhoto && (
        <FeedModal photo={modalPhoto} setModalPhoto={setModalPhoto} />
      )}
      {pages.map((page) => (
        <FeedPhotos
          key={page}
          user={user}
          page={page}
          setModalPhoto={setModalPhoto}
          setInfinite={setInfinite}
        />
      ))}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
};

Feed.propTypes = {
  user: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired,
  ]),
};

export default Feed;
