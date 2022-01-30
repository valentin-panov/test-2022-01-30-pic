import React, { ChangeEvent, memo, useEffect, useMemo, useState } from 'react';
import cn from 'clsx';
import { shallowEqual, useSelector } from 'react-redux';
import {
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import s from './Output.module.scss';
import { RootState } from '../../store';
import ZeroFound from '../ZeroFound/ZeroFound';
import { CardElement } from '../CardElement';
import { InPicture } from '../../interfaces/Interfaces';

export type Props = {
  className?: string;
};

export const Output = memo<Props>(({ className }) => {
  const imagesStore = useSelector((store: RootState) => store.pictures, shallowEqual);
  const { status, pictures } = imagesStore;
  const [page, setPage] = useState<number>(1);
  const [albumId, setAlbumId] = useState<number | string>('');
  const [pagesCount, setPagesCount] = useState<number>(0);
  const [filteredPicsArray, setFilteredPicsArray] = useState<InPicture[]>([]);
  const [slicedPicsArray, setSlicedPicsArray] = useState<InPicture[]>([]);

  const picsPerPage = 12;

  const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const albumsIdSet = new Set<number>();
  pictures.forEach((el) => albumsIdSet.add(el.albumId));
  const albumsIdArray = Array.from(albumsIdSet);

  const handleChangeSelectAlbumId = (event: SelectChangeEvent) => {
    setAlbumId(event.target.value as unknown as number);
  };
  useMemo(() => {
    setFilteredPicsArray(
      pictures.filter((el) => {
        if (albumId !== '') {
          return el.albumId === albumId;
        }
        return true;
      })
    );
  }, [albumId, pictures]);

  useMemo(() => {
    setSlicedPicsArray(filteredPicsArray.slice(page * picsPerPage - picsPerPage, page * picsPerPage));
    setPagesCount(Math.ceil(filteredPicsArray.length / picsPerPage));
    if (slicedPicsArray.length < 1 && page > 1) {
      setPage(pagesCount);
    }
  }, [filteredPicsArray, page, slicedPicsArray.length, pagesCount]);

  useEffect(() => {
    setPage(1);
  }, [albumId]);

  return (
    <>
      <div className={cn(s.root, className)}>
        {status === 'pending' && <CircularProgress />}
        {status === 'success' && pictures.length > 0 && (
          <>
            <div className={s.controls}>
              <div className={s.controlsExplanation}>Select pictures from album by ID</div>
              <FormControl className={s.formControl}>
                <InputLabel id="selectAlbumIdLabel">Album ID</InputLabel>
                <Select
                  labelId="selectAlbumId"
                  id="selectAlbumId"
                  value={`${albumId}`}
                  label="Album ID"
                  onChange={handleChangeSelectAlbumId}
                >
                  {albumsIdArray.map((el) => (
                    <MenuItem value={el} key={el}>
                      Album {el}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Pagination count={pagesCount} page={page} onChange={handlePageChange} />
            </div>
            <div className={s.cardsContainer}>
              {slicedPicsArray.map((el) => (
                <CardElement key={el.id} element={el} />
              ))}
            </div>
          </>
        )}
        {status === 'success' && pictures.length === 0 && <ZeroFound />}
      </div>
    </>
  );
});
