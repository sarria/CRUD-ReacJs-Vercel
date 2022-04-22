import React, {useState, useEffect} from 'react';
import User from '../user/User'
import styles from './list.module.scss'
// get our fontawesome imports => https://fontawesome.com/v6/docs/web/use-with/react/
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useSelector, useDispatch } from 'react-redux'
import { setRefresh, setUser } from '../../redux/apiSlice'

const axios = require('axios')

const List = () => {
	const {url, refresh} = useSelector((state) => state.api)
	const dispatch = useDispatch()
	
	const [usersList, setUsersList] = useState([]);

	useEffect(() => {
		const fetchData = async () =>{
			try {
				const apiUrl = `${url}/users`;
				const {data: response} = await axios.get(apiUrl);
				setUsersList(response);
			} catch (error) {
				// console.error(error.message);
			}
		}
	
		fetchData();
	}, [url, refresh]);

	const deleteUser = (id) => {
		// console.log('deleteUser', id)
		if (window.confirm("Are you sure?")) {
			try {
				const apiUrl = `${url}/user/${id}`;
				axios.delete(apiUrl)
					.then(response => dispatch(setRefresh()))
					.catch(error => {
						// console.error('There was an error!', error);
					});
			} catch (error) {
				// console.error(error.message);
			}					
		}
	}

	const modifyUser = (id) => {
		// console.log('modifyUser', id);

		const fetchData = async () =>{
			try {
				const apiUrl = `${url}/user/${id}`;
				const {data: response} = await axios.get(apiUrl);
				dispatch(setUser(response));
				dispatch(setRefresh());
			} catch (error) {
				// console.error(error.message);
			}
		}

		fetchData();
	}

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<h2>Users List</h2>
					<div className={styles.ico} onClick={() => dispatch(setRefresh())}><FontAwesomeIcon icon={faRotate} /></div>
				</div>
				<div className={styles.list}>
					{usersList && usersList.map((user, idx) => <User key={idx} data={user} deleteUser={deleteUser} modifyUser={modifyUser} />)}
				</div>
			</div>
		</div>
  	)				
}

export default List