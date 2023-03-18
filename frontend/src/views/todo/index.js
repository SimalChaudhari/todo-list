import React, { useState, useEffect, useCallback } from "react";
import MainCard from "ui-component/cards/MainCard";
import { useDispatch, useSelector } from "react-redux";
import { getAll, DeleteData } from "../../store/action/donor.action";

import moment from "moment";
import BlockIcon from "@material-ui/icons/Block";
import Tooltip from "@material-ui/core/Tooltip";
import CheckCircleOutlineIcon from "@material-ui/icons/Restore";
import MaterialTable from "material-table";
import { tableIcons } from "../../container/CustomTable/MaterialTable";
import { Edit, Delete, Visibility } from "@material-ui/icons";
import { useNavigate, Link } from "react-router-dom";
import { useConfirm } from "material-ui-confirm";
import ViewModel from "./view";
import CreateModel from "./create";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Todo = (props) => {
  const classes = useStyles();

  const confirm = useConfirm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lists, loader } = useSelector((state) => state.TodoReducer);
  const [addNew, setAddNewModel] = useState(false);
  const [updateData, setUpdateData] = useState(null);

  useEffect(() => {
    fetchapi();
  }, []);

  const fetchapi = async () => {
    await dispatch(getAll());
  };

  const handleDelete = (item) => {
    confirm({
      title: "Are you sure you want to Delete?",
      description: `This todo will Deleted!`,
    })
      .then(async () => {
        const data = await dispatch(DeleteData(item.donor_id));
        if (data) {
          fetchapi();
        }
      })
      .catch(() => dispatch(Cancel("Delete cancel")));
  };

  const handleSaveTodo = (e, formData) => {
    e.preventDefault()
    console.log(formData);
  }

  const handleUpdateTodo = (todo) => {
    console.log(todo);
    setAddNewModel(true)
    setUpdateData(todo);
  }

  const handleDeleteTodo = (id) => {
    confirm({
      title: "Are you sure you want to Delete?",
      description: `This todo will Deleted!`,
    })
      .then(async () => {
        const data = await dispatch(DeleteData(id));
        if (data) {
          fetchapi();
        }
      })
      .catch(() => dispatch(Cancel("Delete cancel")));

  }

  const onCreateClose = () => {
    fetchapi();
    setAddNewModel(false)
    setUpdateData(null);
  }

  return (
    <MainCard title="Todos" style={{ minHeight: "78vh" }}>
      <div style={{ maxWidth: "100%", maxHeight: "auto" }}>
        <Button svariant="contained" color="primary" onClick={() => setAddNewModel(true)}>Add New</Button>

        {addNew ? (
          <CreateModel
            open={true}
            page={"todo"}
            updateData={updateData}
            handleClose={() => onCreateClose()}
          />
        ) : null}

      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
        {lists?.rows && lists?.rows.map((todo) => (
           <Grid item xs={4}>
            <Card className={classes.root}>
              <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                  {todo.name}
                </Typography>

                <Typography variant="body2" component="p">
                  {todo.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => handleUpdateTodo(todo)}
                  svariant="contained" color="primary"
                >
                  Update
                </Button>

                <Button
                  onClick={() => handleDeleteTodo(todo.id)}
                  variant="contained" color="secondary"
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
          </Grid>
      </Grid>
      </div>
    </MainCard>
  );
};

export default Todo;
