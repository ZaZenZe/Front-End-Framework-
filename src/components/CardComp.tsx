import type { TCard } from "../types/card.types"
import styles from "./CardComp.module.css"

export type TCardProps = {
	clickProp: (card: TCard) => void
	card: TCard
}

const CardComp = ({ clickProp, card }: TCardProps) => {
	const handleClick = () => {
		clickProp(card)
	}

	return (
		<article
			onClick={handleClick}
			aria-label={card.matched ? `${card.name} matched` : card.flipped ? card.name : "Hidden card"}
			className={`${styles.card} ${card.flipped ? styles.animate__rotate : ""} ${card.matched ? styles.matched : ""}`}
			role="button"
			tabIndex={0}
		>
			<div className={styles.inner}>
				<div className={styles.faceBack}>Memory Hero</div>
				<div className={styles.faceFront}>
					<img src={`./imgs/${card.image}`} alt={card.name} />
				</div>
			</div>
		</article>
	)
}

export default CardComp
