import * as core from '@actions/core'
import * as glob from 'glob'
import * as shell from 'shelljs'

function splitChunks(items: string[], total: number) {
    let chunks: string[][] = []

    let currentChunk = 0
    for (let currentItem = 0; currentItem < items.length; currentItem++) {
        if (!chunks[currentChunk]) {
            chunks[currentChunk] = []
        }

        chunks[currentChunk].push(items[currentItem])

        currentChunk++;
        if (currentChunk >= total) {
            currentChunk = 0
        }
    }

    return chunks;
}

function run() {
    try {
        const ciIndex = Number(core.getInput('ci_index'))
        const ciTotal = Number(core.getInput('ci_total'))
        const path = core.getInput('path')
        const cmd = core.getInput('cmd')
        // if (!ciIndex) {
        //     throw new Error(`No input ci_index defined`)
        // }
        // if (!ciTotal) {
        //     throw new Error(`No input ci_total defined`)
        // }
        // if (!path) {
        //     throw new Error(`No input path defined`)
        // }
        // if (!cmd) {
        //     throw new Error(`No input cmd defined`)
        // }
        const files = glob.sync(path)
        const chunks = splitChunks(files, ciTotal)

        if (chunks[ciIndex]) {
                if (shell.exec(cmd + ' ' + chunks[ciIndex]).code !== 0) {
                    throw new Error()
                }
        }
    }
    catch (error) {
        core.setFailed(error.message)
    }
}

run()