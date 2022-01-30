import React, { memo } from 'react';
import cn from 'clsx';
import s from './Main.module.scss';

export type Props = {
  className?: string;
  children?: React.ReactChildren | React.ReactNode;
};

export const Main = memo<Props>(({ className, children }) => <main className={cn(s.root, className)}>{children}</main>);
