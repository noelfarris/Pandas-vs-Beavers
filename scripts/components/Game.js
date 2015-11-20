var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
	render: function(){
		return (
			<div>
				<div className="header">
					<div className="container">
						<div className="row">
							<h1>Quic-Tac-Toe</h1>
							<h4>Built by Leslie Sutton</h4>
							<h5>248-974-4752</h5>
							<div>
								<a target="_blank" href="https://www.linkedin.com/in/lesliecsutton">linkedin</a>
							</div>
							<div>
								<a target="_blank" href="https://github.com/suttonofswat/react-tic-tac-toe">github Project</a>
							</div>
						</div>
					</div>
				</div>
				<div>
					<GameBoardComponent />
							
				</div>
			</div>
		);
	}
	
})

var GameBoardComponent = React.createClass({
	getInitialState: function() {
        return {
            //Initial state of the game board
            tiles:  [
                '', '', '',
                '', '', '',
                '', '', ''
            ],
            //Initial state of the player
            activePlayer: 'player one', 
            winnerElement: null
        }
    },
    switchPlayer: function() {
    		//Creating Function to switch player on the parent element to use once move has been
    		//made on the TileComponent.
			if(this.state.activePlayer == 'player one'){
				this.setState({ activePlayer: 'player two' });
			}else{
				this.setState({ activePlayer: 'player one' });
			}
    },

    setTiles: function(position, value){
    		//Setting the state on the tiles position
			var myTiles = this.state.tiles
			myTiles[position] = value;
			this.setState({tiles: myTiles});
    },
    checkWinner: function(){
    	 // Running through the positions of the tiles to declare a winner
    	if(this.state.tiles[0] == this.state.tiles[1] 
    		&& this.state.tiles[1] == this.state.tiles[2]){
    			this.setState({winnerElement: this.state.tiles[0]})
				return this.state.tiles[0];
				console.log(this.state.tiles[0]);


								
				
    	}else if(this.state.tiles[3] == this.state.tiles[4] 
    		&& this.state.tiles[4] == this.state.tiles[5]){
				this.setState({winnerElement: this.state.tiles[3]})
				return this.state.tiles[3];	
				console.log(this.state.tiles[3]);		
								
				
    	}else if(this.state.tiles[6] == this.state.tiles[7] 
    		&& this.state.tiles[7] == this.state.tiles[8]){
				this.setState({winnerElement: this.state.tiles[6]})
				return this.state.tiles[6];	
				console.log(this.state.tiles[6]);		
								
				
    	}else if(this.state.tiles[2] == this.state.tiles[4] 
    		&& this.state.tiles[4] == this.state.tiles[6]){
    			this.setState({winnerElement: this.state.tiles[2]})
				return this.state.tiles[2];	
				console.log(this.state.tiles[2]);		
								
				
    	}else if(this.state.tiles[0] == this.state.tiles[4] 
    		&& this.state.tiles[4] == this.state.tiles[8]){
    			this.setState({winnerElement: this.state.tiles[0]})
				return this.state.tiles[0];	
				console.log(this.state.tiles[0]);		
								
				
    	}else if(this.state.tiles[0] == this.state.tiles[3] 
    		&& this.state.tiles[3] == this.state.tiles[6]){
    			this.setState({winnerElement: this.state.tiles[0]})
				return this.state.tiles[0];	
				console.log(this.state.tiles[0]);		
								
				
    	}else if(this.state.tiles[1] == this.state.tiles[4] 
    		&& this.state.tiles[4] == this.state.tiles[7]){
    			this.setState({winnerElement: this.state.tiles[1]})
				return this.state.tiles[1];	
				console.log(this.state.tiles[1]);		
								
				
    	}else if(this.state.tiles[2] == this.state.tiles[5] 
    		&& this.state.tiles[5] == this.state.tiles[8]){
    			this.setState({winnerElement: this.state.tiles[2]})
				return this.state.tiles[2];	
				console.log(this.state.tiles[2]);		
								
				
    	}
    	return null;
    },

	render: function(){
		//mapping through the tile board, passing elements through to the Tile Component
		var gBTiles = this.state.tiles
			.map((tile, position) => {
			return(
				<TileComponent key={position} pos={position} tiles={tile} player={this.state.activePlayer} 
				switchPlayer={this.switchPlayer} checkWinner={this.checkWinner} 
				setTiles={this.setTiles}/>
			);
		});
		if(!this.state.winnerElement){
			var currentTurn = 
				<h5>Current Turn: {this.state.activePlayer}</h5>
		}else{
			currentTurn =
				<div>
					<h2>{this.state.winnerElement} wins!</h2>
				</div>
		}

		return (
			<div className="gameBoard">
				<div>
					<div>{currentTurn}</div>
				</div>
				{gBTiles}
				
			</div>
		);
	}
});


var TileComponent = React.createClass({
	getInitialState: function(){
		//Initial design of players on game board
		return{
			playerOne: <span id="x" className="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>,
			playerTwo: <span id="o" className="glyphicon glyphicon-record" aria-hidden="true"></span>

		}
	},

	render: function(){
		//Setting the position, click event and design for the tiles
		return (
				<div className="col-xs-4 tile" id={'tiles'+ this.props.pos} onClick={this.onMove}>
					{this.state.tiles}
					<div>
					{this.state.errorElement}
					</div>
				</div>

		);
	},

onMove: function onMove(event) {
		if(this.state.tiles != undefined){
			console.log('this spot is taken')
			return;
		}
		if(this.props.player == 'player one'){
			this.setState({ tiles: this.state.playerOne });
			this.props.setTiles(this.props.pos, 'player one');
		}
		else{
			this.setState({ tiles: this.state.playerTwo });
			this.props.setTiles(this.props.pos, 'player two');
		}
		this.props.setTiles(this.props.key);
		this.props.switchPlayer();
		this.props.checkWinner();

	}
	
})