import React, { memo, ReactElement } from 'react';
import cn from 'clsx';
import s from './Layout.module.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';

export type Props = {
  className?: string;
  children: React.ReactChildren | React.ReactNode;
};

export const Layout = memo(
  ({ className, children }: Props): ReactElement => (
    <>
      <div className={cn(s.root, className)}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  )
);
