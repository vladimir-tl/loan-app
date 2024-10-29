import {RefObject} from 'react';

export const scrollToElement = (ref: RefObject<HTMLElement>) => {
  return () => {
    ref.current?.scrollIntoView({behavior: 'smooth'});
  };
};
