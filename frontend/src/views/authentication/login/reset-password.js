import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { ResetPassword } from "../../../store/action/auth.action";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { useHistory } from "react-router-dom";
import { LOG_OUT } from "../../../store/constant/index";
import { checkPasswordPattern } from "../../../utils/password-strength";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import SubCard from "ui-component/cards/SubCard";
import { useTheme } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AnimateButton from "ui-component/extended/AnimateButton";
import { useParams } from "react-router-dom";
import HolyPennies from "../../../assets/images/Logo/logo2.png";
import btnloading from "../../../assets/images/Loading/btnloading.svg";
import backgroundImg from "../../../assets/images/Banner/banner-min.jpg";
import { useSelector } from "react-redux";
import "../../../assets/styles/AuthScreens.scss";
import * as Yup from "yup";
import { Formik } from "formik";
import useScriptRef from "hooks/useScriptRef";
import {
    Box,
    FormControl,
    FormControlLabel,
    FormHelperText,
    InputAdornment,
    IconButton,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography,
} from "@mui/material";
const styleData = {
    visibilityStyle: {
      position: "absolute",
      top: "15px",
      cursor: "pointer",
      right: "10px",
    },
  };
  
function PasswordReset(props) {
    const dispatch = useDispatch();
    const scriptedRef = useScriptRef();
  
    const loader = useSelector((state) => state.LoaderReducer.loader);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({ password: "", confirmPassword: "" });
    const [disabled, setdisabled] = useState(true);
    const navigate = useNavigate();
    const theme = useTheme();
    const params = useParams();

    const onSubmit = async (event) => {
      const token = params.token;
      const requestdata = {
        password: event.password,
        token,
      };
      const resp = await dispatch(ResetPassword(requestdata));
      if (resp) {
        setData({ password: "", confirmPassword: "" });
        dispatch({ type: LOG_OUT });
        navigate("/login");
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
                            <div className="brand-logo">
                                <img src={HolyPennies} alt="logo" />
                            </div>
                            <h4 className="text">Reset Password</h4>
                            <Formik
                            initialValues={{
                              password: "",
                              confirmPassword: "",
                              // submit: null,
                            }}
                            validationSchema={Yup.object().shape({
                              password: Yup.string().max(255).required("Password is required"),
                              confirmPassword: Yup
                               .string()
                               .max(255).required("Confirm Password is required")
                               .oneOf([Yup.ref('password'), null], 'Passwords must match')
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
                              setFieldValue,
                              touched,
                              values,
                            }) => (
                            <form
                              noValidate
                              onSubmit={handleSubmit}
                              className="form"
                            >
                              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel>New Password</InputLabel>
                                <OutlinedInput
                                  id="outlined-adornment-password-login"
                                  name="password"
                                  type={showPassword ? "text" : "password"}
                                  value={values.password}
                                  label="Password"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  required
                                  endAdornment={
                                    <InputAdornment position="end">
                                      {showPassword ? (
                                        <VisibilityOffIcon
                                          style={styleData.visibilityStyle}
                                          onClick={() => {
                                            setShowPassword(false);
                                          }}
                                        />
                                      ) : (
                                        <VisibilityIcon
                                          style={styleData.visibilityStyle}
                                          onClick={() => {
                                            setShowPassword(true);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  }
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
                      
                              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel>Confirm Password</InputLabel>
                                <OutlinedInput
                                  id="outlined-adornment-password-login"
                                  name="confirmPassword"
                                  value={values.confirmPassword}
                                  type={showConfirmPassword ? "text" : "password"}
                                  label="Confirm Password"
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  required
                                  endAdornment={
                                    <InputAdornment position="end">
                                      {showConfirmPassword ? (
                                        <VisibilityOffIcon
                                          style={styleData.visibilityStyle}
                                          onClick={() => {
                                            setShowConfirmPassword(false);
                                          }}
                                        />
                                      ) : (
                                        <VisibilityIcon
                                          style={styleData.visibilityStyle}
                                          onClick={() => {
                                            setShowConfirmPassword(true);
                                          }}
                                        />
                                      )}
                                    </InputAdornment>
                                  }
                                />
                                {touched.confirmPassword && errors.confirmPassword && (
                                  <FormHelperText
                                    error
                                    id="standard-weight-helper-text-password-register"
                                  >
                                    {errors.confirmPassword}
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
                          btn btn-block btn-primary
                          font-weight-medium
                          auth-form-btn w-100
                        "
                                    disabled={loader}
                                    type="submit"
                              
                                  >
                                    {loader ? "Signing in" : "Reset Password"}
                                    {loader ? (
                                      <img
                                        // src={btnloading}
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

export default PasswordReset;
