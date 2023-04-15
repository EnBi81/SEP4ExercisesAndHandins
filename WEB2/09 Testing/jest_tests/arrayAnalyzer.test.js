import {arrayAnalyzer} from "./arrayAnalyzer";

it('Analyze array [1, 8, 3, 4, 2, 6]', () => {
    let analyzeData = arrayAnalyzer([1, 8, 3, 4, 2, 6])

    expect(analyzeData.min).toBe(1)
    expect(analyzeData.max).toBe(8)
    expect(analyzeData.length).toBe(6)
    expect(analyzeData.average).toBe(4)
})


it('Analyze array [50]', () => {
    let analyzeData = arrayAnalyzer([50])

    expect(analyzeData.min).toBe(50)
    expect(analyzeData.max).toBe(50)
    expect(analyzeData.length).toBe(1)
    expect(analyzeData.average).toBe(50)
})

it('Analyze array []', () => {
    let analyzeData = arrayAnalyzer([])

    expect(analyzeData.min).toBe(undefined)
    expect(analyzeData.max).toBe(undefined)
    expect(analyzeData.length).toBe(0)
    expect(analyzeData.average).toBe(undefined)
})