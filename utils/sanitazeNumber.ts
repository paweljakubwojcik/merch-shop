export default function sanitazeNumber(number: number, precission: number = 2) {
    return Math.round(number * Math.pow(10, precission)) / Math.pow(10, precission)
}
