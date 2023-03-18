import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HoverLoader from "../../ui-component/components/HoverLoader";
import Avatar from "@material-ui/core/Avatar";
import ModeEditIcon from "@material-ui/icons/Edit";
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@mui/material/Modal';
import Stack from "@mui/material/Stack";

// material-ui
import { useTheme } from "@mui/material/styles";
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
  TextField,
  Typography,
  useMediaQuery,
  Select, MenuItem
} from "@mui/material";

// third party
import * as Yup from "yup";
import { Formik } from "formik";

// project imports
import useScriptRef from "hooks/useScriptRef";
import Google from "assets/images/icons/social-google.svg";
import AnimateButton from "ui-component/extended/AnimateButton";
import { strengthColor, strengthIndicator } from "utils/password-strength";

// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import MainCard from "ui-component/cards/MainCard";
import SubCard from "ui-component/cards/SubCard";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import { create,update } from "../../store/action/donor.action";
import _ from "lodash";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#3F51B5",
    color: "#3F51B5",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

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

const Create = (props) => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useSelector((state) => state.customization);

  const dispatch = useDispatch();

  const [Data, setData] = useState({
    name: props?.updateData ? props?.updateData?.name : '',
    description: props?.updateData ? props?.updateData?.description : '',
  });

  const onSubmit = async (value) => {
    const data = {
      name: value.name, description: value.description
    };

    if(props?.updateData) {
      const resp = await dispatch(update(data, props?.updateData?.id));
      if (resp) {
        props.handleClose();
      }
      
    } else {
      const resp = await dispatch(create(data));
      if (resp) {
        props.handleClose();
      }
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h3" component="h3">
          Create Todo
        </Typography>
        <Divider />

        <Formik
          initialValues={{
            name: props?.updateData ? props?.updateData?.name : '',
            description: props?.updateData ? props?.updateData?.description : '',
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            name: Yup.string().max(255).required("name is required"),
            description: Yup.string().max(255).required("description is required"),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              setStatus({ success: true });
              setSubmitting(false);
              onSubmit(values);
            } catch (err) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
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
            <form noValidate onSubmit={handleSubmit}>
              <Box >
                <div className="row col-md-12">
                  <div className="col-md-12">
                    <label htmlFor="name">
                      Name
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                      fullWidth
                      className="mt-2"
                      id="name"
                      label="Name"
                      type="text"
                      value={values.name}
                      name="name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.name && errors.name && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.name}
                      </FormHelperText>
                    )}
                  </div>

                  <div className="col-md-12">
                    <label htmlFor="description">
                      Description
                      <span style={{ color: "red" }}> *</span>
                    </label>

                    <TextField
                      fullWidth
                      id="description"
                      className="mt-2"
                      label="Description"
                      type="text"
                      rows={3}
                      value={values.description}
                      name="description"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.description && errors.description && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.description}
                      </FormHelperText>
                    )}
                  </div>
                </div>

                <div>
                  <Stack sx={{ mt: 2 }} spacing={2} direction="row">
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                        color="secondary"
                      >
                        Submit
                      </Button>
                    </AnimateButton>
                    <AnimateButton>
                      <Button
                        disableElevation
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        variant="contained"
                        onClick={props.handleClose}
                      >
                        Cancel
                      </Button>
                    </AnimateButton>
                  </Stack>
                </div>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};
export default Create;
