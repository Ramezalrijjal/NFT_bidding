import React from 'react';
import Banner from './Banner';
import Category from './Category';
import Service from './Service';
import Video from './Video';
import Live from './Live';
import Products from '../products/Products';

export default function Home() {
  return (
    <div>
      <Banner />
      <Category />
      <Service />
      {/* <Live/> */}
      <Video />
    </div>
  );
}
