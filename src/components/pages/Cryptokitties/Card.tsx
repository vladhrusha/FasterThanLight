import React from 'react'
import './Card.scss'
import { CryptoKittie } from 'models/CryptoKittie'
import kittySVG from 'localData/kitty.svg'

const Card = (kitty: CryptoKittie) => {
  return (
    <div className="kittyCard">
      <div className="kittyCard__article">
        <div className="kittyCard__price">For sale {kitty.price}</div>
        <img className="kittyCard__image" src={kittySVG} />
      </div>
      <div className="kittyCard__data">
        <span className="data__name span">{kitty.name}</span>
        <span className="data__gen span">Gen 1</span>
        <span className="data__category span">{kitty.category}</span>
      </div>
    </div>
  )
}

export default Card
