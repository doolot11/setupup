import React, { useReducer, useState } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (prevSate,action)=>{
    if(action.type === 'USER_INPUT'){
       return {
       value: action.emailValue, isValid: action.emailValue.includes('@')
       }
    } 
     if(action.type === 'INPUT_BLUR'){
       return {
         value: prevSate.value,
         isValid: prevSate.value.includes('@')
       }
     }
     return{
       value: "",
       isValid: false
     }
}
const passwordReduce = (prevSate,action)=>{
    if(action.type === 'USER_PASS'){
      return{
        pass: action.passValue, ispass:action.passValue.trim().length >6
      }
    }
    if(action.type === 'INPUT_BLUR1'){
      return{
        pass: prevSate.pass,
        ispass: prevSate.pass.trim().length > 6
      }
    }
     return{
       pass: "",
       ispass: false
     }
    }


const Login = (props) => {
  const [emailState, dicpatchEmail] = useReducer(emailReducer, {
    isValid: undefined,
    value: ""
  })
  const [passwordState, dicpatchPass] = useReducer(passwordReduce,{
    ispass: undefined,
    pass: ""
  })
  const [formIsValid, setFormIsValid] = useState(false);

  const emailChangeHandler = (event) => {
    dicpatchEmail({type: 'USER_INPUT', emailValue:event.target.value})

    setFormIsValid(
      event.target.value.includes('@') && passwordState.pass.trim().length > 6
    );
  };

  const passwordChangeHandler = (event) => {
    dicpatchPass({type: 'USER_PASS', passValue:event.target.value})

    setFormIsValid(
      event.target.value.trim().length > 6 && emailState.value.trim().includes('@')
    );
  };

  const validateEmailHandler = () => {
    dicpatchEmail({type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dicpatchPass({type: 'INPUT_BLUR1'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.pass);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.ispass === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.pass}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
