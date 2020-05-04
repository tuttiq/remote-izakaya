import React from 'react';
import './TmpEstablishment.css';
import VideoChat from '../components/VideoChat';

const TmpEstablishment = (props) => {
  return (
    <div className="app">
      <header>
        <h1>Video Chat with Hooks</h1>
      </header>
      <main>
        <VideoChat props={props.history.location.state}/>
      </main>
    </div>
  );
};

export default TmpEstablishment;
