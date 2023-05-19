import type React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './PostCard.module.css';

interface PostData {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface PostCardProps {
  data: PostData;
}

const PostCard: React.FC<PostCardProps> = ({ data }) => {
  const navigate = useNavigate();
  const { id, title, body } = data;

  const handleRedirectToDetailPage = (): void => {
    navigate(`/detail/${id}`);
  };

  return (
    <div
      className={styles.wrapper}
      onClick={handleRedirectToDetailPage}
      onKeyUp={handleRedirectToDetailPage}
      role="presentation"
    >
      <div className={styles.cardHeader}>
        <h2>{title}</h2>
      </div>
      <div className={styles.cardBody}>
        {body}
      </div>
    </div>
  );
};

export default PostCard;
