const { writeFile, appendFile, readFile } = require("./fileFunctions")

async function main() {
    try {
        await writeFile("file.txt", "Test Write")
        await appendFile("file.txt", "Append File")
        await readFile("file.txt")
    } catch (err) {
        console.log(err)
    }
}

main()