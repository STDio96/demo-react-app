import type React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import DetailedPostCard from '../../components/DetailedPostCard';

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const { id: postId } = useParams<{ id: string }>();

  if (!postId) {
    navigate('/');
  }

  return (
    <div>
      <button
        style={{
          backgroundColor: '#f44336',
          color: '#fff',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'background-color 0.3s ease',
          marginBottom: '15px',
        }}
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        &larr; Back
      </button>
      <DetailedPostCard id={postId as string} />
    </div>
  );
};

export default Detail;
