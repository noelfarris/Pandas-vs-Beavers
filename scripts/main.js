(function() {
var React = require('react');
var ReactDOM = require('react-dom');

var Home = React.createClass({
	render(){
		return (
			<div>
				<div className="header">
					<div className="container">
						<div className="row">
							<h1>Beavers vs Pandas</h1>
						</div>
					</div>
				</div>
				<div>
					<GameBoard />
				</div>
			</div>
		);
	}
	
})

var GameBoard = React.createClass({
	//setting the state on game spaces, player and winner
	getInitialState() {
        return {
            spaces:  [
                '', '', '',
                '', '', '',
                '', '', ''
            ],
            turn: 'Pandas', 
            winner: null
        }
    },
    switchPlayer() {
    	//Switching the turn state to the next player
			this.setState({turn: this.state.turn === 'Pandas' ? 'Beavers' : 'Pandas'})
    },

    setspaces(position, value){
    		//Setting the state on the spaces position
			var myspaces = this.state.spaces
			myspaces[position] = value;
			this.setState({spaces: myspaces,});
    },
    checkBoard(){
    	console.log(this.state.counter);
    	 //logic to check spaces for a winning combination
    	if(this.state.spaces[0] == this.state.spaces[1] 
    		&& this.state.spaces[1] == this.state.spaces[2]){
    			this.setState({winner: this.state.spaces[0]})
				return this.state.spaces[0];
				console.log(this.state.spaces[0]);


								
				
    	}else if(this.state.spaces[3] == this.state.spaces[4] 
    		&& this.state.spaces[4] == this.state.spaces[5]){
				this.setState({winner: this.state.spaces[3]})
				return this.state.spaces[3];	
				console.log(this.state.spaces[3]);		
								
				
    	}else if(this.state.spaces[6] == this.state.spaces[7] 
    		&& this.state.spaces[7] == this.state.spaces[8]){
				this.setState({winner: this.state.spaces[6]})
				return this.state.spaces[6];	
				console.log(this.state.spaces[6]);		
								
				
    	}else if(this.state.spaces[2] == this.state.spaces[4] 
    		&& this.state.spaces[4] == this.state.spaces[6]){
    			this.setState({winner: this.state.spaces[2]})
				return this.state.spaces[2];	
				console.log(this.state.spaces[2]);		
								
				
    	}else if(this.state.spaces[0] == this.state.spaces[4] 
    		&& this.state.spaces[4] == this.state.spaces[8]){
    			this.setState({winner: this.state.spaces[0]})
				return this.state.spaces[0];	
				console.log(this.state.spaces[0]);		
								
				
    	}else if(this.state.spaces[0] == this.state.spaces[3] 
    		&& this.state.spaces[3] == this.state.spaces[6]){
    			this.setState({winner: this.state.spaces[0]})
				return this.state.spaces[0];	
				console.log(this.state.spaces[0]);		
								
				
    	}else if(this.state.spaces[1] == this.state.spaces[4] 
    		&& this.state.spaces[4] == this.state.spaces[7]){
    			this.setState({winner: this.state.spaces[1]})
				return this.state.spaces[1];	
				console.log(this.state.spaces[1]);		
								
				
    	}else if(this.state.spaces[2] == this.state.spaces[5] 
    		&& this.state.spaces[5] == this.state.spaces[8]){
    			this.setState({winner: this.state.spaces[2]})
				return this.state.spaces[2];	
				console.log(this.state.spaces[2]);		
		} 
    },

	render(){
		//mapping through the tile board, passing elements through to the Tile Component
		var gBspaces = this.state.spaces
			.map((tile, position) => {
			return(
				<Tile key={position} pos={position} spaces={tile} player={this.state.turn} 
				switchPlayer={this.switchPlayer} checkBoard={this.checkBoard} 
				setspaces={this.setspaces} resetAction={this.resetGame}/>
			);
		});
		if(!this.state.winner){
			var currentTurn = 
				<h5>Your turn: {this.state.turn}</h5>
		}else{
			currentTurn =
				<div>
					<h2>{this.state.winner} win!</h2>
				</div>
		}

		return (
			<div className="gameBoard">
				<div>
					<div>{currentTurn}</div>
				</div>
				{gBspaces}
			</div>
		);
	}
});

var Tile = React.createClass({
	getInitialState(){
		//Initial design of players on game board
		return{
			playerOne: <div className="animalIconsPanda"></div>,
			playerTwo: <div className="animalIconsBeaver"></div>,

		}
	},

	render(){
		//Setting the position, click event and design for the spaces
		return (
				<div className="col-xs-4 tile" id={'spaces'+ this.props.pos} onClick={this.move}>
					{this.state.spaces}
					<div>
					{this.state.errorElement}
					</div>
				</div>

		);
	},

	move(event) {
		if(this.state.spaces != undefined){
			return;
		}
		if(this.props.player == 'Pandas'){
			this.setState({ spaces: this.state.playerOne });
			this.props.setspaces(this.props.pos, 'Pandas');
		}
		else{
			this.setState({ spaces: this.state.playerTwo });
			this.props.setspaces(this.props.pos, 'Beavers');
		}
		this.props.setspaces(this.props.key);
		this.props.switchPlayer();
		this.props.checkBoard();
	}
	
})

ReactDOM.render(
	<Home />,
	document.getElementById('app')
	)
})();