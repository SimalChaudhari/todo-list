import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import HolyPennies from '../../../assets/images/Logo/logo2.png';
import { login } from '../../../store/action/auth.action';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import btnloading from '../../../assets/images/Loading/btnloading.svg';
import '../../../assets/styles/AuthScreens.scss';
import { useTheme } from "@mui/material/styles";

import backgroundImg from '../../../assets/images/Banner/banner-min.jpg';
import { SET_LOGIN_ERROR } from '../../../store/constant/index';
import { useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography
} from "@mui/material";
import AnimateButton from "ui-component/extended/AnimateButton";
import * as Yup from "yup";
import { Formik } from "formik";
import useScriptRef from "hooks/useScriptRef";


const Login = () => {

  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.LoaderReducer.loader);
  const [showPassword, setshowPassword] = useState(false);
  const navigate = useNavigate();


  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (event) => {
    const resp = await dispatch(login(event));
    if (resp) {
      navigate("/dashboard");
    }
  };

  return (
    <>
      <div className="auth-wrapper auth px-0">
        <div className="row">
          <div className="col-lg-8 col-sm-0 left">
            <img
              src={backgroundImg}
              className="authLeftBackground"
              alt="background img"
            />
            <p className="overText">Helping Grow Your Faith</p>
            <span className="overText">
              Submit your presence to the creator of the universe
            </span>
          </div>
          <div className="col-lg-4 col-sm-12 right">
            <div className="auth-form-light auth-form text-left px-4 px-sm-5">
              
              <h4 className="text">Login</h4>

              <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
                password: Yup.string().max(255)
                .required("Password is required")
                .matches(
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                  "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),
              })}
              onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                  if (scriptedRef.current) {
                    setStatus({ success: true });
                    setSubmitting(false);
                    onSubmit(values);
                  }
                } catch (err) {
                  if (scriptedRef.current) {
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                  }
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form
                  noValidate
                  onSubmit={handleSubmit}
                  className="form"
                  autoComplete="off"
                >
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel>Email Address / Username</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      className="content"
                      type="email"
                      name="email"
                      autoComplete="off"
                      label="Email Address / Username"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.email && errors.email && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.email}
                      </FormHelperText>
                    )}
                  </FormControl>
      
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password-login"
                      name="password"
                      autoComplete="off"
                      type={showPassword ? "text" : "password"}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            size="large"
                            onClick={() => setshowPassword(!showPassword)}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      inputProps={{}}
                    />
                    {touched.password && errors.password && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text-password-register"
                      >
                        {errors.password}
                      </FormHelperText>
                    )}
                  </FormControl>
      
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={1}
                  ></Stack>
      
                  <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                      <button
                        style={{ backgroundColor: "#7752BD" }}
                        className="
            btn btn-block btn-primary btn-lg
            font-weight-small
            auth-form-btn w-100
            "
                        disabled={loader}
                        type="submit"
                      >
                        {loader ? "Signing in" : "Sign In"}
                        {loader ? (
                          <img
                            src={btnloading}
                            style={{
                              width: "11%",
                              height: "11%",
                              paddingLeft: "5px",
                            }}
                            alt="loading button"
                          />
                        ) : null}
                      </button>
                    </AnimateButton>
                  </Box>
                  <Typography
                    variant="subtitle1"
                    color="secondary"
                    sx={{
                      textDecoration: "none",
                      cursor: "pointer",
                      textAlign: "center",
                    }}
                  >
                    {/* <Link to="/forgot-password" className="auth-link forgotPassword">
                      Forgot password?
                    </Link> */}
                  </Typography>
                </form>
              )}
            </Formik>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
