import React, { useState }  from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useFirestore } from 'react-redux-firebase'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function CreateEstablishment(props) {
  const classes = useStyles();
  const [inputValue, onInputChange] = useState(null)
  const firestore = useFirestore()


  function onCreateClick(e) {
    e.preventDefault()

    return firestore.add('izakayas', {
      name: inputValue,
      owner: 'Anonymous',
      createdAt: firestore.FieldValue.serverTimestamp(),
    }).then((izakaya) => {
      const id = izakaya.id
      props.history.push({
        pathname: `/establishment/${id}`,
        state: {
          id: id
        }
      })
    })
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Remote Izakaya
        </Typography>
        <form className={classes.form} onSubmit={(e) => onCreateClick(e)} noValidate>
          <TextField
            onChange={(e) => onInputChange(e.target.value)}
            value={inputValue || ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Izakaya
          </Button>
        </form>
      </div>
    </Container>
  );
}
