import React, { useState } from "react";

import { signin } from "./api-auth";
import auth from "./auth-helper";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 600,
    margin: "auto",
    textAlign: "center",
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2),
  },
  error: {
    verticalAlign: "middle",
  },
  title: {
    marginTop: theme.spacing(2),
    color: theme.palette.openTitle,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 300,
  },
  submit: {
    margin: "auto",
    marginBottom: theme.spacing(2),
  },
}));

const Signin = (props) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "",
    password: "",
    error: "",
  });
  const navigate = useNavigate();

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const clickSubmit = async () => {
    const user = {
      email: values.email || undefined,
      password: values.password || undefined,
    };

    const data = await signin(user);
    if (data.error) {
      setValues({ ...values, error: data.error });
    } else {
      auth.authenticate(data, () => navigate("/"));
    }
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h6' className={classes.title}>
          Sign In
        </Typography>
        <TextField
          id='email'
          type='email'
          label='Email'
          className={classes.textField}
          value={values.email}
          onChange={handleChange("email")}
          margin='normal'
        />
        <br />
        <TextField
          id='password'
          type='password'
          label='Password'
          className={classes.textField}
          value={values.password}
          onChange={handleChange("password")}
          margin='normal'
        />
        <br />
        {values.error && (
          <Typography component='p' color='error'>
            <Icon color='error' className={classes.error}>
              error
            </Icon>
            {values.error}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <Button
          color='primary'
          variant='contained'
          onClick={clickSubmit}
          className={classes.submit}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

export default Signin;
