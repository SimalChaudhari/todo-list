import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { forgotPassword } from "../../../store/action/auth.action";
import { Link ,useNavigate} from "react-router-dom";
import HolyPennies from "../../../assets/images/Logo/logo2.png";
import btnloading from "../../../assets/images/Loading/btnloading.svg";
import "../../../assets/styles/AuthScreens.scss";
import backgroundImg from "../../../assets/images/Banner/banner-min.jpg";
import { useTheme } from "@mui/material/styles";
import * as Yup from "yup";
import { Formik } from "formik";
import useScriptRef from "hooks/useScriptRef";
import AnimateButton from "ui-component/extended/AnimateButton";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";

const ForgotPasswordUI = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const scriptedRef = useScriptRef();

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const loader = useSelector((state) => state.LoaderReducer.loader);

  const onSubmit = async (event) => {
      dispatch(forgotPassword(event));
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
              <div className="brand-logo">
                <img src={HolyPennies} alt="logo" />
              </div>
              <h4 className="text">Forgot Password</h4>
              <Formik
              initialValues={{
                email: "",
              }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email("Must be a valid email")
                  .max(255)
                  .required("Email is required"),
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
                <form noValidate onSubmit={handleSubmit} className="form">
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel>Enter Register Email Address</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email-login"
                      type="email"
                      name="email"
                      label="Email Address / Username"
                      value={values.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                  <FormHelperText id="standard-adornment-email"></FormHelperText>
                  <Box sx={{ mt: 2 }}>
                    <AnimateButton>
                      <button
                        style={{ backgroundColor: "#7752BD" }}
                        className="
                    btn btn-block btn-primary btn-lg
                    font-weight-medium
                    auth-form-btn w-100
                  "
                        disabled={loader}
                        type="submit"
                      >
                        {loader ? "Loading.." : "Submit"}
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
                    <Link to="/login" className="auth-link forgotPassword">
                      Back
                    </Link>
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
}

export default ForgotPasswordUI;
