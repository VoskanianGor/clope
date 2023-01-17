import Cluster from './Cluster'
import Transaction from './interfaces/transaction'

class Clope {
	private clusters: Cluster[]
	private r
	private data

	constructor(r: number, data: Transaction[]) {
		this.r = r
		this.data = data
		this.clusters = []
	}

	public init() {
		for (const t of this.data) {
			const cluster = this.profit(t)

			cluster.add(t)

			if (!this.clusters.includes(cluster)) {
				this.clusters.push(cluster)
			}
		}

		this.clusters = this.clusters.filter(cluster => cluster.n > 0)
	}

	public iterate() {
		let isMoved = true

		while (isMoved) {
			isMoved = false

			for (let i = 0; i < this.data.length; i++) {
				const t = this.data[i]
				const currentCluster = this.profit(t)

				currentCluster.remove(t)

				const newCluster = this.profit(t)

				newCluster.add(t)

				if (!this.clusters.includes(newCluster)) {
					this.clusters.push(newCluster)
				}

				if (currentCluster !== newCluster) {
					isMoved = true
				}
			}
		}
	}

	public cleanUp() {
		this.clusters = this.clusters.filter(cluster => cluster.n > 0)
	}

	public run() {
		this.init()
		this.iterate()
		this.cleanUp()

		return this.clusters
	}

	public profit(transaction: Transaction) {
		let maxProfit = 0
		let clusterWithMaxProfit: Cluster = new Cluster(this.r)

		for (const cluster of this.clusters) {
			const profit = cluster.deltaAdd(transaction)

			if (profit > maxProfit) {
				clusterWithMaxProfit = cluster
				maxProfit = profit
			}
		}

		return clusterWithMaxProfit
	}
}

export default Clope
