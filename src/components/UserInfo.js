import React, {useState, useEffect} from 'react';
import {Grid} from "@material-ui/core";

const UserInfo = (props)=>{

const [congratState, setCongratState] = useState(null)
const [nameState, setNameState] = useState(null)
const [lastNameState, setLastNameState] = useState(null)
const [dateState, setDateState] = useState(null)

    useEffect(()=>{
        let [name, lastName] = props.data.name.split(" ")
        setNameState(name);
        setLastNameState(lastName)

        if(props.data.daysToBirthday === 0){
            setCongratState(<React.Fragment>
                <p>Felicitaciones en tu dia</p>
                <p>{props.data.poem}</p>
            </React.Fragment>)
        }

        let [day, month, year] = props.date.split("-")
        setDateState(day+"/"+month+"/"+year.substr(2))
    },[])

    return(
        <React.Fragment>
            <Grid container justify="center" spacing={1}>
                <Grid item justify="center" container alignContent="center" xs={12}>
                    <p>Nombre : {nameState}</p>
                </Grid>
                <Grid item justify="center" container alignContent="center" xs={12}>
                    <p>Apellido : {lastNameState}</p>
                </Grid>
                <Grid item justify="center" container alignContent="center" xs={12}>
                    <p>Fecha : {dateState}</p>
                </Grid>
                <Grid item justify="center" container alignContent="center" xs={12}>
                    <p>Edad : {props.data.age}</p>
                </Grid>
                <Grid item justify="center" container alignContent="center" xs={12}>
                    <p>Días para proximo Cumpleaños : {props.data.daysToBirthday}</p>
                </Grid>
                <Grid item justify="center" container alignContent="center" xs={12}>
                    {congratState}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default UserInfo