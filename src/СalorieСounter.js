import React, { Component } from "react";

class СalorieСounter extends Component {
    state = {
        age: "",
        weight: "",
        height: "",
        min: 1.2,
        low: 1.375,
        medium: 1.55,
        high: 1.725,
        max: 1.9,
        isValid: false,
    }

    handlerChandeInput = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let newState = {};
        newState[name] = value;
        this.setState({newState})
    }

    handlerSumbit = (event) => {
        event.preventDefault();
        const information = new FormData(event.target);
        console.log(information.get("age"));
        console.log(information.get("weight"));
        console.log(information.get("height"));
    }

    render () {
        return(
            <main>
                <div className="сounteiner">
                    <h1>Счетчик калорий</h1>
                    <form onSubmit={this.handlerSumbit}>
                        <h2>Пол</h2>
                        <div className="button_gender">
                            <button>Мужской</button>
                            <button>Женский</button>
                        </div>
                        <h3>Физические параметры</h3>
                        <div>
                            <div>
                                Возраст
                                <lebe>
                                    <input
                                        onChange={this.handlerChandeInput} 
                                        type="text" 
                                        name="age" 
                                        placeholder="0" 
                                        maxlength="3"
                                        className="initial_data"
                                    />
                                </lebe>
                                Вес
                                <lebe>
                                    <input 
                                        onChange={this.handlerChandeInput} 
                                        type="text" 
                                        name="weight" 
                                        placeholder="0" 
                                        maxlength="3"
                                        className="initial_data"
                                    />
                                </lebe>
                                Рост
                                <lebe>
                                    <input 
                                        onChange={this.handlerChandeInput} 
                                        type="text" 
                                        name="height" 
                                        placeholder="0" 
                                        maxlength="3"
                                        className="initial_data"
                                    />
                                </lebe>
                            </div>
                        </div>
                        <h3>Физическая активность</h3>
                        <div>
                            <div className="radio_input">
                                <input 
                                    // onChange={this.handlerChandeInput} 
                                    type="radio" 
                                    name="activity"
                                    value={this.state.min}
                                />
                                Нет физических нагрузок
                            </div>
                            <div className="radio_input">
                                <input 
                                    // onChange={this.handlerChandeInput} 
                                    type="radio" 
                                    name="activity"
                                    value={this.state.low}
                                />
                                Низкая физическая активность
                            </div>
                            <div className="radio_input">
                                <input 
                                    // onChange={this.handlerChandeInput} 
                                    type="radio" 
                                    name="activity"
                                    value={this.state.medium}
                                />
                                Средня физическая активность
                            </div>
                            <div className="radio_input">                                
                                <input 
                                    // onChange={this.handlerChandeInput} 
                                    type="radio" 
                                    name="activity"
                                    value={this.state.high}
                                />
                                Высокая физическая активность
                            </div>
                            <div className="radio_input">
                                <input 
                                    // onChange={this.handlerChandeInput} 
                                    type="radio" 
                                    name="activity"
                                    value={this.state.max}
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
            </main>
        )
    }
}

export default СalorieСounter;