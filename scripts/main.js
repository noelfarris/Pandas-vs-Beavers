'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var panda = require('../images/panda.png');
var beaver = require('../images/beaver.png');
var playerOne = <div id="x" className=""><img src={panda}/></div>
var playerTwo = <div id="o" className=""><img src={beaver}/></div>

var GameBoard = React.createClass({

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
	}

	move(place, change) {
		var spaces = this.state.spaces;
		if(spaces[place] !== '') {
			return;
		}
		spaces[place] = change;
		this.setState({spaces: spaces, turn: change === playerOne ? playerTwo : playerOne})
	}

	render() {

	}
})


var Mark = React.createClass({
	makeMark() {
		this.props.move(this.props.turn, this.props.key)
	}

	render() {
		if(this.props.)
		return (
			<div onClick={this.makeMark}>
				{}
		)
	}
})