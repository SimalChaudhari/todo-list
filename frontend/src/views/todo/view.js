import MainCard from "ui-component/cards/MainCard";
import Avatar from "@material-ui/core/Avatar";
import AnimateButton from "ui-component/extended/AnimateButton";
import React, { useState, useEffect, useCallback } from "react";

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
  useMediaQuery,
} from "@mui/material";
import { viewData } from "../../store/action/donor.action";
import "../../assets/scss/viewHowAdmin.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { value } from "assets/scss/_themes-vars.module.scss";
import { useParams } from "react-router-dom";
import { ConstructionOutlined } from "@mui/icons-material";
import SubCard from "ui-component/cards/SubCard";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const view = (props) => {
  const dispatch = useDispatch();
  const [Data, setData] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const [showLoader, setShowLoader] = useState(false);

  const [userAvatar, setUserAvatar] = useState("");

  useEffect(() => {
    fetchapi();
  }, []);

  const fetchapi = async () => {
    setShowLoader(true);
    const id = params.id;
    const data = await dispatch(viewData({ id: id }));
    const profile = data?.data?.rows?.[0]?.User.image;

    const image = `${process.env.REACT_APP_IMAGES_URL}/images/${profile}`;

    setData(data?.data?.rows?.[0]);
    setUserAvatar(profile);

    setShowLoader(false);
  };

  return (
    <MainCard title="View" style={{ minHeight: "86vh" }}>
      <div className="container">
        <div className="row justify-content-center ">
          <div className="col-sm-6">
            <SubCard title="Invitation View" style={{ minHeight: "auto" }}>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 530,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar></ListItemAvatar>
                  {userAvatar ? 
                  <ListItemText
                    primary=<h6>Profile</h6>
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          // className="mt-2"
                        ></Typography>
                        <img
                          style={{
                            height: "180px",
                            width: "180px",
                            display: "inline-flex",
                            position: "relative",
              
                          }}
                          src={`${process.env.REACT_APP_IMAGES_URL}/images/${userAvatar}`}
                          alt=""
                        />
                      </React.Fragment>
                    }
                  />
                  : '' }

                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar></ListItemAvatar>
                  <ListItemText
                    primary=<h6>First Name</h6>
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                          className="mt-2"
                        ></Typography>
                        <span> {Data?.User?.first_name}</span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar></ListItemAvatar>
                  <ListItemText
                    primary=<h6>Last Name</h6>
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        <span> {Data?.User?.last_name}</span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar></ListItemAvatar>
                  <ListItemText
                    primary=<h6>Email</h6>
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        <span> {Data?.User?.email}</span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar></ListItemAvatar>
                  <ListItemText
                    primary=<h6>Phone Number</h6>
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        <span> {Data?.User?.mobile}</span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
                <ListItem alignItems="flex-start">
                  <ListItemAvatar></ListItemAvatar>
                  <ListItemText
                    primary=<h6>Date</h6>
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        <span>{Data?.User?.createdAt}</span>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
              <Paper className="mt-3 text-center">
              <Link to="/donors"> <button className="btn btn-primary">Back</button></Link>
              </Paper>
            </SubCard>
          </div>
        </div>
      </div>
    </MainCard>
  );
};

export default view;
