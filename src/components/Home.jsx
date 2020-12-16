import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cn from '../assets/cn.jpg';

export default function Home() {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    const getJoke = async () => {
      const result = await axios.get('https://api.chucknorris.io/jokes/random');
      console.log(result);
      setJoke(result.data.value);
    };
    getJoke();
  }, []);
  return (
    <div>
      <h2>Gerenciamento Escolar</h2>
      <br></br>
      <h2>{joke}</h2>
      <img src={cn} alt="Chuck-Norris" width="380" />
    </div>
  );
}
