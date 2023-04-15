

export function arrayAnalyzer(array) {

    if(array.length === 0) {
        return {
            length: 0,
            min: undefined,
            max: undefined,
            average: undefined,
        }
    }


    return {
        length: array.length,
        min: array.reduce((m, curr) => curr < m ? curr : m),
        max: array.reduce((m, curr) => curr > m ? curr : m),
        average: array.reduce((sum, curr) => sum + curr) / array.length,
    }
}