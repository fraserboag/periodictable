import React from 'react';
import '../styles/Overlay.scss';

class Overlay extends React.Component {
	render() {
		let classes = ['Overlay'];
		if (this.props.visible) { classes.push('visible'); }
		if (this.props.block_click) { classes.push('blockclick'); }
		return (
			<div className={classes.join(' ')} onClick={this.props.handleOverlayClick}></div>
		);
	}
}

export default Overlay;
