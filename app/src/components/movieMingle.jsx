import React, { useState } from 'react';

const MingleCard = ({ title, description }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '16px', margin: '16px', borderRadius: '8px' }}>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

const MingleList = ({ mingles }) => {
  return (
    <div>
      {mingles.map((mingle, index) => (
        <MingleCard key={index} {...mingle} />
      ))}
    </div>
  );
};

const MingleApp = () => {
  const [mingles, setMingles] = useState([
    { title: 'Mingle 1', description: 'Description for Mingle 1' },
    { title: 'Mingle 2', description: 'Description for Mingle 2' },
   
  ]);

  const handleCreateMingle = () => {
    const newMingle = {
      title: `New Mingle ${mingles.length + 1}`,
      description: 'Description for the new mingle',
    };
    setMingles([...mingles, newMingle]);
  };

  return (
    <div>
      <h1>Mingle App</h1>
      <button onClick={handleCreateMingle}>Create New Mingle</button>
      <MingleList mingles={mingles} />
    </div>
  );
};

export default MingleApp;