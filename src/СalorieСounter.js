import React, { Component } from "react";

class СalorieСounter extends Component {
    state = {
        age: 0,
        weight: 0,
        height: 0,
        activity: "",
        gender: "",
        isValid: false,
        resultCaloriesNorm: "",
        resultCaloriesMin: "",
        resultCaloriesMax:"",
    }

    checkAllInputsNotEpmty(newState) {
        if (!newState.age) {
            return false
        } else if (!newState.weight) {
            return false
        } else if (!newState.height) {
            return false
        } else if (!newState.gender) {
            return false
        } else if (!newState.activity) {
            return false
        }
        return true
    }

    handlerChandeInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let newState = {...this.state};
        newState[name] = Number(value);
        
        if (value <= 999) {
            this.setState(newState)
        } else {
            return false
        }
        let allInputsNotEpmty = this.checkAllInputsNotEpmty(newState)
        
        this.setState({
            isValid: !allInputsNotEpmty ? false : true,
        })
    }

    changeValuesInState = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let newState = {...this.state};
        newState[name] = value;
        this.setState(newState)
        return newState
    }

    handlerChandeInputGender = (event) => {
        let newState = this.changeValuesInState(event)
        let allInputsNotEpmty = this.checkAllInputsNotEpmty(newState)
        this.setState({isValid: !allInputsNotEpmty ? false : true})
    }

    handlerChandeInputActivity = (event) => {
        let newState = this.changeValuesInState(event)
        let allInputsNotEpmty = this.checkAllInputsNotEpmty(newState)
        this.setState({isValid: !allInputsNotEpmty ? false : true})
    }    

    getGenderCoefficient() {
        if (this.state.gender === "male") {
            return 5;
        } else if (this.state.gender === "female") {
            return -160;
        }
    }

    getCoefficientActivity () {
        if (this.state.activity === "min") {
            return 1.2;
        } else if (this.state.activity === "low") {
            return 1.375;
        } else if (this.state.activity === "medium") {
            return 1.55;
        } else if (this.state.activity === "high") {
            return 1.725;
        } else if (this.state.activity === "max") {
            return 1.9;
        }
    }

    getCaloriesNorm() {
        let genderCoefficient = this.getGenderCoefficient()
        let getCoefficientActivity = this.getCoefficientActivity()
        let age = this.state.age
        let weight = this.state.weight
        let height = this.state.height
        let resultAge = 5 * age;
        let resultWeight = 10 *  weight;
        let resultHeight = 6.25 * height
        let resultCaloriesNorm = Math.round((resultWeight + resultHeight - resultAge + genderCoefficient) * getCoefficientActivity);
        this.setState({resultCaloriesNorm:resultCaloriesNorm})
        return resultCaloriesNorm
    }

    getCaloriesMin() {
        let resultCaloriesMin = Math.round(this.getCaloriesNorm() * 0.85);
        this.setState({resultCaloriesMin:resultCaloriesMin})
        return resultCaloriesMin
    }

    getCaloriesMax() {
        let resultCaloriesMax = Math.round(this.getCaloriesNorm() * 1.15);
        this.setState({resultCaloriesMax:resultCaloriesMax})
        return resultCaloriesMax
    }

    handlerSumbit = (event) => {
        event.preventDefault();
        this.getCaloriesNorm()
        this.getCaloriesMin()
        this.getCaloriesMax()
        console.log(this.getCaloriesNorm())
        console.log(this.getCaloriesMin())
        console.log(this.getCaloriesMax())
    }

    render () {
        return(
            <main>
                <div className="сounteiner">
                    <h1>Счетчик калорий</h1>
                    <form onSubmit={this.handlerSumbit}>
                        <h2>Пол</h2>
                        <div className="button_gender">
                            <h3>Мужчина</h3>
                            <input type="radio" name="gender" onChange={this.handlerChandeInputGender} value="male"/>
                            <h3>Женщина</h3>
                            <input type="radio" name="gender" onChange={this.handlerChandeInputGender} value="female"/>
                        </div>
                        <h3>Физические параметры</h3>
                        <div>
                            <div>
                                Возраст
                                <label>
                                    <input
                                        onChange={this.handlerChandeInput} 
                                        type="number" 
                                        name="age" 
                                        placeholder="0"
                                        className="initial_data"
                                        value={!this.state.age ? "" : this.state.age}
                                    />
                                </label>
                                Вес
                                <label>
                                    <input 
                                        onChange={this.handlerChandeInput} 
                                        type="number" 
                                        name="weight" 
                                        placeholder="0"
                                        className="initial_data"
                                        value={!this.state.weight ? "" : this.state.weight}
                                    />
                                </label>
                                Рост
                                <label>
                                    <input 
                                        onChange={this.handlerChandeInput} 
                                        type="number" 
                                        name="height" 
                                        placeholder="0"
                                        className="initial_data"
                                        value={!this.state.height ? "" : this.state.height}
                                    />
                                </label>
                            </div>
                        </div>
                        <h3>Физическая активность</h3>
                        <div>
                            <div className="radio_input">
                                <input 
                                    onChange={this.handlerChandeInputActivity} 
                                    type="radio" 
                                    name="activity"
                                    value='min'
                                />
                                Нет физических нагрузок
                            </div>
                            <div className="radio_input">
                                <input 
                                    onChange={this.handlerChandeInputActivity} 
                                    type="radio" 
                                    name="activity"
                                    value="low"
                                />
                                Низкая физическая активность
                            </div>
                            <div className="radio_input">
                                <input 
                                    onChange={this.handlerChandeInputActivity} 
                                    type="radio" 
                                    name="activity"
                                    value="medium"
                                />
                                Средня физическая активность
                            </div>
                            <div className="radio_input">                                
                                <input 
                                    onChange={this.handlerChandeInputActivity} 
                                    type="radio" 
                                    name="activity"
                                    value="high"
                                />
                                Высокая физическая активность
                            </div>
                            <div className="radio_input">
                                <input 
                                    onChange={this.handlerChandeInputActivity} 
                                    type="radio" 
                                    name="activity"
                                    value="max"
                                />
                                Очень высокая физическая активность
                            </div>
                        </div>
                        <div className="calculation_button">
                            <button disabled={!this.state.isValid} type="submit">Расчитать</button>
                            <button>Очистить все поля</button>
                        </div>
                    </form>
                </div>
                <div className="сounteiner">
                    <h2>Ваша норма калорий</h2>
                    <div>Для снижение веса {this.state.resultCaloriesMin}</div>
                    <div>Для подержания веса {this.state.resultCaloriesNorm}</div>
                    <div>Для наборa веса {this.state.resultCaloriesMax}</div>
                </div>
            </main>
        )
    }
}

export default СalorieСounter;