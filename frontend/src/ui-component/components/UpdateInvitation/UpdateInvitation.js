import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import './UpdateModal.scss';
import { UpdateHowInvitation } from '../../../store/action/hollyhouse.action';


function getModalStyle() {
    return {
        top: `50%`,
        left: `50%`,
        border: 'unset',
        transform: `translate(-40%, -50%)`,
        borderRadius: '4px',
        padding: '0px',
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

export default function InviteHowModel(props) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loader = useSelector(state => state.ModelLoaderReducer.loader);
    const [modalStyle] = useState(getModalStyle);
    const [email, setEmail] = useState(props.email)
    const [firstname, setfirstname] = useState(props.firstname);
    const [disable, setdisable] = useState(true);
    const onChange = (e) => {
        if (e.target.name === "firstname") {
            setfirstname(e.target.value);
        }
        else if (e.target.name === "email") {
            setEmail(e.target.value);

        }
        setdisable(false);
    }


    const doneClick = async () => {
        if (props.page && props.page === "donor" && props.handeldone) {
            props.handeldone(email, firstname);
        }
        else {
            let resp = await (dispatch(UpdateHowInvitation(props.invid, {
                email,
                firstname: firstname
            })))
            if (resp) {
                props.handleClose();
            }
        }
    }

    const body = (
        <div style={modalStyle} className={classes.paper} >
            <div className="custom modal-header">
                <div className="simple-modal-title" id="simple-modal-title">Invite Holy House</div>
            </div>
            <div className="simple-modal-body">
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" value={email} className="form-control mb-3" name="email" onChange={onChange} placeholder="Enter email" required />

                </div>
                <div className="form-group">
                    <label htmlFor="firstname">First Name <span>*</span></label>
                    <input className='form-control' type="text" name="firstname" onChange={onChange} value={firstname} placeholder='Enter first name' />
                </div>
                <div className="form-group">
                    <Button style={{ width: "100%" }} disabled={!email || !firstname || loader || disable} onClick={doneClick} variant="contained" color="primary">
                        Update
                    </Button>
                </div>

            </div>
            <div className="simple-modal-footer">
                <Button style={{ marginRight: '10px' }} variant="outlined" color="primary" onClick={props.handleClose}>
                    Cancel
                </Button>

            </div>
        </div>
    );

    return (
        <div className="confirmation-modal-wrapper">
            <Modal
                open={props.open}
                onClose={props.handleClose}
                className="confirmation-modal-wrapper"
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    );
}