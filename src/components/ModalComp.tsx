import styles from "./ModalComp.module.css"

export type TModalProps = {
	showModal: boolean
	toggleModal: React.Dispatch<React.SetStateAction<boolean>>
	moves: number
	mistakes: number
	pairs: { matched: number; total: number }
}

const getEmojiForMistakes = (mistakes: number) => {
	if (mistakes <= 2) return "🏆"
	if (mistakes <= 4) return "😄"
	if (mistakes <= 7) return "🙂"
	if (mistakes <= 10) return "😐"
	return "😵"
}

const ModalComp = ({ showModal, toggleModal, moves, mistakes, pairs }: TModalProps) => {
	const handleClose = () => toggleModal(false)
	const emoji = getEmojiForMistakes(mistakes)
	const title = pairs.matched === pairs.total ? "Final Score" : "Memory Game"

	return (
		<section
			className={styles.final_result}
			role="dialog"
			aria-modal="true"
			aria-hidden={!showModal}
			style={{ visibility: showModal ? "visible" : "hidden" }}
		>
			<button onClick={handleClose} className={styles.final_btn} aria-label="Close dialog">X</button>
			<div className={styles.final_container}>
				<h2>{title}</h2>
				<span className={styles.final_score}>
					Moves: {moves} • Misses: {mistakes} • Pairs: {pairs.matched}/{pairs.total}
				</span>
				<span className={styles.final_icon} aria-label="Performance rating emoji">
					{emoji}
				</span>
				<button onClick={handleClose} className={styles.final_text} aria-label="Start new game">
					Click to start {pairs.matched === pairs.total ? "again" : "the game"}
				</button>
			</div>
		</section>
	)
}

export default ModalComp
