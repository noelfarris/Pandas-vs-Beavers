(function() {
var React = require('react');
var ReactDOM = require('react-dom');

var HomeComponent = React.createClass({
	render: function(){
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
            activePlayer: 'Pandas', 
            winnerElement: null,
            counter: 8
        }
    },
    switchPlayer: function() {
    		//Creating Function to switch player on the parent element to use once move has been
    		//made on the TileComponent.
			if(this.state.activePlayer == 'Pandas'){
				this.setState({ activePlayer: 'Beavers' });
			}else{
				this.setState({ activePlayer: 'Pandas' });
			}
    },

    setTiles: function(position, value){
    		//Setting the state on the tiles position
			var myTiles = this.state.tiles
			myTiles[position] = value;
			this.setState({tiles: myTiles});
    },
    checkWinner: function(){
    	console.log(this.state.counter);
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
    },

    resetGame: function() {
            this.setState(this.getInitialState());
    },

	render: function(){
		//mapping through the tile board, passing elements through to the Tile Component
		var gBTiles = this.state.tiles
			.map((tile, position) => {
			return(
				<TileComponent key={position} pos={position} tiles={tile} player={this.state.activePlayer} 
				switchPlayer={this.switchPlayer} checkWinner={this.checkWinner} 
				setTiles={this.setTiles} resetAction={this.resetGame}/>
			);
		});
		if(!this.state.winnerElement){
			var currentTurn = 
				<h5>Your turn: {this.state.activePlayer}</h5>
		}else{
			currentTurn =
				<div>
					<h2>{this.state.winnerElement} win!</h2>
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
			playerOne: <div className="animalIconsPanda"></div>,
			playerTwo: <div className="animalIconsBeaver"></div>,

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
			return;
		}
		if(this.props.player == 'Pandas'){
			this.setState({ tiles: this.state.playerOne });
			this.props.setTiles(this.props.pos, 'Pandas');
		}
		else{
			this.setState({ tiles: this.state.playerTwo });
			this.props.setTiles(this.props.pos, 'Beavers');
		}
		this.props.setTiles(this.props.key);
		this.props.switchPlayer();
		this.props.checkWinner();
	}
	
})

ReactDOM.render(
	<HomeComponent />,
	document.getElementById('app')
	)
})();