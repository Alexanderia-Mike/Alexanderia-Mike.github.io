export function randomSelect<T>(options: T[]): T {
    const size = options.length
    const randomIndex = Math.floor(Math.random() * size)
    return options[randomIndex]
}