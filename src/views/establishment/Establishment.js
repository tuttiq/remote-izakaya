import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFirestore } from 'react-redux-firebase'
import Table from '../../components/Table';

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

  const firestore = useFirestore()
  const id = props.history.location.state.id
  const [izakaya, setIzakaya] = useState(null)

  useEffect(() => {
    firestore.collection("izakayas").doc(id).onSnapshot((izakaya) =>{
      setIzakaya(izakaya.data())
    })
  }, [firestore, id]);

  return (
    <Container component="main">
      <div></div>
      { izakaya &&
        <div>
          <h1>{izakaya.name}</h1>
          <div className={classes.root}>
            {izakaya.tables.map(table =>(
              <Table key={table.name} tableName={table.name} participants={table.participants} {...props} />
            ))}
          </div>
        </div>
      }
    </Container>
  );
}

