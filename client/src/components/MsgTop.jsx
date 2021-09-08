import React from "react";
import img1 from "../global.png";
import img2 from "../shrek.jpg";
import img3 from "../cat.jpg";
const arr = [img1,img2,img3];
function Top(props) {
    return(
        <div className="top">
            <div className="top-item-1 top-item">
                <img className="person-img top-img" src={arr[props.id-1]} alt="img" />
            </div>
            <div className="top-item-2 top-item">
            <h3>{props.data.name}</h3>
            </div>
            
        </div>
    );
}

export default Top;