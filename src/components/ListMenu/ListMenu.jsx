import React, { Fragment, useEffect, useState } from "react";
import "../../styles/style.css";
import Loading from "../Loading/Loading";
import TreeMenu from "react-simple-tree-menu";
import axios from "axios";

//Json object of Hagstovan menu
import staticData from "../../json/menu";

let tmpCounter = 0;

export default function ListMenu(props) {
  const [data, setData] = useState(null);
  const [counter, setCounter] = useState(0);

  let headline = props.statBank.label || "Hagtalsgrunnurin";

  useEffect(() => {
    setData(null);
    getDataTree(props.statBank.value || props.statBank);
  }, [props.statBank]);

  const handleClick = e => {
    if (e.type === "t") {
      const mainUrl = props.statBank.value || props.statBank;
      const tmpId = e.id;
      const tmpUrl = mainUrl + tmpId;
      props.onClickItem(tmpUrl);
    }
  };

  async function getDataTree(statBank) {
    const dataTree = await fetchDataTree(statBank);
    await setData(dataTree);
  }

  //Recursive function
  const fetchDataTree = async url => {
    let menuArray = await fetchData(url);
    if (menuArray) {
      Promise.all(
        menuArray.map(async menuArray => {
          setTimeout(async () => {
            try {
              if (menuArray.type === "l") {
                menuArray.nodes = await fetchDataTree(url + "/" + menuArray.id);
              }
            } catch (error) {
              console.log(error);
              throw error;
            }
          }, 0);
        })
      );
      //Show menu being fetched
      setCounter(tmpCounter++);
      return menuArray;
    }
  };

  async function fetchData(url) {
    let fData;
    await axios
      .get(url)
      .then(response => {
        fData = response.data;
      })
      .catch(error => {});
    return fData;
  }

  if (data) {
    return (
      <Fragment>
        <div className="headLine">{headline}</div>
        <TreeMenu className="tree-item" data={data} onClickItem={handleClick} />
      </Fragment>
    );
  }

  return (
    <div>
      <div className="noData">heintar valmynda listan, vinarliga bíða</div>
      <Loading type="spin" color="#2d4182" height="5%" width="5%"></Loading>
    </div>
  );
}
