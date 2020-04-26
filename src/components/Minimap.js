import React from 'react';
import '../styles/Minimap.scss';

class Minimap extends React.Component {

	constructor(props) {
		super(props);
		
		this.handleMouseOver = this.handleMouseOver.bind(this);
		this.handleMouseOut = this.handleMouseOut.bind(this);
	}

	handleMouseOver(category) {
		this.props.handleMouseOver(category);
	}

	handleMouseOut() {
		this.props.handleMouseOut();
	}

	render() {
		return (
			<div className="Minimap">
				<ul>
					<li onMouseOver={() => this.handleMouseOver('alkali metal')} onMouseOut={this.handleMouseOut}><span data-category="alkali metal"></span>Alkali Metal</li>
					<li onMouseOver={() => this.handleMouseOver('alkaline earth metal')} onMouseOut={this.handleMouseOut}><span data-category="alkaline earth metal"></span>Alkaline Earth Metal</li>
					<li onMouseOver={() => this.handleMouseOver('nonmetal')} onMouseOut={this.handleMouseOut}><span data-category="nonmetal"></span>Nonmetal</li>
					<li onMouseOver={() => this.handleMouseOver('metalloid')} onMouseOut={this.handleMouseOut}><span data-category="metalloid"></span>Metalloid</li>
					<li onMouseOver={() => this.handleMouseOver('post-transition metal')} onMouseOut={this.handleMouseOut}><span data-category="post-transition metal"></span>Post-Transition Metal</li>
					<li onMouseOver={() => this.handleMouseOver('transition metal')} onMouseOut={this.handleMouseOut}><span data-category="transition metal"></span>Transition Metal</li>
					<li onMouseOver={() => this.handleMouseOver('noble gas')} onMouseOut={this.handleMouseOut}><span data-category="noble gas"></span>Noble Gas</li>
					<li onMouseOver={() => this.handleMouseOver('lanthanide')} onMouseOut={this.handleMouseOut}><span data-category="lanthanide"></span>Lanthanides</li>
					<li onMouseOver={() => this.handleMouseOver('actinide')} onMouseOut={this.handleMouseOut}><span data-category="actinide"></span>Actinides</li>
				</ul>
			</div>
		);
	}
}

export default Minimap;