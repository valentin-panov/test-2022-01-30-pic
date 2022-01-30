import React, { memo } from 'react';
import cn from 'clsx';
import s from './Album.module.scss';
import { InAlbum } from '../../interfaces/Interfaces';
import { CardElement } from '../CardElement';

export type Props = {
  className?: string;
  data: InAlbum;
};

export const Album = memo<Props>(({ className, data }) => (
  <>
    <div className={cn(s.root, className)}>
      {data.pictures.map((el) => (
        <CardElement key={el.id} element={el} />
      ))}
    </div>
  </>
));
