import {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isPostalChars = value => value.trim().length === 6;

const Checkout = (props) => {

  const [formInputValidity, setFormInputValidity] = useState({
    name: true ,
    street: true,
    postal: true,
    city: true
  })

  const [selectedCity, setSelectedCity] = useState('');

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalInputRef = useRef();
  //const cityInputRef = useRef();
  

 const confirmSubmitHandler = event => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostal = postalInputRef.current.value;
        const enteredCity = selectedCity;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalIsValid = isPostalChars(enteredPostal);

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;


        setFormInputValidity({
          name:enteredNameIsValid,
          street:enteredStreetIsValid,
          postal:enteredPostalIsValid,
          city:enteredCityIsValid
        })

        if(!formIsValid){
          return;
        }

      


        props.onConfirm({
          name:enteredName,
          street:enteredStreet,
          postal:enteredPostal,
          city:selectedCity
        })
  }


  const cities =  ["Mumbai","Pune","Nagpur", "Delhi", "Patna", "Noida", "Chennai", "Bangalore", "Gurugram"];

  const cityList = cities.map((x) => <option key={x.key} value={x}>{x}</option>);

  const handleCityChange = (event) => {
    console.log(event.target.value);
    setSelectedCity(event.target.value);
  }

return <form className={classes.form} onSubmit={confirmSubmitHandler}>
    <div className={`${classes.control} ${formInputValidity.name? '': classes.invalid}`}>
      <label htmlFor='name'>Your Name</label>
      <input type='text' id='name' ref={nameInputRef} />
      {!formInputValidity.name && <p >Please enter a valid name.</p>}
    </div>
    <div className={`${classes.control} ${formInputValidity.street? '': classes.invalid}`}>
      <label htmlFor='street'>Street</label>
      <input type='text' id='street' ref={streetInputRef} />
      {!formInputValidity.street && <p>Please enter a valid street.</p>}
    </div>
    <div className={`${classes.control} ${formInputValidity.postal? '': classes.invalid}`}>
      <label htmlFor='postal'>Postal Code</label>
      <input type='number' id='postal' ref={postalInputRef} />
      {!formInputValidity.postal && <p>Please enter a valid postal code(6-digit).</p>}
    </div>
    <div className={`${classes.control} ${formInputValidity.city? '': classes.invalid}`}>
      <label htmlFor='city'>City</label>
      {/* <input type='text' id='city' ref={cityInputRef} /> */}
      <select id="city" onChange={handleCityChange}>
        <option value="" disabled selected>Select City</option>
        {cityList}
      </select>
      {!formInputValidity.city && <p>Please select a city.</p>}
    </div>
    <div className={classes.actions}>
      <button type='button' onClick={props.onCancel}>
        Cancel
      </button>
      <button className={classes.submit}>Confirm</button>
    </div>
  </form>
};

export default Checkout;

