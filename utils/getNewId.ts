function* generateId() {
    let index = 0
    while (true) yield index++
}
const generator = generateId()

const getNewId: () => number = () => {
    return generator.next().value as number
}

export default getNewId
