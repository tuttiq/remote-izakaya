import React, { useEffect, useState, useCallback } from 'react';
import Lobby from './Lobby';
import Table from './Table';

const VideoChat = (props) => {
  const [username, setUsername] = useState('');
  const [tableName, setTableName] = useState('');
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleTableNameChange = useCallback(event => {
    setTableName(event.target.value);
  }, []);

  useEffect(() => {
    if (props) {
      setUsername(props.props.userID)
      setTableName(props.props.table.chatroom_url)

      handleSubmit()
    }
  }, []);

  const handleSubmit = useCallback(
    async event => {
      //event.preventDefault();
      const data = await fetch('/video/token', {
        method: 'POST',
        body: JSON.stringify({
          identity: username,
          table: tableName
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
      console.log('genarated token', data.token)
      setToken(data.token);
    },
    [tableName, username]
  );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Table tableName={tableName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        tableName={tableName}
        handleUsernameChange={handleUsernameChange}
        handleTableNameChange={handleTableNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat;
