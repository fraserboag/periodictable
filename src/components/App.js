import React from 'react';
import '../styles/App.scss';
import PeriodicTable from './PeriodicTable';
import InfoPanel from './InfoPanel';
import Overlay from './Overlay';
import { ReactComponent as IconRotate } from '../images/icon-rotate.svg';

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selected_element: {
				"name": null, 
            	"appearance": null, 
            	"atomic_mass": null, 
            	"boil": null, 
            	"category": null, 
            	"color": null, 
            	"density": null, 
            	"discovered_by": null, 
            	"melt": null, 
            	"molar_heat": null, 
            	"named_by": null, 
            	"number": null, 
            	"period": null, 
            	"phase": null, 
            	"source": null,
            	"spectral_img": null, 
            	"summary": null,
            	"symbol": null, 
            	"xpos": null, 
            	"ypos": null, 
            	"shells": [],
            	"electron_configuration": null,
            	"electron_affinity": null,
            	"electronegativity_pauling": null,
            	"ionization_energies": []
			},
			selected_element_thumbnail: '',
			infopanel_visible: false,
			overlay_visible: false,
			overlay_block_click: false
		};
		this.handleElementClick = this.handleElementClick.bind(this);
		this.handleOverlayClick = this.handleOverlayClick.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleCloseClick = this.handleCloseClick.bind(this);
	}

	handleElementClick(data) {
		
		fetch('https://en.wikipedia.org/w/api.php?origin=*&prop=extracts|pageimages&pithumbsize=700&piprop=thumbnail|name&format=json&action=query&exintro=&titles=' + data.name)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
		
			const elementObj = Object.values(data.query.pages)[0];

			if (elementObj.hasOwnProperty('thumbnail')) {
				this.setState({
					selected_element_thumbnail: elementObj.thumbnail.source
				});
			} else {
				this.setState({
					selected_element_thumbnail: false
				});
			}

		});

		this.setState({
			selected_element: data,
			infopanel_visible: true,
			overlay_visible: true,
			overlay_block_click: true
		});
	}

	hideInfoPanel() {
		this.setState({
			infopanel_visible: false,
			overlay_visible: false
		});

		setTimeout(function () {
			this.setState({
				selected_element_thumbnail: '',
				overlay_block_click: false
			});
		}.bind(this), 500);
	}

	handleOverlayClick() {
		this.hideInfoPanel();
	}

	handleCloseClick() {
		this.hideInfoPanel();
	}

	handleKeyDown(e) {
		if (e.keyCode === 27) { // Esc
			this.hideInfoPanel();
		}
	}

	render() {
		return (
			<div className="container" onKeyDown={this.handleKeyDown} tabIndex="0">
				<div className="rotatewarning">
					<IconRotate />
					<span class="title">Please rotate your device</span>
					<p>The periodic table is much happier in landscape!</p>
				</div>
				<InfoPanel visible={this.state.infopanel_visible} data={this.state.selected_element} thumbnail={this.state.selected_element_thumbnail} handleCloseClick={this.handleCloseClick} />
				<Overlay visible={this.state.overlay_visible} block_click={this.state.overlay_block_click} handleOverlayClick={this.handleOverlayClick}  />
				<PeriodicTable handleElementClick={this.handleElementClick} />
				<div className="creditarea">
					<span className="credit">Created by <a href="https://boag.online" target="_blank" rel="noopener noreferrer">Fraser Boag</a>.  Please get in touch via my website with any corrections or feature requests.</span>
				</div>
			</div>
		);
	}

}

export default App;
