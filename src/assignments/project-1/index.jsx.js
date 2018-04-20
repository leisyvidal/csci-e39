import React from 'react'
import PropTypes from 'prop-types'
import Uploader from '../../ui/components/uploader.jsx'
import completedFilesList from './CompletedFilesList.jsx'
import CompletedFilesList from './CompletedFilesList.jsx';
import PendingFilesList from './PendingFilesList.jsx';

class Uploads extends React.Component {
	state = {
		selectedImage: "",
		uploaderActive: false,
	}

	onImageClick(ev) {
		this.setState( {selectedImage: ev.target} )
		console.log(ev.target)
	}

	toggleSidebar() {
		this.setState( {uploaderActive: !this.state.uploaderActive} )
		console.log(this.uploaderActive)
	}

	render() {
		const {uploads, actions} = this.props
		const pendingFiles = uploads.files.filter(({progress}) => progress && progress < 100)
		const completedFiles = uploads.files.filter(({progress}) => !progress)
		const buttonText = this.state.uploaderActive ? 'Toggle Navigation Off' : 	'Toggle Navigation On';
		const {uploaderActive} = this.state
		const url = this.state.selectedImage.url
		
		return (
			<div className="gridContainer">
				<header className="mainHeader grid" role="banner">
					<h1>Main Header</h1>
				</header>
				<nav className="mainNavigation" role="navigation">
					Navigation Here
				</nav>
				<main className="mainContent" role="main">
					Big Image
					{url &&
						<img src={url} />
					}
				</main>
				<aside className="foobar">
					{ !uploaderActive && 
						<button className="nav-button" onClick={this.toggleSidebar.bind(this)}>+ Upload Image</button>
					}
					{ !!uploaderActive && 
						<div className="uploader">
							<h2>Upload Image</h2>
							<Uploader upload={actions.upload} />
							<PendingFilesList title='In Progress' pendingFiles={pendingFiles} />
							<button className="nav-button" onClick={this.toggleSidebar.bind(this)}>Close</button>
						</div>
					}
				</aside>
				<aside className="sidebar" role="complementary">
					<CompletedFilesList title='Thumbnails' completedFiles={completedFiles} onImageClick={this.onImageClick} />
				</aside>
				<footer className="mainFooter" role="contentinfo">
					Footer Content
				</footer>
	        </div>
		)
	}
}

const statusPropType = PropTypes.shape({
	status: PropTypes.oneOf([`init`, `pending`, `success`, `failure`]).isRequired,
	message: PropTypes.string.isRequired,
})

Uploads.propTypes = {
	uploads: PropTypes.shape({
		files: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
			name: PropTypes.string.isRequired,
			progress: PropTypes.number,
			url: PropTypes.string,
			error: PropTypes.string,
		})).isRequired,
		update: statusPropType.isRequired,
		delete: statusPropType.isRequired,
		share: statusPropType.isRequired,
	}).isRequired,
	actions: PropTypes.object.isRequired,
}

export default Uploads
