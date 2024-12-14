import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets';
const Main = () => {
  return (
    <div className='main'>
    <div className="nav">
        <p>Sweet</p>
        <img src={assets.usericon} alt="" />
    </div>
    <div className="main-conatainer">
        <div className="greet">
            <p><span>HELLO , Guys </span></p>
            <p>How can I help you today ? </p>
        </div>

        <div className="cards">
            <div className="card">
                <p> suggest beautiful places to see on an upcoming road trip </p>
                <img src={assets.roadtrip} alt="" />
            </div>

            <div className="card">
                <p> Briefly summarise this concept : industilization </p>
                <img src={assets.industry} alt="" />
            </div>


            <div className="card">
                <p> Best team  in Football , BARCELONA  </p>
                <img src={assets.barcelona} alt="" />
            </div>


            <div className="card">
                <p> improve my code and make it readable  </p>
                <img src={assets.code} alt="" />
            </div>


         </div>
         <div className="main-bottom">
  <div className="search-box">
    <div className="gallery">
      <img src={assets.gallary} alt="Gallery" />
    </div>
    <input type="text" placeholder="Enter your prompt here" />
    <div className="actions">
      <img src={assets.microphone} alt="Microphone" />
      <img src={assets.send} alt="Send" />
    </div>
  </div>
  <div className="bottom-info">
    <p>Sweet may display info, including about people, so double-check its responses. Your privacy and Sweet app.</p>
  </div>
</div>

    </div>
    </div>
  )
}

export default Main
