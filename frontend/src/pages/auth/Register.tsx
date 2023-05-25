import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button, CircularProgress } from "@material-ui/core";
import Checkbox from "@mui/material/Checkbox";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";

import { registerUser } from "redux/actions/user";
import { registerAdmin } from "redux/actions/admin";
import FormField from "pages/auth/FormField";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    minHeight: "100vh",
  },
  btnRegister: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 2),
  },
  checkboxWrapper: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: theme.spacing(2),
  },
  dashWelcome: {
    display: "flex", 
    justifyContent: "center",
  }
}));

interface IInitialValues {
  username: string;
  email: string;
  password: string;
}

const Register: React.FC = (): JSX.Element => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState<boolean>(false);

  const initialValues: IInitialValues = {
    username: "",
    email: "",
    password: "",
  };

  const onHandleSubmit = (values: IInitialValues, { setSubmitting }: any) => {
    checked
      ? dispatch(registerAdmin({ ...values, role: "admin" }, setSubmitting))
      : dispatch(registerUser({ ...values, role: "user" }, setSubmitting));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Неверное имя пользователя"),
    email: Yup.string().email("Неверная почта").required("Неверная почта"),
    password: Yup.string().required("Неверный пароль"),
  });

  React.useEffect(() => {
    document.title = "Регистрация";
  }, []);

  return (
    <>
      <h2 className={classes.dashWelcome}>Добро пожаловать, войдите или зарегистрируйтесь</h2>
      <Grid
        container
        className={classes.root}
        direction='column'
        alignItems='center'
        justifyContent='center'
      >
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onHandleSubmit}
        >
          {({ isSubmitting, handleSubmit }) => (
            <form noValidate onSubmit={handleSubmit}>
              <FormField isRegister={true} />
              <Button
                type='submit'
                variant='contained'
                color='secondary'
                className={classes.btnRegister}
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size='1rem' /> : "Регистрация"}
              </Button>
            </form>
          )}
        </Formik>
        <div className={classes.checkboxWrapper}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          <p>Администатор</p>
        </div>
      </Grid>
    </>
  );
};

export default Register;
