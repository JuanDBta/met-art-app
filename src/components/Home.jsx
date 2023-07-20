import React from 'react';

const Home = () => {
  const info = {
    line1: 'Math magicians is a website for all fans of mathematics. It is a Single Page App (SPA) that allows users to make simple calculations and read a random art-related quote.',
    line2: 'You can find three sections in our webpage.  This is our welcome section.  In Calculator section you will be able to make simple calculations and in the Quote section you can find an inspirational quote to share some wisdom with you.  I hope you enjoy our site!!!',
  };
  return (

    <div className="home">
      <h2>Welcome to our page!</h2>
      <p className="home-description">{info.line1}</p>
      <p className="home-description">{info.line2}</p>
    </div>
  );
};
export default Home;
