import { useEffect, useMemo, useState } from "react"
import CardComp from "./components/CardComp"
import cards from "./data/cards.json"
import type { TCard, TCardList } from "./types/card.types"
import ModalComp from "./components/ModalComp"

const App = () => {
	// total unique pairs in the deck
	const totalPairs = useMemo(() => cards.length, [])
	// Create pairs of cards
	const createGameCards = (): TCardList => {
		const pairs = cards.flatMap((card) => [
			{ ...card, id: card.id },
			{ ...card, id: card.id + 100 },
		])
		return pairs
	}

	// Shuffle cards
	const shuffleCards = (cards: TCardList): TCardList => {
		// Fisher–Yates style shuffle (non-mutating)
		const arr = [...cards]
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1))
			;[arr[i], arr[j]] = [arr[j], arr[i]]
		}
		return arr
	}

	// Game cards state
	const [gameCards, setGameCards] = useState<TCardList>(
		shuffleCards(createGameCards())
	)
	// flipped cards with an array of cards names
	const [flippedCards, setFlippedCards] = useState<TCard["name"][]>([])
	// track ids selected in current turn to avoid double clicking the same card
	const [selectedIds, setSelectedIds] = useState<number[]>([])

	// number of moves
	const [moves, setMoves] = useState(0)

	// number of mistakes (mismatches)
	const [mistakes, setMistakes] = useState(0)

	// number of matches
	const [matches, setMatches] = useState(0)

	// game state (true shows modal; used for start screen and final score)
	const [gameOver, setGameOver] = useState(true)

	const resetGame = () => {
		setGameCards(shuffleCards(createGameCards()))
		setFlippedCards([])
		setMoves(0)
		setMatches(0)
		setMistakes(0)
	}

	const handleCardClick = (clickedCard: TCard) => {
		// block input if game not started or resolving
		if (gameOver) return
		// already matched or already face-up
		if (clickedCard.matched || clickedCard.flipped) return
		// at most 2 cards at a time
		if (flippedCards.length === 2) return
		// prevent selecting the same card twice in a turn
		if (selectedIds.includes(clickedCard.id)) return

		// Flip the specific card to face-up (no toggle to avoid double-click issues)
		setGameCards((prev) =>
			prev.map((card) =>
				card.id === clickedCard.id ? { ...card, flipped: true } : card
			)
		)
		setFlippedCards((prev) => [...prev, clickedCard.name])
		setSelectedIds((prev) => [...prev, clickedCard.id])
	}

	useEffect(() => {
		if (flippedCards.length !== 2) return

		setMoves((prev) => prev + 1)
		const [firstName, secondName] = flippedCards

		if (firstName === secondName) {
			// Match found: mark all cards with that name as matched
			setGameCards((prev) =>
				prev.map((card) =>
					card.name === firstName ? { ...card, matched: true } : card
				)
			)
			// Increment matches and possibly end game
			setMatches((prev) => {
				const next = prev + 1
				if (next === totalPairs) {
					setGameOver(true)
				}
				return next
			})
			setFlippedCards([])
			setSelectedIds([])
		} else {
			// No match: increment mistakes and flip both back after ~1s
			setMistakes((prev) => prev + 1)
			const toFlipBack = new Set(flippedCards)
			setTimeout(() => {
				setGameCards((prev) =>
					prev.map((card) =>
						toFlipBack.has(card.name) ? { ...card, flipped: false } : card
					)
				)
				setFlippedCards([])
				setSelectedIds([])
			}, 1000)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [flippedCards])

	// Start a new game whenever the modal is closed (gameOver -> false)
	useEffect(() => {
		if (!gameOver) {
			resetGame()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameOver])

	return (
		<div className="main_section">
			<h1>Memory Game</h1>
			<p>Moves: {moves} | Misses: {mistakes} | Pairs: {matches}/{totalPairs}</p>
			<div className="card_container">
				{gameCards.map((card: TCard) => {
					return (
						<CardComp card={card} clickProp={handleCardClick} key={card.id} />
					)
				})}
			</div>
			<ModalComp
				showModal={gameOver}
				toggleModal={setGameOver}
				moves={moves}
				mistakes={mistakes}
				pairs={{ matched: matches, total: totalPairs }}
			/>
		</div>
	)
}

export default App
