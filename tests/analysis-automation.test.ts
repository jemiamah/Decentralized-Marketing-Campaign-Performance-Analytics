import { describe, it, expect, beforeEach } from "vitest"

describe("Analysis Automation Contract", () => {
  let contractState
  
  beforeEach(() => {
    contractState = {
      analysisResults: new Map(),
      thresholds: {
        minCtr: 200, // 2%
        maxCpc: 500, // $5.00
        minRoas: 200, // 2.00
      },
      currentBlock: 1000,
    }
  })
  
  describe("Performance Score Calculation", () => {
    it("should calculate perfect score for excellent metrics", () => {
      const ctr = 300 // 3%
      const cpc = 400 // $4.00
      const roas = 300 // 3.00
      
      const score = calculatePerformanceScore(contractState, ctr, cpc, roas)
      
      expect(score).toBe(100) // 30 + 30 + 40
    })
    
    it("should calculate partial score for mixed metrics", () => {
      const ctr = 150 // 1.5% (below threshold)
      const cpc = 400 // $4.00 (good)
      const roas = 300 // 3.00 (good)
      
      const score = calculatePerformanceScore(contractState, ctr, cpc, roas)
      
      expect(score).toBe(70) // 0 + 30 + 40
    })
    
    it("should calculate zero score for poor metrics", () => {
      const ctr = 100 // 1% (below threshold)
      const cpc = 600 // $6.00 (above threshold)
      const roas = 150 // 1.50 (below threshold)
      
      const score = calculatePerformanceScore(contractState, ctr, cpc, roas)
      
      expect(score).toBe(0) // 0 + 0 + 0
    })
  })
  
  describe("Analysis Execution", () => {
    it("should run analysis and store results", () => {
      const campaignId = 1
      
      const result = runAnalysis(contractState, campaignId)
      
      expect(result.success).toBe(true)
      expect(result.performanceScore).toBeGreaterThan(0)
      
      const key = `${campaignId}-${contractState.currentBlock}`
      expect(contractState.analysisResults.has(key)).toBe(true)
      
      const analysis = contractState.analysisResults.get(key)
      expect(analysis.avgCtr).toBeDefined()
      expect(analysis.avgCpc).toBeDefined()
      expect(analysis.avgRoas).toBeDefined()
      expect(analysis.performanceScore).toBeDefined()
    })
    
    it("should store comprehensive analysis data", () => {
      const campaignId = 1
      runAnalysis(contractState, campaignId)
      
      const key = `${campaignId}-${contractState.currentBlock}`
      const analysis = contractState.analysisResults.get(key)
      
      expect(analysis.totalImpressions).toBe(10000)
      expect(analysis.totalClicks).toBe(250)
      expect(analysis.totalConversions).toBe(25)
      expect(analysis.totalSpend).toBe(1125)
    })
  })
  
  describe("Threshold Management", () => {
    it("should update thresholds successfully", () => {
      const newMinCtr = 300
      const newMaxCpc = 400
      const newMinRoas = 250
      
      const result = updateThresholds(contractState, newMinCtr, newMaxCpc, newMinRoas)
      
      expect(result.success).toBe(true)
      expect(contractState.thresholds.minCtr).toBe(newMinCtr)
      expect(contractState.thresholds.maxCpc).toBe(newMaxCpc)
      expect(contractState.thresholds.minRoas).toBe(newMinRoas)
    })
    
    it("should return current thresholds", () => {
      const thresholds = getThresholds(contractState)
      
      expect(thresholds.minCtr).toBe(200)
      expect(thresholds.maxCpc).toBe(500)
      expect(thresholds.minRoas).toBe(200)
    })
  })
  
  describe("Analysis Results Retrieval", () => {
    beforeEach(() => {
      runAnalysis(contractState, 1)
    })
    
    it("should retrieve analysis results", () => {
      const results = getAnalysisResults(contractState, 1, contractState.currentBlock)
      
      expect(results).toBeDefined()
      expect(results.performanceScore).toBeGreaterThan(0)
      expect(results.avgCtr).toBeDefined()
    })
    
    it("should return null for non-existent analysis", () => {
      const results = getAnalysisResults(contractState, 999, 999)
      
      expect(results).toBeNull()
    })
  })
})

// Helper functions
function calculatePerformanceScore(state, ctr, cpc, roas) {
  const ctrScore = ctr >= state.thresholds.minCtr ? 30 : 0
  const cpcScore = cpc <= state.thresholds.maxCpc ? 30 : 0
  const roasScore = roas >= state.thresholds.minRoas ? 40 : 0
  
  return ctrScore + cpcScore + roasScore
}

function runAnalysis(state, campaignId) {
  // Mock data for testing
  const mockCtr = 250 // 2.5%
  const mockCpc = 450 // $4.50
  const mockRoas = 300 // 3.00
  const mockImpressions = 10000
  const mockClicks = 250
  const mockConversions = 25
  const mockSpend = 1125
  
  const performanceScore = calculatePerformanceScore(state, mockCtr, mockCpc, mockRoas)
  
  const key = `${campaignId}-${state.currentBlock}`
  state.analysisResults.set(key, {
    avgCtr: mockCtr,
    avgCpc: mockCpc,
    avgRoas: mockRoas,
    totalImpressions: mockImpressions,
    totalClicks: mockClicks,
    totalConversions: mockConversions,
    totalSpend: mockSpend,
    performanceScore: performanceScore,
  })
  
  return { success: true, performanceScore }
}

function updateThresholds(state, minCtr, maxCpc, minRoas) {
  state.thresholds.minCtr = minCtr
  state.thresholds.maxCpc = maxCpc
  state.thresholds.minRoas = minRoas
  
  return { success: true }
}

function getThresholds(state) {
  return { ...state.thresholds }
}

function getAnalysisResults(state, campaignId, timestamp) {
  const key = `${campaignId}-${timestamp}`
  return state.analysisResults.get(key) || null
}
