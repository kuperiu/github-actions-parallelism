import * as core from '@actions/core'
import * as glob from 'glob'

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
        if (!ciIndex) {
            throw new Error(`No input ci_index defined`)
        }
        if (!ciTotal) {
            throw new Error(`No input ci_total defined`)
        }
        if (!path) {
            throw new Error(`No input path defined`)
        }
        const files = glob.sync(path)
        const chunks = splitChunks(files, ciTotal)

        if (chunks[ciIndex]) {
            chunks[ciIndex].forEach(function (value) {
                console.log(value);
              })
        }
    }
    catch (error) {
        core.setFailed(error.message)
    }
}

run()