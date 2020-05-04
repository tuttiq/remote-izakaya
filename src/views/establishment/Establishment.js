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

  const classes = useStyles();

  const firestore = useFirestore()
  const id = props.history.location.state.id
  const [name, setName] =  useState(undefined)

  useEffect(() => {
    firestore.get({ collection: "izakayas", doc: id }).then((izakaya) => {
      setName(izakaya.data().name)
    })
  });

  return (
    <Container component="main">
      <h1>{name}</h1>
      <div className={classes.root}>
        <Card elevation={3}>
          <div className={classes.avatar}>
            <Avatar>H</Avatar>
            <Avatar>H</Avatar>
            <Avatar>H</Avatar>
            <Avatar>H</Avatar>
            <Avatar>H</Avatar>
            <Avatar>H</Avatar>
          </div>
        </Card>
        <Paper elevation={3} />
      </div>
    </Container>
  );
}

