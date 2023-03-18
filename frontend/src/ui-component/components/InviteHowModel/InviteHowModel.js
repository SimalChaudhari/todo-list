import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Divider,
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField,
    Typography,
    useMediaQuery
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './InviteModal.scss'
// third party
import useScriptRef from 'hooks/useScriptRef';
import * as Yup from 'yup';
import { Formik } from 'formik';
import MainCard from "ui-component/cards/MainCard";
import AnimateButton from 'ui-component/extended/AnimateButton';
import btnloading from "../../../assets/images/Loading/btnloading.svg";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function InviteHowModel(props) {
    const navigate = useNavigate();
    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();
    let userData = JSON.parse(localStorage.getItem('user')) || {};
    const loader = useSelector(state => state.LoaderReducer.loader);

    const doneClick = async (values) => {
        values.refercode = userData.refercode;
        props.SendInvite(values);
    }

    const body = (
        <div className={''} >

            <Formik
                initialValues={{
                    email: "",
                    first_name: "",
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                    first_name: Yup.string().max(255).required('Firstname is required'),
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            doneClick(values);
                            setSubmitting(false);
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>

                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-email-register"
                                        type="email"
                                        value={values.email}
                                        name="email"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.email && errors.email && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.email}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>

                        <Grid container spacing={4}>
                            <Grid item xs={12} sm={12}>
                                <FormControl fullWidth error={Boolean(touched.first_name && errors.first_name)} sx={{ ...theme.typography.customInput }}>
                                    <InputLabel htmlFor="first_name">Firstname</InputLabel>
                                    <OutlinedInput
                                        id="first_name"
                                        type="text"
                                        value={values.first_name}
                                        name="first_name"
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        inputProps={{}}
                                    />
                                    {touched.first_name && errors.first_name && (
                                        <FormHelperText error id="standard-weight-helper-text--register">
                                            {errors.first_name}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Box sx={{ mt: 2 }}>
                        <AnimateButton>
                            <Button
                                disableElevation
                                disabled={loader ? true : false}

                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="secondary"
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
                            </Button>
                        </AnimateButton>
                    </Box>

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    color="primary" onClick={props.handleClose}
                                >
                                    Cancel
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>

        </div>
    );

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    Send Invitation
                </Typography>
                <Divider />
                {body}
            </Box>
        </Modal>

        // <div className="confirmation-modal-wrapper">
        //     <Modal
        //         open={props.open}
        //         onClose={props.handleClose}
        //         className="confirmation-modal-wrapper"
        //         aria-labelledby="simple-modal-title"
        //         aria-describedby="simple-modal-description"
        //     >
        //         {body}
        //     </Modal>
        // </div>
    );
}