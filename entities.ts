type Rank = number
type Suit = 'd' | 'h' | 'c' | 's'

interface Card {
  rank: Rank,
  suit: Suit
}

class Deck {
  
  cards: Array<Card> = []

  constructor(args: {ranks: Array<Rank>, suits: Array<Suit>}) {
    this.generateDeck(args)
  }
  
  generateDeck(args: {ranks: Array<Rank>, suits: Array<Suit>}) {
    args.ranks.forEach((rank) => {
      args.suits.forEach((suit) => {
        const newCard: Card = {rank, suit}
        this.cards.push(newCard)
      })
    })
  }

  isEmpty() {
    return this.cards.length === 0
  }
    
  shuffleDeck() {  
    const generateRandNumber = (min: number, max: number) => Math.floor(Math.random()*(max-min)+min)

    for (let idx = this.cards.length -1 ; idx> 0 ; idx --) {
      const newIdx = generateRandNumber(0, idx)
      const temp = this.cards[newIdx]
      this.cards[newIdx] = this.cards[idx]
      this.cards[idx] = temp
    }
  }

  drawCard() {
    const card = this.cards.pop()
    if (!card) {
      throw Error('no more cards')
    } else {
      return card
    }
  }

}

class Hand {
  cards: Array<Card>
  discard: Array<Card>
  constructor() {
    this.cards = []
    this.discard = []
  }

  isHandEmpty() {
    return this.cards.length <= 0
  }

  getFromDiscard() {
    const discardedCard = this.discard.pop()
    if (!discardedCard) {
      return undefined
    } 
    // @todo shuffle discard
    for(let idx = 0; idx < this.discard.length; idx++) {
      this.cards.push(discardedCard)
    }
    return this.drawCardFromHand()
  }

  drawCardFromHand() {
    if (!this.isHandEmpty()) {
      const card = this.cards.pop() as Card
      return card
    } else {
      return undefined
    }
  }
  
}

class Game {

  settings;

  deck: Deck;

  player1Hand: Hand;
  player2Hand: Hand;

  gameResult: 'player1 Wins' | 'player2 Wins' | 'running' | 'reset' = 'reset'

  constructor(args: {ranks: Array<Rank>, suits: Array<Suit>, deck: Deck}) {
    this.settings = args

    this.deck = args.deck
    this.player1Hand = new Hand()
    this.player2Hand = new Hand()
  }

  drawCardsToPlayers() {
    this.gameResult = 'running'
    while(this.deck.cards.length > 0) {
      this.player1Hand.cards.push(this.deck.drawCard())
      this.player2Hand.cards.push(this.deck.drawCard())
    }
  }

  
  playerPlaysACard(playerHand: Hand): Card | undefined {
    let card: Card | undefined
    card = playerHand.drawCardFromHand()
    if(!card) {
      card = playerHand.getFromDiscard()
      if (!card) {
        return undefined
      }
    }
    return card
  }
  
  stopCondition() {
    const isPlayer1HandEmpty = this.player1Hand.cards.length === 0 && this.player1Hand.discard.length === 0
    const isPlayer2HandEmpty = this.player2Hand.cards.length === 0 && this.player2Hand.discard.length === 0
    const shouldStop = isPlayer1HandEmpty || isPlayer2HandEmpty
    console.log(`Checking shouldStop: ${shouldStop}`)
    console.log(`Checking isPlayer1HandEmpty: ${isPlayer1HandEmpty}`)
    console.log(`Checking isPlayer2HandEmpty: ${isPlayer2HandEmpty}`)
    if(shouldStop) {
      if (isPlayer1HandEmpty) {
        this.gameResult = 'player2 Wins'
      }
      if (isPlayer2HandEmpty){
        this.gameResult = 'player1 Wins'
      }
      return true
    } else {
      return false
    }
  }

  playCards() {
    let card1
    let card2

    card1 = this.playerPlaysACard(this.player1Hand)
    if (!card1) {
      return 
    }
    card2 = this.playerPlaysACard(this.player2Hand)
    if (!card2) {
      return 
    }

    if (card1.rank >= card2.rank) {
      this.player1Hand.discard.push(card1)
      this.player1Hand.discard.push(card2)
    } else {
      this.player2Hand.discard.push(card1)
      this.player2Hand.discard.push(card2)
    }
  }

  run() {
    console.log(`======= Game settings`)
    console.log({settings: this.settings, deckLen: this.deck.cards.length, cards: this.deck.cards})
    
    console.log(`======= drawCardsToPlayers()`)
    this.drawCardsToPlayers()

    console.log(`player1Hand.cards, length: ${this.player1Hand.cards.length}`)
    console.log(this.player1Hand.cards.sort((a,b) => a.rank - b.rank))
    console.log('\n\n')
    console.log(`player2Hand.cards, length: ${this.player2Hand.cards.length}\n\n`)
    console.log(this.player2Hand.cards.sort((a,b) => a.rank - b.rank))
    
    console.log(`======= Playing cards`)
    while (!this.stopCondition()) {
      this.playCards()
    }
    console.log(`========== END\n\nGame result: ${this.gameResult}\n\n`)

    console.log(`player1Hand.cards, length: ${this.player1Hand.cards.length}`)
    console.log(this.player1Hand.cards.sort((a,b) => a.rank - b.rank))
    console.log(`player1Hand.discard, length: ${this.player1Hand.discard.length}`)
    console.log(this.player1Hand.discard.sort((a,b) => a.rank - b.rank))
    console.log('\n\n')
    console.log(`player2Hand.cards, length: ${this.player2Hand.cards.length}`)
    console.log(this.player2Hand.cards.sort((a,b) => a.rank - b.rank))
    console.log(`player2Hand.discard, length: ${this.player2Hand.discard.length}`)
    console.log(this.player2Hand.discard.sort((a,b) => a.rank - b.rank))
  }

}


export {Rank, Suit, Deck, Card, Hand, Game}