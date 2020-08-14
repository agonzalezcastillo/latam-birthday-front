import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import esLocale from "date-fns/locale/es";
import api from "../api/api";
import UserInfo from './UserInfo'
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";



const UserForm = () => {  
  const [nameState, setNameState] = useState("");
  const [lastNameState, setLastNameState] = useState("");
  const [birthdayState, setbirthdayState] = useState("");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [disabledState, setDisabledState] = useState(false);
  const [loaderState, setLoaderState] = useState(null);
  const [userInfoState, setUserInfoState] = useState(null);

  useEffect(()=>{
    birthdayChangeHandler(new Date())
  },[])

  const loader = <CircularProgress />;
  
  const clickhandler = () => {
    setDisabledState(true);
    setLoaderState(loader);
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
    let day = date.getDate();
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
              Cumpleaños Service
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
    </React.Fragment>
  );
};

export default UserForm;
