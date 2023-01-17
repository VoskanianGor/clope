import Transaction from './interfaces/transaction'

class Cluster {
	public s
	public w
	public n
	public occ
	private r

	constructor(r: number) {
		this.s = 0
		this.w = 0
		this.n = 0
		this.occ = new Map<string, number>()
		this.r = r
	}

	public add(transaction: Transaction) {
		this.s += transaction.length
		this.n += 1

		for (const t of transaction) {
			if (this.occ.has(t)) {
				this.occ.set(t, this.occ.get(t)! + 1)
			} else {
				this.occ.set(t, 1)
				this.w += 1
			}
		}
	}

	public remove(transaction: Transaction) {
		this.s -= transaction.length
		this.n -= 1

		for (const t of transaction) {
			if (this.occ.has(t)) {
				this.occ.set(t, this.occ.get(t)! - 1)
			} else {
				this.occ.delete(t)
				this.w -= 1
			}
		}
	}

	public deltaAdd(transaction: Transaction) {
		let sNew = this.s + transaction.length
		let wNew = this.w

		for (const t of transaction) {
			if (!this.occ.has(t)) wNew += 1
		}

		const res =
			(sNew * (this.n + 1)) / wNew ** this.r -
			(this.s * this.n) / this.w ** this.r

		return res
	}
}

export default Cluster
