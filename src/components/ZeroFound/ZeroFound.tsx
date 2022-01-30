import React, { ReactElement } from 'react';
import s from './ZeroFound.module.scss';

export default function ZeroFound(): ReactElement {
  return (
    <section className={s.root}>
      <h2>Данных не получено.</h2>
      <p>Попробуйте в другой раз</p>
    </section>
  );
}
