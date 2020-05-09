import React from 'react';
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../index';
import firebase from 'firebase/app';
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-human-sprites';

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
  const id = props.tableId;

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
    // add the current user as a participant to the table record clicked on
    db.collection("tables").where('uid', '==', props.table.uid)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        db.collection("tables").doc(doc.id).update({
          participants: firebase.firestore.FieldValue.arrayUnion(props.userId)
        })
      });
    })
    
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

  const renderAvatats = () => {
    const options = {base64: true, width: 40, height: 40};
    const avatar = new Avatars(sprites, options);
   
    return props.table.participants.map(p => {
      const svg = avatar.create(p);
        return  <img key={p} style={{paddingBottom: '0.5rem'}} src={svg}></img>
    })
  }

  return (
    <Card elevation={3} onClick={joinTable}>
      <p>{props.tableName}</p>
      <div className={classes.avatar}>
        {props.table.participants && renderAvatats()}
      </div>
    </Card>
  );
}
