import React, { memo } from 'react';
import cn from 'clsx';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import s from './Header.module.scss';
import { picturesFetchData } from '../../reducers/pictures';

export type Props = {
  className?: string;
};

export const Header = memo<Props>(({ className }) => {
  const dispatch = useDispatch();

  const getPictures = () => {
    dispatch(picturesFetchData());
  };

  return (
    <header className={cn(s.root, className)}>
      <Button variant="contained" onClick={getPictures}>
        GET PICTURES
      </Button>
    </header>
  );
});
