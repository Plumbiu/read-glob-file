import fs from 'fs'
import path from 'path'
import type { FilterPattern } from '@rollup/pluginutils'
import { createFilter, normalizePath } from '@rollup/pluginutils'

interface Options {
	depth?: number
	type?: 'json' | 'string'
	excludedDir?: FilterPattern
	name?: string
}

export function readGlobFile(p: string, filename: string, {
	depth = Number.POSITIVE_INFINITY,
	type = 'string',
	excludedDir = undefined,
	name = undefined
}: Options) {
	const result: { [key: string]: string | object } = {}
	const filter = createFilter(undefined, excludedDir, {
		resolve: false,
	})
	function readGlob(p: string) {
		if (depth <= 0) {
			return
		}
		const dirs = fs.readdirSync(p)
		for (let i = 0; i < dirs.length; i++) {
			if (!filter(dirs[i])) {
				continue
			}
			const fileDir = path.join(p, dirs[i])
			const filePath = path.join(fileDir, filename)
			if (fs.existsSync(filePath)) {
				const content = fs.readFileSync(filePath).toString()
				const normalPath = normalizePath(filePath)
				if (type === 'string') {
					result[normalPath] = content.toString()
				} else if (type === 'json') {
					const key = name ?? normalPath
					const jsonContent = JSON.parse(content)
					result[jsonContent[key] ?? normalPath] = jsonContent
				} else {
					throw new Error('暂不支持此类型')
				}
				depth--
			}
			const stat = fs.lstatSync(fileDir)
			if (stat.isDirectory()) {
				readGlob(fileDir)
			}
		}
	}
	const rootFilePath = path.join(p, filename)
	if (fs.existsSync(rootFilePath)) {
		const fileContent = fs.readFileSync(rootFilePath)
		result[rootFilePath] = fileContent.toString()
	}
	readGlob(p)
	return result
}
