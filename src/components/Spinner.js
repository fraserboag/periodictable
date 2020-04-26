import React from 'react';
import '../styles/Spinner.scss';

class Spinner extends React.Component {
	render() {
		return (
			<div className="spinner-container">
				<svg className="spinner" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" /></svg>
			</div>
		);
	}
}

export default Spinner;
