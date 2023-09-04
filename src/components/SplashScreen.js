import React from 'react'
import vector from "../assets/img/vector.svg"


function SplashScreen() {
  return (
    <div className='splash'>
    <h1>KITCHEN</h1>
    <h2>connect</h2>
    <p>Serving more than just 
meals- crafting conversations, 
cultivating connections.</p>
    <img src={vector} alt="scooter" />
    </div>
  )
}

export default SplashScreen