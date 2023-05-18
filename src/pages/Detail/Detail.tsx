import type React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DetailedPostCard from '../../components/DetailedPostCard/DetailedPostCard';

const Detail: React.FC = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id: postId } = params;

  if (!postId) {
    navigate('/');
  }

  return (
    <div>
      <button
        style={{
          padding: '10px 15px',
          backgroundColor: '#f2f2f2',
          border: '1px solid #ccc',
          borderRadius: '5px',
          color: '#333',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '15px',
        }}
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        &larr; Back
      </button>
      <DetailedPostCard id={postId} />
    </div>
  );
};

export default Detail;
