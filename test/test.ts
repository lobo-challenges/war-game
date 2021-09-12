var assert = require('assert');
import { Deck, Game, Rank, Suit } from "../entities"

describe('Deck', function() {
  describe('cards property state is changing accordingly to Deck methods', function() {
    let testNumber = 0

    let ranks: Array<Rank> = []
    let suits: Array<Suit> = []
    let deck: Deck
    beforeEach(() => {
      // setup
      testNumber++
      for(let i=1; i<=13; i++){
        ranks.push(i)
      }
      suits = ['d' , 'h' , 'c' , 's']
      deck = new Deck({ranks, suits})
    })
    
    it('cards array is not empty, using method isEmpty', () => {
      assert.equal(deck.isEmpty(), false)
    });
 
    it('cards array has the expected length given inputs combination', () => {
      let cardsNumber = ranks.length * suits.length
      assert.equal(deck.cards.length, cardsNumber)
    });

})
  
});