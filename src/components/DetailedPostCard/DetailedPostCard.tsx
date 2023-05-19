import type React from 'react';
import { useEffect, useState } from 'react';
import { POST_DETAILS_ENDPOINT_URL } from '../../constants';

import Loader from '../Loader';

import styles from './DetailedPostCard.module.css';

interface PostData {
  title: string;
  body: string;
  tags: string[];
  reactions: number;
}

const DetailedPostCard: React.FC<{ id: string | undefined }> = ({ id }) => {
  const initialState: PostData = {
    title: 'Sample Title',
    body: 'Sample Body',
    tags: [],
    reactions: 0,
  };
  const [postData, setPostData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { title, body, tags, reactions }: PostData = postData;

  useEffect(() => {
    const abortController = new AbortController();
    let isCurrent = true;

    const loadPostDetails = async (): Promise<any> => {
      setIsLoading(true);
      try {
        const response = await fetch(`${POST_DETAILS_ENDPOINT_URL}${id ?? 0}`, {
          signal: abortController.signal,
        });
        if (response.ok) {
          const data = await response.json();
          if (isCurrent) {
            setPostData(data);
            setIsError(false);
          }
        }
      } catch (error) {
        console.error(error);
        if (isCurrent) {
          setIsError(true);
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false);
        }
      }
    };

    void loadPostDetails();

    return () => {
      isCurrent = false;
      abortController.abort();
    };
  }, [id]);

  if (isError) {
    return <div>Something went wrong while loading post data!</div>;
  }

  return (
    <div className={styles.post}>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.cardHeader}>
            <h2>{title}</h2>
          </div>
          <div className={styles.cardBody}>
            <p>{body}</p>
            <div className={styles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.cardFooter}>
            <div className={styles.reactions}>{reactions} reactions</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailedPostCard;
