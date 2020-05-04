import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from './Participant';

const Table = ({ tableName, token, handleLogout }) => {
  const [table, setTable] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = participant => {
      setParticipants(prevParticipants =>
        prevParticipants.filter(p => p !== participant)
      );
    };

    Video.connect(token, {
      name: tableName
    }).then(table => {
      setTable(table);
      table.on('participantConnected', participantConnected);
      table.on('participantDisconnected', participantDisconnected);
      table.participants.forEach(participantConnected);
    }).catch(err => console.log('err', err));

    return () => {
      setTable(currentTable => {
        if (currentTable && currentTable.localParticipant.state === 'connected') {
          currentTable.localParticipant.tracks.forEach(function(trackPublication) {
            trackPublication.track.stop();
          });
          currentTable.disconnect();
          return null;
        } else {
          return currentTable;
        }
      });
    };
  }, [tableName, token]);

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="table">
      <h2>Table: {tableName}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className="local-participant">
        {table ? (
          <Participant
            key={table.localParticipant.sid}
            participant={table.localParticipant}
          />
        ) : (
          ''
        )}
      </div>
      <h3>Remote Participants</h3>
      <div className="remote-participants">{remoteParticipants}</div>
    </div>
  );
};

export default Table;
