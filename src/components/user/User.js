import styles from './user.module.scss';
// get our fontawesome imports => https://fontawesome.com/v6/docs/web/use-with/react/
import { faTrashCan, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const User = ({data, deleteUser, modifyUser}) => {
	// console.log('user',data)

	const fields = ['name','zipCode','latitude','longitude','timezone'] // Helps to display the fields in order

	return (
		<div className={styles.root}>
			<div className={styles.wrapper}>
				{fields.map((field, idx) => {
					const item = Object.entries(data).find(item => item[0] === field);
					return (
						<div key={idx} className={styles.card}>
							<span>{item[0]}:</span>
							<span>{item[1]}</span>
						</div>
					)				
				})}
			</div>
			<div className={styles.actions}>
				<div className={styles.trash} onClick={() => deleteUser(data.id)}><FontAwesomeIcon icon={faTrashCan} /></div>
				<div className={styles.edit} onClick={() => modifyUser(data.id)}><FontAwesomeIcon icon={faPen} /></div>
			</div>
		</div>
	)
}

export default User	