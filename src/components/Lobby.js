import React from 'react';

const Lobby = ({
  username,
  handleUsernameChange,
  tableName,
  handleTableNameChange,
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a table</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="table">Table name:</label>
        <input
          type="text"
          id="table"
          value={tableName}
          onChange={handleTableNameChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Lobby;
