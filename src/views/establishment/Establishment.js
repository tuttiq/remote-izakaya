import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFirestore } from 'react-redux-firebase'
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(40),
      height: theme.spacing(16),
    },
  },
  avatar: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Establishment(props) {
  const userID = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);

  const classes = useStyles();

  const firestore = useFirestore()
  const id = props.history.location.state.id
  const [izakaya, setIzakaya] = useState(null)

  useEffect(() => {
    firestore.get({ collection: "izakayas", doc: id }).then((izakaya) => {
      setIzakaya(izakaya.data())
    })
  }, []);

  function onTableClick(table) {
    props.history.push({
      pathname: `/videochat/`,
      state: {
        userID,
        table
      }
    })
  }

  return (
    <Container component="main">

    {izakaya &&
      <div>
        <h1>{izakaya.name}</h1>
        <h3>Your ID: {userID}</h3>
        <div className={classes.root}>
          {izakaya.tables.map(table => (
            <Card elevation={3} onClick={() => onTableClick(table)}> 
              <div className={classes.avatar}>
                { table.participants.map(participant => (<Avatar>H</Avatar>))} 
              </div>
            </Card>
          ))}
        </div>
      </div>
    }
    </Container>
  );
}

