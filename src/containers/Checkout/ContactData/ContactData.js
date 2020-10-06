import React, { Component } from 'react';

import './ContactData.css';

import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
       orderForm: {
        name: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Full Name'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        street: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Street'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        zipcode: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Postal Code'
            },
            value: '',
            validation: {
                required: true,
                minLength: 4,
                maxLength: 6
            },
            valid: false,
            touched: false
        },
        country: {
            elementType: 'input',
            elementConfig: {
                type: 'text',
                placeholder: 'Country'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Email Address'
            },
            value: '',
            validation: {
                required: true
            },
            valid: false,
            touched: false
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig: {
                options: [
                    {value: 'faster', displayValue: 'Fastest'},
                    {value: 'standard', displayValue: 'Standard'}
                ]
            },
            value: '',
            validation: {},
            valid: true
        }
       },
        loading: false,
        formIsValid: false
    }

    checkValidity(value, rules) {
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        // if(rules.minLength){
        //     isValid = ((value.lenth >= rules.minLength) && isValid);   
        // }
       
        // if(rules.maxLength){
        //     isValid = value.lenth <= rules.maxLength && isValid;
        // }
        
        return isValid;
    }

    orderHandler = (event)=> {
        event.preventDefault();
        this.setState({ loading : true });
        const formData = {};
        for(let formElementIdentifier  in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderForm: formData
        }
        axios.post('/orders.json',order)
            .then(response=>{
                this.setState({ loading : false });
                this.props.history.push('/');
            })
            .catch(error=> {
                this.setState({ loading : false });
            });
    }

    inputChangedhandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updateFormElement ={
            ...updatedOrderForm[inputIdentifier]
        };
        updateFormElement.value = event.target.value;
        updateFormElement.valid = this.checkValidity(updateFormElement.value, updateFormElement.validation);
        updatedOrderForm[inputIdentifier] = updateFormElement;
        updateFormElement.touched = true;
        console.log(updateFormElement);
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid});
    }

    render(){
        let formElements = [];
        for(let key in this.state.orderForm){
            formElements.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElements.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedhandler(event, formElement.id)}
                    />    
                ))}
                <Button disabled={!this.state.formIsValid} type="Success">ORDER</Button>
            </form>
        );
        if(this.state.loading){
            form = <Spinner />;
        }
        return (
            <div className="ContactData">
                <h4>Enter your Contact Details</h4>
                {form}
            </div>
        );
    }
}

export default ContactData;