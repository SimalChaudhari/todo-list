import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button";
import './confirmationModal.scss'
import { useSelector } from 'react-redux';
import btnloadingImage from '../../assets/images/Loading/btnloading.svg';

function getModalStyle() {
    return {
        top: `40%`,
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

export default function SimpleModal(props) {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const loader  = useSelector(state =>state.ModelLoaderReducer.loader);
    

    const body = (
        <div style={modalStyle} className={`${classes.paper} makeStyles-paper-1`} >
            <div className="custom modal-header">
                <div className="simple-modal-title" id="simple-modal-title">{props.modalTitle}</div>
            </div>
            <div className="simple-modal-body">
                {props.message}
            </div>
            <div className="simple-modal-footer">
                <Button style={{ marginRight: '10px' }} variant="outlined" color="primary" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button onClick={props.doneClick} variant="contained" disabled={loader} color="primary">
                    { loader ?
                    <>{ props.buttonText+"ing"}
                    <img src={btnloadingImage} alt="button-loading-image" />
                      
                     </>: props.buttonText }
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