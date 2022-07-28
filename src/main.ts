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
        console.log(ciIndex)
    }
    catch (error) {
        core.setFailed(error.message)
    }
}

run()