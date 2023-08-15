export const computeDiskUsage = (available: string, total: string): number => {
    const availableGiB = toGiB(available)
    const totalGiB = toGiB(total)
    return totalGiB === 0
        ? totalGiB
        : parseFloat((((totalGiB - availableGiB) / totalGiB) * 100).toFixed(1))
}

export const toGiB = (value: string): number => {
    const [number, unit] = value.split(" ")
    if (unit === "B") {
        return parseInt(number) / 1024 / 1024 / 1024
    } else if (unit === "KiB") {
        return parseInt(number) / 1024 / 1024
    } else if (unit === "MiB") {
        return parseInt(number) / 1024
    } else if (unit === "GiB") {
        return parseInt(number)
    } else if (unit === "MiB") {
        return parseInt(number) / 1024
    } else if (unit === "TiB") {
        return parseInt(number) * 1024
    }
    return 0
}
