import { readFileSync, writeFileSync } from 'fs'

const data = readFileSync('data.txt', 'utf8')

const result = data
	.split('\n')
	.filter(e => !e.includes('?'))
	.map(e => e.replace('\r', '').split(','))

writeFileSync('transactions.json', JSON.stringify(result), 'utf8')
