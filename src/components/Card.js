import React from "react";
import { useState, useEffect } from "react";
import TCGdex from "@tcgdex/sdk";

import "./card.css";
import "./StarsEffect";

import cardBack from "../images/Pokemon_Card_back.png";
import StarsEffect from "./StarsEffect";

function Card() {
  let randomCard = Math.floor(Math.random() * 133);
  const [cardObject, setCardObject] = useState('');

  useEffect(() => {
    fetch("https://api.tcgdex.net/v2/en/cards/swsh3-" + randomCard)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      setCardObject(data);

    });

  }, []);


  const [cardFlipped, setCardFlipped] = useState(true);
  const clickHandler = () => {
    setCardFlipped(!cardFlipped);
  };
  let flipCard = cardFlipped ? "" : "flipCard";


  if (cardObject ==''){
    return(<></>);}
  else{
  return (
    <>
        <img src={cardObject.set.logo + '.png'} alt="Set Logo" className="setLogo"/>

      <div className={"cardContainer " + flipCard}>

        <img
          className="cardBack"
          src={cardBack}
          alt="cardBack"
          onClick={clickHandler}
        />
        <img
          className="cardFront"
          src={cardObject.image + "/high.png"} //high resolution
          alt={cardObject.name}
        />

      </div>
      <StarsEffect visibility={cardFlipped}></StarsEffect>

      <div className="cardShadow"></div>

      <div className={"cardInfo" + flipCard}>
         <h3>
          <img src={cardObject.set.symbol + '.png'} alt="Set Icon"></img>
          {cardObject.localId +'/' + cardObject.set.cardCount.official}
         </h3>
         <h2>{cardObject.name}</h2>
         <h3>{cardObject.types}</h3>

      </div>
    </>
  );
}}

export default Card;
