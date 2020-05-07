import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Button } from '@material-ui/core';
import Table from '../../components/Table';
import { db } from '../../index'

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
  const id = props.history.location.pathname.split('/')[2]
  const [izakaya, setIzakaya] = useState(null)
  const docRef = db.collection("izakayas").doc(id);

  useEffect(() => {
    docRef.get().then(function(doc) {
      console.log("Get all izakaya on Mount: ", doc.data());
      doc.exists && setIzakaya(doc.data())
    })

    docRef.onSnapshot(function(doc) {
        console.log("Sync izakaya: ", doc.data());
        setIzakaya(doc.data())
    });
   }, []);

  function addTable() {
    var tables = izakaya.tables ? izakaya.tables : []
    tables.push({
      id: Math.random()
    })
    docRef.update({
      tables
    });
  }

  return (
    <Container component="main">
      {izakaya &&
        <div>
          <h1>{izakaya.name}</h1>
          <div className={classes.root}>
            {izakaya.tables && izakaya.tables.map((table, index) => (
              <Table key={table.id} tableName={`Table ${index + 1}`} participants={[]} {...props} />
            ))}
          </div>
        </div>
      }

      <Button style={{marginTop: '1rem'}}variant="contained" color="secondary" onClick={addTable}>Add Table</Button>
    </Container>
  );
}

