import React from 'react';
import '../styles/PeriodicTable.scss';
import Element from './Element';
import TableHead from './TableHead';
import Minimap from './Minimap';

import data from '../data/data.json';
const elements = data.elements;

class PeriodicTable extends React.Component{

	constructor(props) {
		super(props);

		this.state = {
			formatted_elements: [],
			highlighted_period: null,
			highlighted_column: null,
			highlighted_other: null
		};
		
		this.handleElementClick = this.handleElementClick.bind(this);
		this.handleColheadMouseOver = this.handleColheadMouseOver.bind(this);
		this.handleColheadMouseOut = this.handleColheadMouseOut.bind(this);
		this.handleGroupMouseOver = this.handleGroupMouseOver.bind(this);
		this.handleGroupMouseOut = this.handleGroupMouseOut.bind(this);
	}

	componentDidMount() {
		
		// Loop through each element to reformat some data

		let actinides = [];
		let lanthanides = [];

		let i = elements.length;
		while (i--) {

			// comma separate electron shells
			const electronShells = elements[i].shells.join(', ');
			elements[i].shells = electronShells;

			// reformat electron configuration
			const electronConf = elements[i].electron_configuration.split(' ');
			let electronConfString = '';
			electronConf.forEach(function (el) {

				let supChars = 1;
				if (el.length === 4) { supChars = 2; }

				electronConfString += el.slice(0, -supChars);
				electronConfString += '<sup>';
				electronConfString += el.slice(el.length - supChars);
				electronConfString += '</sup> ';
			});
			elements[i].electron_configuration = electronConfString;

			// Capitalise appearance and category
			if (elements[i].appearance) {
				const appearance = capitaliseFirstLetter(elements[i].appearance);
				elements[i].appearance = appearance;
			}

			if (elements[i].category) {
				const category = capitaliseFirstLetter(elements[i].category);
				elements[i].category_fmt = category;
			}

			// Normalise nonmetals
			if (elements[i].category === 'diatomic nonmetal' || elements[i].category === 'polyatomic nonmetal') {
				elements[i].category = 'nonmetal';
			}


			// Strip out Actinides and Lathanides (as they're displayed separately)
			if (elements[i].category === 'actinide') {
				actinides.unshift(elements[i]);
				elements.splice(i, 1);
			} else if (elements[i].category === 'lanthanide') {
				lanthanides.unshift(elements[i]);
				elements.splice(i, 1);
			}
		}

		let formatted_elements = elements.concat(lanthanides, actinides);

		// Insert spaces into elements array to correctly lay out table

		insertBlanks(1, 16, formatted_elements);
		insertBlanks(20, 10, formatted_elements);
		insertBlanks(38, 10, formatted_elements);
		insertBlanks(124, 20, formatted_elements);
		insertBlanks(159, 3, formatted_elements);

		insertPlaceholder('Lanthanides', 'lanthanide', 92, formatted_elements);
		insertPlaceholder('Actinides', 'actinide', 110, formatted_elements);

		// TODO: Reformat electron configuration here

		this.setState({
			formatted_elements: formatted_elements
		});

	}

	handleElementClick(data) {
		this.props.handleElementClick(data);
	}

	handleColheadMouseOver(num) {
		this.setState({
			highlighted_column: num
		});
	}

	handleColheadMouseOut() {
		this.setState({
			highlighted_column: null
		});
	}

	handleGroupMouseOver(group) {
		this.setState({
			highlighted_other: group
		})
	}

	handleGroupMouseOut() {
		this.setState({
			highlighted_other: null
		})
	}
	
	render() {

		let classes = ['PeriodicTable'];
		if (this.state.highlighted_column || this.state.highlighted_period || this.state.highlighted_other) { classes.push('highlight_active'); }

		return (
			<div className={classes.join(' ')}>
				<TableHead handleMouseOver={this.handleColheadMouseOver} handleMouseOut={this.handleColheadMouseOut} />
				<Minimap handleMouseOver={this.handleGroupMouseOver} handleMouseOut={this.handleGroupMouseOut} />
				<div className="elements">
					{this.state.formatted_elements.map((element) =>
						<Element key={element.number} data={element} handleElementClick={this.handleElementClick} handleMouseOver={this.handleGroupMouseOver} handleMouseOut={this.handleGroupMouseOut} highlight={
							((element.period === this.state.highlighted_period || element.xpos === this.state.highlighted_column) && element.category !== 'lanthanide' && element.category !== 'actinide')
							||
							(element.category === this.state.highlighted_other)
						} />
					)}
				</div>
			</div>
		);

	}

}



let nextBlankId = 200;

function insertBlanks(start, num_blanks, data) {
	for (let x = 0; x < num_blanks; x++) {
		data.splice(start, 0, { "name": "Blank", "number": nextBlankId });
		nextBlankId++;
	}
	return data;
}

function insertPlaceholder(name, category, start, data) {
	data.splice(start, 0, { "name": name, "number": nextBlankId, "category": category });
	nextBlankId++;
	return data;
}

function capitaliseFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.substring(1);
}

export default PeriodicTable;