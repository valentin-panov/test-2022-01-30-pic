import React, { memo } from 'react';
import cn from 'clsx';
import s from './Footer.module.scss';

export type Props = {
  className?: string;
};

export const Footer = memo<Props>(({ className }) => (
  <footer className={cn(s.root, className)}>
    <div>Hi, IT Recruiting Agency!</div>
  </footer>
));
