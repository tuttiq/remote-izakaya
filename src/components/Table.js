import React from 'react';
import Card from '@material-ui/core/Card'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Table(props) {
  const classes = useStyles();
  const tableName = props.tableName;
  const id = props.history.location.state.id;

  // const handleUsernameChange = useCallback(event => {
  //   setUsername(event.target.value);
  // }, []);

  const generateToken = async event => {
    event.preventDefault();
    const data = await fetch('/video/token', {
      method: 'POST',
      body: JSON.stringify({
        identity: "username" + Math.random(),
        table: tableName
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
    redirectToTableChat(data.token);
  }

  const joinTable = event => {
    //TODO: show an alert to get a name?
    generateToken(event);
  }

  const redirectToTableChat = (token) => {
    // change path to TableChat
    props.history.push({
      pathname: `/table/${tableName}`,
      state: {
        id: id,
        tableName: tableName,
        token: token
      }
    })
  }

  return (
    <Card elevation={3} onClick={joinTable}>
      <div className={classes.avatar}>
        { props.participants.map(participant => (<Avatar key={tableName+participant.name} >H</Avatar>))}
      </div>
    </Card>
  );
}
