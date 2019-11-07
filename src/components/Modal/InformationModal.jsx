import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Px from "./px";
import { Markup } from "interweave";
import Button from "@material-ui/core/Button";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles(theme => ({
  paperModal: {
    position: "absolute",
    width: "70%",
    height: "70%",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    overflow: "scroll",
    itemAlign: "center"
  }
}));

function getModalStyle() {
  const top = 50;
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

export default function InformationModal(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const handleCloseModal = () => {
    props.onChange();
  };

  if (props.data) {
    let x = new Px(props.data);

    let contact = "";
    let description = "";
    let nextUpdate = "";
    let lastUpdated = "";
    let creationDate = "";
    let source = "";
    let matrix = "";
    let note;

    console.log(x.metadata);
    try {
      contact = x.metadata["CONTACT"]["TABLE"];
      description = x.metadata["DESCRIPTION"]["TABLE"];
      nextUpdate = x.metadata["NEXT-UPDATE"]["TABLE"];
      lastUpdated = x.metadata["LAST-UPDATED"]["TABLE"];
      creationDate = x.metadata["CREATION-DATE"]["TABLE"];
      source = x.metadata["SOURCE"]["TABLE"];
      matrix = x.metadata["MATRIX"]["TABLE"];
      note = x.metadata["NOTE"]["TABLE"];
    } catch (e) {}

    lastUpdated = lastUpdated.substring(0, 4) + "-" + lastUpdated.substring(4);
    lastUpdated = lastUpdated.substring(0, 7) + "-" + lastUpdated.substring(7);
    nextUpdate = nextUpdate.substring(0, 4) + "-" + nextUpdate.substring(4);
    nextUpdate = nextUpdate.substring(0, 7) + "-" + nextUpdate.substring(7);
    creationDate =
      creationDate.substring(0, 4) + "-" + creationDate.substring(4);
    creationDate =
      creationDate.substring(0, 7) + "-" + creationDate.substring(7);

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={props.open}
        onClose={handleCloseModal}
      >
        <div style={modalStyle} className={classes.paperModal}>
          <h6 id="simple-modal-title">{description}</h6>
          <p id="simple-modal-description">Last updated: {lastUpdated}</p>
          <p id="simple-modal-description">Next update: {nextUpdate}</p>
          <p id="simple-modal-description">Creation date: {creationDate}</p>
          <p id="simple-modal-description">Source: {source}</p>
          <p id="simple-modal-description">Matrix: {matrix}</p>
          <p id="simple-modal-description">CONTACT: {contact}</p>
          <br />
          <div id="simple-modal-description">
            <Markup content={note} />
          </div>
          <Button
            onClick={handleCloseModal}
            style={{
              position: "relative",
              backgroundColor: props.mainColor,
              color: "white",
              marginTop: "0.2cm"
            }}
            variant="contained"
          >
            Close
          </Button>
        </div>
      </Modal>
    );
  }
  return <div>empty</div>;
}
