import React, { ChangeEvent, memo, useState } from 'react';
import cn from 'clsx';
import { shallowEqual, useSelector } from 'react-redux';
import { CircularProgress, Pagination } from '@mui/material';
import s from './Output.module.scss';
import { RootState } from '../../store';
import { Album } from '../Album';
import ZeroFound from '../ZeroFound/ZeroFound';

export type Props = {
  className?: string;
};

export const Output = memo<Props>(({ className }) => {
  const imagesStore = useSelector((store: RootState) => store.pictures, shallowEqual);
  const { status, albums } = imagesStore;
  const [page, setPage] = useState<number>(1);

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <div className={cn(s.root, className)}>
        {status === 'pending' && <CircularProgress />}
        {status === 'success' && albums.length > 0 && (
          <>
            <Pagination count={albums.length} page={page} onChange={handlePageChange} />
            <div className={s.cardsContainer}>
              {albums.map((el) => {
                if (el.albumId === page) {
                  return <Album key={el.albumId} data={el} />;
                }
                return null;
              })}
            </div>
          </>
        )}
        {status === 'success' && albums.length === 0 && <ZeroFound />}
      </div>
    </>
  );
});
