import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button } from '@material-ui/core';
import Table from '../../components/Table';
import Avatars from '@dicebear/avatars';
import sprites from '@dicebear/avatars-human-sprites';
import { db } from '../../index';

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
}));

export default function Establishment(props) {
  const classes = useStyles();
  const izakayaId = props.history.location.pathname.split('/')[2]
  const [izakaya, setIzakaya] = useState(null)
  const [tables, setTables] = useState([])
  const [userId, setUserId] = useState([])
  const [avatar, setAvatar] = useState(null)
  const docRef = db.collection("izakayas").doc(izakayaId);

  useEffect(() => {
    // Set a random user ID 
    const userId = db.collection("users").doc().id
    setUserId(userId)

    // Generate an avatar using the user ID 
    const options = {base64: true, width: 80, height: 80};
    const avatar = new Avatars(sprites, options);
    const svg = avatar.create(userId);
    setAvatar(svg)

    // Get the Izakaya record using the Izakaya ID from the URL
    docRef.get().then(function(doc) {
      console.log("Get all izakaya on Mount: ", doc.data());
      doc.exists && setIzakaya(doc.data())
    })

    // Sync if there is any update made in any of tables associated with the izakaya
    db.collection("tables").where('izakayaId', '==', izakayaId).onSnapshot(function(querySnapshot) {
        var tables = [];

        querySnapshot.forEach(function(doc) {
          tables.push(doc.data())
        })
        console.log("Sync tables: ", tables);
        setTables(tables)
    });
   }, []);

  function addTable() {
    var uid = db.collection("tables").doc().id

    db.collection("tables").add({uid, izakayaId});
  }

  return (
    <Container component="main">
      {izakaya &&
        <div>
          <h1>{izakaya.name}</h1>
          <img style={{paddingBottom: '0.5rem'}} src={avatar}></img>
          <h5 style={{paddingBottom: '1rem'}}>User random ID: {userId}</h5>
          <div className={classes.root}>
            {tables && tables.map((table, index) => (
              <Table 
                key={table.uid} 
                tableId={table.uid} 
                userId={userId} 
                tableName={`Table ${index + 1}`} 
                table={table} 
                {...props} 
              />
            ))}
          </div>
        </div>
      }

      <Button 
        style={{marginTop: '1rem'}}
        variant="contained" 
        color="secondary" 
        onClick={addTable}
      >
        Add Table
      </Button>
    </Container>
  );
}

