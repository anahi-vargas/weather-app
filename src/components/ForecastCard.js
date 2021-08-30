import React from "react";

function ForecastCard(props) {
    return (
        <div className={props.forecast.className}>
            <div>{props.forecast.day}</div>
            <div><img src={`http://openweathermap.org/img/wn/${props.forecast.icon}@2x.png`} alt="weather icon" /></div>
            <div>High: {props.forecast.max_temp}°</div>
            <div>Low: {props.forecast.min_temp}°</div>
        </div>
    )
}

export default ForecastCard