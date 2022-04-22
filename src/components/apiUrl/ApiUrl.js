import { useSelector, useDispatch } from 'react-redux'
import { setUrl } from '../../redux/apiSlice'
import styles from './ApiUrl.module.scss'

function ApiUrl() {
	const {url} = useSelector((state) => state.api)
	const dispatch = useDispatch()	

	const handleChange = (event) => {
		dispatch(setUrl(event.target.value));
	}	

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				<div>
					API URL:<br/>
				</div>
				<div>
					<input 
						type="text" 
						name="url" 
						value={url}
						className={styles.apiUrl}
						onChange={handleChange}
					/>
				</div>
			</div>
		</div>
	)	
}

export default ApiUrl;
