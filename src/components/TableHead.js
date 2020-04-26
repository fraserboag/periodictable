import React from 'react';
import '../styles/TableHead.scss';

class TableHead extends React.Component {

	constructor(props) {
		super(props);
		
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
	}

	handleMouseOver(num) {
		this.props.handleMouseOver(num);
	}

	handleMouseOut() {
		this.props.handleMouseOut();
	}

	render() {

		const colheads = [];

		for (let x = 1; x <= 18; x++){
			colheads.push(<div className="Element colhead" key={x} onMouseOver={() => this.handleMouseOver(x)} onMouseOut={this.handleMouseOut}>{x}</div>)
		}

		return <div><div className="TableHead">{colheads}</div></div>;
	}
}

export default TableHead;
