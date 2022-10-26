import React from 'react';
import { UserContext } from '../../UserContext';
import PhotoCommentsForm from './PhotoCommentsForm';
import styles from './PhotoComments.module.css';


//const PhotoComments = (props) => {
// poderia começar com props e acessar o props.id ou props.comments
// esses vieram de PhotoContent
const PhotoComments = ({ id, comments, single }) => {
  const [comment, setComments] = React.useState(() => comments);
  const commentsSection = React.useRef(null);
  const { login } = React.useContext(UserContext);

  React.useEffect(() => {
    //o Scroll top da o scroll no total de valor declarado
    //nesse caso foi colocado o total do valor atual atraves do scrollHeight
    // com isso ao abrir uma foto o scroll desce automaticamente
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
    //vai ocorrer sempre que tiver um novo comentário
  }, [comments]);

  return (
    <>
      <ul ref={commentsSection} className={`${styles.comments} ${single ? styles.single : ''}`}>
        {comment.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>
      {login && <PhotoCommentsForm single={single} id={id} setComments={setComments} />}
    </>
  );
};

export default PhotoComments;
