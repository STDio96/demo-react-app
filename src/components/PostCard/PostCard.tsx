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
  const { title, body } = data;

  const handleRedirectToDetailPage = (): void => {
    navigate('/detail');
  };

  return (
    <div
      className={styles.wrapper}
      onClick={handleRedirectToDetailPage}
      onKeyUp={handleRedirectToDetailPage}
      role="presentation"
    >
      <div className={styles.title}>{title}</div>
      <div className={styles.body}>{body}</div>
    </div>
  );
};

export default PostCard;
