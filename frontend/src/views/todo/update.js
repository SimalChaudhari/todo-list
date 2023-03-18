import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import HoverLoader from "../../ui-component/components/HoverLoader";
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
  Select,
  MenuItem,
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
import { viewData, update } from "../../store/action/donor.action";
import { getAllForDropDown } from "../../store/action/how.action";
import _ from "lodash";
import { useParams } from "react-router-dom";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#3F51B5",
    color: "#3F51B5",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}));

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const EditDonor = () => {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useSelector((state) => state.customization);
  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);

  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const params = useParams();
  const [showLoader, setShowLoader] = useState(false);

  const googleHandler = async () => {
    console.error("Register");
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword("123456");
  }, []);

  const dispatch = useDispatch();
  const { hows_lists } = useSelector((state) => state.HowReducer);
  const { loader} = useSelector((state) => state.DonorReducer);
  const [showEdit, setShowEdit] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");

  const [Data, setData] = useState({
    first_name: "",
    last_name: "",
    hows_id: "",
    mobile: "",
    email: "",
    image: "",
  });

  async function fetchData() {
    await dispatch(getAllForDropDown());
  }

  useEffect(() => {
    fetchData();
    fetchapi();
  }, []);

  const fetchapi = async () => {
    setShowLoader(true);
    const id = params.id;
    const data = await dispatch(viewData({ id: id }));
    const profile = data?.data?.rows?.[0]?.User.image;
    // const image = `${process.env.REACT_APP_IMAGES_URL}/images/${profile}`;
    setUserAvatar(profile);
    setData(data?.data?.rows?.[0]);
    setShowLoader(false);
  };

  const onSubmit = async (value) => {
    const form_data = new FormData();
    form_data.append("first_name", value.first_name);
    form_data.append("last_name", value.last_name);
    form_data.append("how_id", value.hows_id);
    form_data.append("email", value.email);
    form_data.append("mobile", value.mobile);

    if (value?.image) {
      form_data.append("image", value.image);
    }
    console.log(Data?.id);
    const resp = await dispatch(update(form_data, Data?.id));

    if (resp) {
      navigate("/donors");
    }
  };

  return (
    <MainCard title="Update" style={{ minHeight: "78vh" }}>
      {loader ? <HoverLoader /> : ""}
      {/* <SubCard title="Create How Admin"> */}
      {!showLoader ? (
        <Formik
          initialValues={{
            first_name: Data?.User?.first_name,
            last_name: Data?.User?.last_name,
            hows_id: Data?.how_id,
            mobile: Data?.User?.mobile,
            email: Data?.User?.email,
            image: null,
            submit: null,
          }}
          validationSchema={Yup.object().shape({
            first_name: Yup.string().max(255).required("Firstname is required"),
            last_name: Yup.string().max(255).required("Lastname is required"),
            hows_id: Yup.string().required("HoW name is required"),
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            mobile: Yup.string("Enter your phone number")
              .matches(phoneRegExp, "Phone number is not valid")
              .required("Phone number is required")
              .min(10, "Number Must be 10 digit only!")
              .max(10, "Number Must be 10 digit only!"),
            image: Yup.mixed()
              .optional()
              .test("fileType", "Unsupported File Format", function (value) {
                return value?.type
                  ? SUPPORTED_FORMATS.includes(value?.type)
                  : true;
              })
              .test("fileSize", "File Size is too large", (value) => {
                const sizeInBytes = 5000000; //0.5MB
                return value?.size ? value?.size <= sizeInBytes : true;
              }),
          })}
          onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
            try {
              setStatus({ success: true });
              setSubmitting(false);
              console.log(values);
              onSubmit(values);
            } catch (err) {
              console.error(err);
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
              <Box>
                <div className="row col-md-12">
                  <div className="col-md-6">
                    <label htmlFor="first_name">
                      First Name
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <TextField
                      fullWidth
                      className="mt-2"
                      id="first_name"
                      label="First Name"
                      type="text"
                      value={values.first_name}
                      name="first_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.first_name && errors.first_name && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.first_name}
                      </FormHelperText>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="last_name">
                      Last Name
                      <span style={{ color: "red" }}> *</span>
                    </label>

                    <TextField
                      fullWidth
                      id="last_name"
                      className="mt-2"
                      label="Last Name"
                      type="text"
                      value={values.last_name}
                      name="last_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.last_name && errors.last_name && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.last_name}
                      </FormHelperText>
                    )}
                  </div>
                </div>

                <div className="row col-md-12 mt-3">
                  <div className="col-md-6">
                    <label htmlFor="email">
                      Email
                      <span style={{ color: "red" }}> *</span>
                    </label>

                    <TextField
                      fullWidth
                      id="outlined-adornment-email-register"
                      className="mt-2"
                      label="Email"
                      type="email"
                      value={values.email}
                      name="email"
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
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="mobile">
                      Mobile
                      <span style={{ color: "red" }}> *</span>
                    </label>

                    <TextField
                      fullWidth
                      id="mobile"
                      className="mt-2"
                      type="text"
                      label="Mobile"
                      value={values.mobile}
                      name="mobile"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      inputProps={{}}
                    />
                    {touched.mobile && errors.mobile && (
                      <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                      >
                        {errors.mobile}
                      </FormHelperText>
                    )}
                  </div>
                </div>

                <div className="row col-md-12 mt-3">
                
                <div className="col-md-6">
                <label htmlFor="parent">
                House Name
                <span style={{ color: "red" }}>*</span>
                </label>

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                  
                    House Name
                    </InputLabel>
                    <Select
                        fullWidth
                        className="mt-2"
                        id="hows_id"
                        label="house Name"
                        type="text"
                        value={values?.hows_id}
                        name="hows_id"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        inputProps={{}}
                    >
                    <MenuItem className="text-multed" disabled value="">
                        Select User
                    </MenuItem>
                    {_.map(hows_lists, (item, i) => {
                        return (
                        <MenuItem key={i} value={item?.id}>
                            {item?.how_name}
                        </MenuItem>
                        );
                    })}
                    </Select>
                </FormControl>

                {touched.hows_id && errors.hows_id && (
                    <FormHelperText
                        error
                        id="standard-weight-helper-text--register"
                    >
                        {errors.hows_id}
                    </FormHelperText>
                )}
          </div>


                  <div className="col-md-4">
                    <b htmlFor="image">
                      Donor Profile (jpg,img,png,jpeg){" "}
                      {/* <span style={{ color: "red" }}> *</span>{" "} */}
                    </b>

                    <TextField
                      type="file"
                      name="image"
                      className="mt-2"
                      fullWidth
                      id="file"
                      label="Donor Profile"
                      onBlur={handleBlur}
                      onChange={(event) =>
                        setFieldValue("image", event.currentTarget.files[0])
                      }
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    {touched.image && errors.image && (
                      <FormHelperText
                        error
                        id="image-weight-helper-text--register"
                      >
                        {errors.image}
                      </FormHelperText>
                    )}
                  </div>
                  <div className="col-md-2">
                    {userAvatar ?
                      <img
                      style={{
                        height: "100px",
                        width: "110px",
                        display: "inline-flex",
                        position: "relative",
                      }}
                      src={`${process.env.REACT_APP_IMAGES_URL}/images/${userAvatar}`}
                      alt=""
                    />
                    : 
                    ''}
                    
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
                  </Stack>
                </div>
              </Box>
            </form>
          )}
        </Formik>
      ) : null}
    </MainCard>
  );
};
export default EditDonor;
