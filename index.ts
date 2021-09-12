import { Deck, Game, Rank, Suit } from "./entities"

// Settings
const ranks: Array<Rank> = []
for(let i=1; i<=13; i++){
  ranks.push(i)
} 
const suits: Array<Suit> = ['d' , 'h' , 'c' , 's']
const deck = new Deck({ranks, suits})

// Game
const newGame = new Game({ranks, suits, deck})
newGame.run()

