import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Grid,
  Button,
  CircularProgress,
  Snackbar
} from "@material-ui/core";
import esLocale from "date-fns/locale/es";
import MuiAlert from '@material-ui/lab/Alert';
import api from "../api/api";
import UserInfo from './UserInfo'
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";



const UserForm = () => {  

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  const [nameState, setNameState] = useState("");
  const [lastNameState, setLastNameState] = useState("");
  const [birthdayState, setbirthdayState] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [disabledState, setDisabledState] = useState(false);
  const [loaderState, setLoaderState] = useState(null);
  const [userInfoState, setUserInfoState] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(()=>{
    birthdayChangeHandler(new Date())
  },[])

  const loader = <CircularProgress />;
  
  const clickhandler = () => {
    setDisabledState(true);
    setLoaderState(loader);
    console.log(lastNameState)
    if(nameState.split(" ").length <= 1 || lastNameState.split(" ").length <=1){      
      setOpen(true);  
      setDisabledState(false);
      setLoaderState(null);  
      return false;
    }    

    api
      .post("/birthday", {
        name: nameState + " " + lastNameState,
        birthDay: birthdayState,
      })
      .then((response) => {
        setDisabledState(false);
        setLoaderState(null);        
        setUserInfoState(<UserInfo data={response.data} date={birthdayState}/>)   
      })
      .catch((error) => {
        setDisabledState(false);
        setLoaderState(null);        
        console.log(error);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const nameChangeHandler = (name) => {
    setNameState(name);
  };

  const lastNameChangeHandler = (lastName) => {
    setLastNameState(lastName);
  };

  const birthdayChangeHandler = (birthday) => {
    const date = new Date(birthday);
    let month = "" + (date.getMonth() + 1);
    if (month.length <= 1) month = "0" + month;
    let day = ""+date.getDate();
    if(day.length <= 1) day = "0"+ day;
    let year = date.getFullYear();
    const fullDate = day + "-" + month + "-" + year;    

    setbirthdayState(fullDate);
    setCurrentDate(birthday);
  };

  const submitButton = (
    <Button
      disabled={disabledState}
      onClick={clickhandler}
      justify="center"
      item
      xs={4}
      variant="contained"
      color="primary"
    >
      Enviar
    </Button>
  );

  return (
    <React.Fragment>
      <Container>
        <form>
          <Grid container justify="center" spacing={3}>
            <Grid item justify="center" container alignContent="center" xs={12}>
              <h3>Servicio Cumpleaños</h3>
            </Grid>
            <Grid justify="center" container alignContent="center" item xs={4}>
              <TextField
                onBlur={(event) => nameChangeHandler(event.target.value)}
                id="standard-basic"
                label="Nombres"
              />
            </Grid>
            <Grid justify="center" container alignContent="center" item xs={4}>
              <TextField
                onBlur={(event) => lastNameChangeHandler(event.target.value)}
                id="standard-basic2"
                label="Apellidos"
              />
            </Grid>
            <Grid justify="center" container alignContent="center" item xs={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
                <KeyboardDatePicker                  
                  variant="modal"
                  invalidDateMessage = "formato de fecha inválido"
                  format="dd-MM-yyyy"
                  cancelLabel= "cancelar"
                  margin="normal"
                  id="date-picker-inline"
                  value={currentDate}
                  onChange={birthdayChangeHandler}
                  KeyboardButtonProps={{
                    "aria-label": "seleccionar fecha",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid
              container
              item
              xs={12}
              md={12}
              lg={12}
              justify="center"
              alignItems="center"
            >
              {loaderState}
            </Grid>
            <Grid>
              {submitButton}
            </Grid>
          </Grid>
        </form>   
        <Grid container justify="center" spacing={3}>
        <Grid
              container
              item
              xs={12}
              md={12}
              lg={12}
              justify="center"
              alignItems="center"
            >
              {userInfoState}
            </Grid>
        </Grid>     
      </Container>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="error">
               Error: Nombre o apellido incompleto
             </Alert>
              </Snackbar>      
    </React.Fragment>
  );
};

export default UserForm;
