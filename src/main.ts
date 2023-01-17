import Clope from './Clope'
import DisplayResult from './DisplayResult'
import data from './transactions.json'

function main(r: number, data: string[][]) {
	const clope = new Clope(r, data)
	const res = clope.run()

	return res
}

const clusters = main(2.6, data)

const view = new DisplayResult(clusters)
view.consoleClusters()

// CLOPE algorithm is a clustering algorithm for transactional data.
