import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Spinner from './Spinner';
import '../styles/InfoPanel.scss';
import { ReactComponent as IconExternalLink } from '../images/icon-external-link.svg';
import { ReactComponent as IconClose } from '../images/icon-close.svg';

class InfoPanel extends React.Component {

	render() {

		let infoPanelClasses = ['InfoPanel'];
		if (this.props.visible) { infoPanelClasses.push('visible'); }

		let thumbnailClasses = ['thumbnail'];
		if (this.props.thumbnail !== "") { thumbnailClasses.push('visible'); }

		let thumbnailContainerClasses = ['thumbnail-container'];
		if (this.props.thumbnail === false) { thumbnailContainerClasses.push('hidden'); }

		let densityUnit = "g/L";
		if (this.props.data.phase === 'Solid') { densityUnit = "cm<sup>3</sup>"; }

		return (
			<div className={infoPanelClasses.join(' ')}>
				<div className={thumbnailContainerClasses.join(' ')}>
					<Spinner />
					<div className={thumbnailClasses.join(' ')} style={{ backgroundImage: 'url('+this.props.thumbnail+')' }}></div>
					<span className="close" onClick={this.props.handleCloseClick}><IconClose /></span>
				</div>
				<div className="content">
					<h2>{this.props.data.name} <span>{this.props.data.symbol}</span></h2>
					<p>{this.props.data.summary}</p>
					<table className="element-info">
						<tbody>
							{this.props.data.appearance &&
								<tr>
									<td>Appearance</td>
									<td>{this.props.data.appearance}</td>
								</tr>
							}
							<tr>
								<td>Atomic Weight</td>
								<td>{this.props.data.atomic_mass}</td>
							</tr>
							<tr>
								<td>Atomic Number</td>
								<td>{this.props.data.number}</td>
							</tr>
							<tr>
								<td>Period</td>
								<td>{this.props.data.period}</td>
							</tr>
							<tr>
								<td>Category</td>
								<td>{this.props.data.category_fmt}</td>
							</tr>
							<tr>
								<td>Electron Configuration</td>
								<td>{ReactHtmlParser(this.props.data.electron_configuration)}</td>
							</tr>
							<tr>
								<td>Electrons Per Shell</td>
								<td>{this.props.data.shells}</td>
							</tr>
							<tr>
								<td>Phase at STP</td>
								<td>{this.props.data.phase}</td>
							</tr>
							{this.props.data.melt &&
								<tr>
									<td>Melting Point</td>
									<td>{this.props.data.melt} K</td>
								</tr>
							}
							{this.props.data.boil &&
								<tr>
									<td>Boiling Point</td>
									<td>{this.props.data.boil} K</td>
								</tr>
							}
							<tr>
								<td>Density at STP</td>
								<td>{this.props.data.density} {ReactHtmlParser(densityUnit)}</td>
							</tr>
							{this.props.data.molar_heat &&
								<tr>
									<td>Molar Heat Capacity</td>
									<td>{this.props.data.molar_heat} J/(mol·K)</td>
								</tr>
							}
							{this.props.data.electronegativity_pauling &&
								<tr>
									<td>Electronegativity</td>
									<td>Pauling scale: {this.props.data.electronegativity_pauling}</td>
								</tr>
							}
							{this.props.data.ionization_energies.length > 0 &&
								<tr>
									<td>Ionization Energies</td>
									<td>
										<div>1st: {this.props.data.ionization_energies[0]} kJ/mol</div>
										{this.props.data.ionization_energies.length > 1 &&
											<div>2nd: {this.props.data.ionization_energies[1]} kJ/mol</div>
										}
										{this.props.data.ionization_energies.length > 2 &&
											<div>3rd: {this.props.data.ionization_energies[2]} kJ/mol</div>
										}
									</td>
								</tr>
							}
							<tr>
								<td>More Information</td>
								<td><a href={this.props.data.source} target="_blank" rel="noopener noreferrer">Wikipedia</a><IconExternalLink className="icon" /></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		);
	}
}

export default InfoPanel;
