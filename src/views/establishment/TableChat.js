import './TableChat.css';
import React, { useState, useEffect } from 'react';
import Video from 'twilio-video';
import Participant from '../../components/Participant';
import Container from '@material-ui/core/Container';

const TableChat = (props) => {
  const id = props.history.location.state.id;
  const tableName = props.history.location.state.tableName;
  const token = props.history.location.state.token;

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
    });

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

  const handleLogout = event => {
    // redirect back to Establishment
    props.history.push({
      pathname: `/establishment/${id}`,
      state: {
        id: id,
      }
    })
  };

  return (
    <Container component="main">
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
    </Container>
  );
};

export default TableChat;
