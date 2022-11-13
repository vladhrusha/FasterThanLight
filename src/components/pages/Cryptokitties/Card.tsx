import React, { useState } from 'react'
import './Card.scss'
import { CryptoKittie } from 'models/CryptoKittie'
import loadingFail from 'images/loadingFail.png'

const Card = (kitty: CryptoKittie) => {
  const [kittyImageURL, setKittyImageURL] = useState<string>(kitty.image_url)
  const altImage = () => {
    setKittyImageURL(loadingFail)
  }
  return (
    <div className="kittyCard">
      <div className="kittyCard__article">
        <div className="kittyCard__price">For sale {kitty.price}</div>
        <img
          className="kittyCard__image"
          src={kittyImageURL}
          onError={altImage}
        />
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
