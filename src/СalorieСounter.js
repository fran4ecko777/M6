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
        if (
            !newState.age
            || !newState.weight
            || !newState.height
            || !newState.gender
            || !newState.activity
        ) {
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

    handlerChangeRadioButton = (event) => {
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

    clearForm = (event) => {
        event.preventDefault();
        this.setState({
            age: 0,
            weight: 0,
            height: 0,
            activity: "",
            gender: "",
            isValid: false,
            resultCaloriesNorm: "",
            resultCaloriesMin: "",
            resultCaloriesMax:"",
        })
    }

    render () {
        return(
            <main>
                <div className="сounteiner">
                    <h1>Счетчик калорий</h1>
                    <form onSubmit={this.handlerSumbit}>
                        <h2>Пол</h2>
                        <div className="button_gender">
                            <div class="form_radio_btn">
                                <input 
                                    id="radio-1" 
                                    type="radio" 
                                    name="gender" 
                                    onChange={this.handlerChangeRadioButton} 
                                    value="male" 
                                    checked={this.state.gender == "male" ? "checked" : false} 
                                />
                                <label for="radio-1">Мужчина</label>
                            </div>
                            <div class="form_radio_btn">
                                <input 
                                    id="radio-2" 
                                    type="radio" 
                                    name="gender" 
                                    onChange={this.handlerChangeRadioButton} 
                                    value="female"
                                    checked={this.state.gender == "female" ? "checked" : false} 
                                />
                                <label for="radio-2">Женщина</label>
                            </div>
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
                        <div class="form">
                            <div className="form_radio">
                                <input 
                                    id="radio-3"
                                    onChange={this.handlerChangeRadioButton} 
                                    type="radio" 
                                    name="activity"
                                    value='min'
                                />
                                <label for="radio-3">Нет физических нагрузок</label>
                            </div>
                            <div className="form_radio">
                                <input
                                    id="radio-4" 
                                    onChange={this.handlerChangeRadioButton} 
                                    type="radio" 
                                    name="activity"
                                    value="low"
                                />
                                <label for="radio-4">Низкая физическая активность</label>
                            </div>
                            <div className="form_radio">
                                <input
                                    id="radio-5" 
                                    onChange={this.handlerChangeRadioButton} 
                                    type="radio" 
                                    name="activity"
                                    value="medium"
                                />
                                <label for="radio-5">Средня физическая активность</label>
                            </div>
                            <div className="form_radio">                                
                                <input
                                    id="radio-6" 
                                    onChange={this.handlerChangeRadioButton} 
                                    type="radio" 
                                    name="activity"
                                    value="high"
                                />
                                <label for="radio-6">Высокая физическая активность</label>
                            </div>
                            <div className="form_radio">
                                <input
                                    id="radio-7" 
                                    onChange={this.handlerChangeRadioButton} 
                                    type="radio" 
                                    name="activity"
                                    value="max"
                                />
                                <label for="radio-7">Очень высокая физическая активность</label>
                            </div>
                        </div>
                        <div className="calculation_button">
                            <button className="btn" disabled={!this.state.isValid} type="submit">Расчитать</button>
                            <button className="btn" onClick={this.clearForm} >Очистить все поля</button>
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