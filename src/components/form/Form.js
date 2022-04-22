import React, {useState, useEffect} from 'react';
import styles from './form.module.scss';
import cx from 'classnames';
// get our fontawesome imports => https://fontawesome.com/v6/docs/web/use-with/react/
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector, useDispatch } from 'react-redux'
import { setRefresh, setUser } from '../../redux/apiSlice'

const axios = require('axios')

const Form = () => {	
	const {url, refresh, user} = useSelector((state) => state.api)
	const dispatch = useDispatch()
	const [inputs, setInputs] = useState({});

	useEffect(() => {
		if (user) setInputs(user)
	}, [user, refresh]);

	const isValidZip = (sZip) => {
		return /^\d{5}(-\d{4})?$/.test(sZip);
	}

	const handleInputChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		setInputs(values => ({...values, [name]: value}))
	}

	const addUser = () => {
		// console.log('addUser', inputs);
		const apiUrl = `${url}/user`;
		axios.post(apiUrl, inputs)
			.then(response => {
				dispatch(setUser({}));
				dispatch(setRefresh())
				setInputs({})
			})
			.catch(error => {
				// console.error('There was an error!', error);
			});
	}
	
	const modifyUser = () => {
		// console.log('modifyUser', inputs);
		const apiUrl = `${url}/user/${inputs.id}`;
		axios.put(apiUrl, {
			name: inputs.name,
			zipCode: inputs.zipCode
		})
			.then(response => {
				dispatch(setUser({}));
				dispatch(setRefresh())
				setInputs({})
			})
			.catch(error => {
				// console.error('There was an error!', error);
			});
	}

	const handleSubmit = (event) => {
		event.preventDefault();
		// console.log('handleSubmit', inputs);

		if (url && inputs.name) {
			if (inputs.id) {
				modifyUser();
			} else {
				addUser();
			}
		}
	}
	
	const cancelModify = () => {
		setInputs({})
	}

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<h1>RentRedi</h1>
				<h2>Users UI Interview Code</h2>
				<form onSubmit={handleSubmit}>
					<div className={styles.box}>
						<label>Enter Name:</label>
						<input 
							type="hidden" 
							name="id" 
							value={inputs.id || ""}
						/>
					</div>
					<div className={styles.box}>
						<input 
							type="text" 
							name="name" 
							value={inputs.name || ""} 
							onChange={handleInputChange}
							// className={cx({[styles.fieldError]: !inputs.name && inputs.name!==''})}
						/>
					</div>
					<div className={styles.box}>
						<label>Enter Zip Code:</label>
					</div>
					<div className={styles.box}>
						<input 
							type="text" 
							name="zipCode" 
							value={inputs.zipCode || ""} 
							onChange={handleInputChange}
							className={cx(styles.zipCode, {[styles.fieldError]: inputs.zipCode==='' })}
						/>
					</div>
					<div className={styles.buttons}>
						<input 
							className={cx(styles.button, {[styles.disabled]: !url || !inputs.zipCode})} 
							type="submit" 
							value={inputs.id ? 'Modify' : 'Create'}
						/>
						<div className={styles.cancel} onClick={cancelModify}>
							{inputs.id  && <FontAwesomeIcon icon={faXmark} />}
						</div>
					</div>
				</form>
			</div>
		</div>
  	)
}

export default Form