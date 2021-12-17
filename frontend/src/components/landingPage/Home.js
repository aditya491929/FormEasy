import React, {useState} from "react";
import MainHeader from "../navbar/MainHeader";
import Content from "./Content";
import ModalForm from '../authPage/ModalForm';
import classes from './Home.module.css'

const Home = () => {
  const [visibility, setVisibility] = useState(false);
  const visibilityHandler = () => {
    setVisibility(true);
  }
  return (
    <>
      <ModalForm dialogClassName={classes['my-modal']} show={visibility} onHide={() => setVisibility(false)} />
      <MainHeader onPress={visibilityHandler} />
      <br />
      <Content />
    </>
  );
};

export default Home;
