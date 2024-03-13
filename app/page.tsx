'use client'

import React, { useState } from 'react';


interface User {
  name: { title: string; first: string; last: string };

  email: string;
  picture: { large: string };
  location: {
    city: string;
    state: string;
    country: string;
  };
  dob: {
    age: number;
  };
}

const RandomUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showLocation, setShowLocation] = useState<boolean>(false); // Ny state för att kontrollera visning av platsinformation


  const fetchRandomUser = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('https://randomuser.me/api/');
      if (!response.ok) throw new Error('response was not ok');
      const data = await response.json();
      setUser(data.results[0]);
    } catch (error) {
      setError('Failed to load user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const toggleLocation = () => setShowLocation(!showLocation); // Funktion för att växla visning av platsinformation


  return (
    <main>
      <div className='wrapper'>
    <h1 className='header-wrap'>Random users</h1>
</div>
      <button className='button' onClick={fetchRandomUser}>
      <div className='button-top'>Generate user</div>
  <div className='button-bottom'></div>
  <div className='button-base'></div>
      </button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {user && (
        <div className='card'>
  <img src={user.picture.large} alt="profile photo" />
          <h2 className='card-title'>{`${user.name.title} ${user.name.first} ${user.name.last}`}</h2>

          <p className='card-subtitle'>Age: {user.dob.age}</p>

          <p className='card-subtitle'>Email: {user.email}</p>
          <hr className='card-divider'></hr>
          <div className='card-footer'>
            <div>
        <p className='card-price'>My location</p>
        </div>

          {showLocation && <div><p>    {`${user.location.city}, ${user.location.state}, ${user.location.country}`}</p></div>}
            <button className='card-btn' onClick={toggleLocation}>
              {/* Svg symbol för location */}
            <svg fill="#000000" height="30px" width="20px" viewBox="0 0 368.666 368.666">
    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      <g id="XMLID_2_">
        <g>
          <g>
            <path d="M184.333,0C102.01,0,35.036,66.974,35.036,149.297c0,33.969,11.132,65.96,32.193,92.515 c27.27,34.383,106.572,116.021,109.934,119.479l7.169,7.375l7.17-7.374c3.364-3.46,82.69-85.116,109.964-119.51 c21.042-26.534,32.164-58.514,32.164-92.485C333.63,66.974,266.656,0,184.333,0z M285.795,229.355 c-21.956,27.687-80.92,89.278-101.462,110.581c-20.54-21.302-79.483-82.875-101.434-110.552 c-18.228-22.984-27.863-50.677-27.863-80.087C55.036,78.002,113.038,20,184.333,20c71.294,0,129.297,58.002,129.296,129.297 C313.629,178.709,304.004,206.393,285.795,229.355z"></path>
            <path d="M184.333,59.265c-48.73,0-88.374,39.644-88.374,88.374c0,48.73,39.645,88.374,88.374,88.374s88.374-39.645,88.374-88.374 S233.063,59.265,184.333,59.265z M184.333,216.013c-37.702,0-68.374-30.673-68.374-68.374c0-37.702,30.673-68.374,68.374-68.374 s68.373,30.673,68.374,68.374C252.707,185.341,222.035,216.013,184.333,216.013z"></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
              </button> {/* Knapp för att visa/dölja platsinformation */}
</div>
        </div>
      )}

    </main>
  );
};

export default RandomUser;
