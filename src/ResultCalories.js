import React, { Component } from "react";

class ResultCalories extends Component {
    render () {
        
        const {resultCaloriesMin, resultCaloriesNorm, resultCaloriesMax, display} = this.props
        
        return (
        <div className="hiden" style={{display: display}}>
            <h2>Ваша норма калорий</h2>
            <div className="result_calories">
                <div><a>Для снижение веса</a> {resultCaloriesMin}</div>
                <div><a>Для подержания веса</a> {resultCaloriesNorm}</div>
                <div><a>Для наборa веса</a> {resultCaloriesMax}</div>
            </div>
        </div>
        )
    }
}

export default ResultCalories;