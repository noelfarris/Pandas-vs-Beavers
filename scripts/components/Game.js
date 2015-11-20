var React = require('react');

module.exports = React.createClass({

	getInitialState() {
	    return {
	        spaces: [
	        	'','','',
	        	'','','',
	        	'','',''
	        ],
	        turn: playerOne,
	        winner: null  
	    };
	},
})