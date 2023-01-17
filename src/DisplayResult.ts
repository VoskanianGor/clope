import Cluster from './Cluster'

class DisplayResult {
	private clusters

	constructor(clusters: Cluster[]) {
		this.clusters = clusters
	}

	public consoleClusters() {
		console.table(this.clusters, ['n', 'w'])
		console.log('Where n - number of transactions, w - number of items')
		console.log(`Total: ${this.clusters.length} clusters`)
	}
}

export default DisplayResult
