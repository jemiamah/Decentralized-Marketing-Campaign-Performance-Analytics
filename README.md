# Decentralized Marketing Campaign Performance Analytics

A comprehensive blockchain-based analytics platform for marketing campaign performance tracking, analysis, and optimization using Clarity smart contracts.

## Overview

This system provides a decentralized solution for marketing analytics that ensures data integrity, transparency, and automated insights generation. The platform consists of five interconnected smart contracts that handle different aspects of marketing analytics.

## Architecture

### Smart Contracts

1. **Analytics Provider Verification** (`analytics-provider-verification.clar`)
    - Validates and manages marketing analytics providers
    - Maintains provider reputation scores
    - Handles provider verification process

2. **Data Collection** (`data-collection.clar`)
    - Collects campaign performance data from verified providers
    - Manages campaign lifecycle
    - Stores performance metrics (impressions, clicks, conversions, spend)

3. **Analysis Automation** (`analysis-automation.clar`)
    - Automates performance analysis of campaign data
    - Calculates key metrics (CTR, CPC, ROAS)
    - Generates performance scores based on configurable thresholds

4. **Reporting Generation** (`reporting-generation.clar`)
    - Generates comprehensive performance reports
    - Assigns performance grades (A-F scale)
    - Maintains report history and summaries

5. **Optimization Recommendation** (`optimization-recommendation.clar`)
    - Provides automated optimization recommendations
    - Prioritizes recommendations based on impact
    - Suggests improvements for CTR, CPC, and conversion optimization

## Key Features

- **Decentralized Data Storage**: All campaign data stored on-chain for transparency
- **Provider Verification**: Ensures data quality through verified analytics providers
- **Automated Analysis**: Real-time performance scoring and analysis
- **Smart Recommendations**: AI-driven optimization suggestions
- **Performance Grading**: Easy-to-understand A-F performance grades
- **Configurable Thresholds**: Customizable performance benchmarks

## Getting Started

### Prerequisites

- Clarity development environment
- Stacks blockchain testnet access

### Deployment

1. Deploy contracts in the following order:
   \`\`\`bash
   # Deploy provider verification first
   clarinet deploy analytics-provider-verification.clar

   # Deploy data collection
   clarinet deploy data-collection.clar

   # Deploy analysis automation
   clarinet deploy analysis-automation.clar

   # Deploy reporting generation
   clarinet deploy reporting-generation.clar

   # Deploy optimization recommendations
   clarinet deploy optimization-recommendation.clar
   \`\`\`

### Usage Example

1. **Register as Analytics Provider**:
   \`\`\`clarity
   (contract-call? .analytics-provider-verification register-provider "MyAnalytics")
   \`\`\`

2. **Create Campaign**:
   \`\`\`clarity
   (contract-call? .data-collection create-campaign "Summer Sale 2024" u1000 u50000)
   \`\`\`

3. **Submit Performance Data**:
   \`\`\`clarity
   (contract-call? .data-collection submit-performance-data u1 u1 u10000 u250 u25 u1125)
   \`\`\`

4. **Run Analysis**:
   \`\`\`clarity
   (contract-call? .analysis-automation run-analysis u1)
   \`\`\`

5. **Generate Report**:
   \`\`\`clarity
   (contract-call? .reporting-generation generate-report u1 "monthly" u75)
   \`\`\`

## Performance Metrics

The system tracks and analyzes the following key performance indicators:

- **Impressions**: Number of ad views
- **Clicks**: Number of ad clicks
- **Conversions**: Number of successful actions
- **Spend**: Total advertising spend
- **CTR**: Click-through rate (clicks/impressions)
- **CPC**: Cost per click (spend/clicks)
- **ROAS**: Return on ad spend (conversions/spend)

## Performance Scoring

The system uses a 100-point scoring system based on:
- CTR performance (30 points max)
- CPC efficiency (30 points max)
- ROAS effectiveness (40 points max)

Performance grades are assigned as follows:
- A: 80-100 points (Excellent)
- B: 60-79 points (Good)
- C: 40-59 points (Average)
- D: 20-39 points (Below Average)
- F: 0-19 points (Poor)

## Optimization Recommendations

The system provides three types of optimization recommendations:

1. **CTR Optimization**: Improve ad creative and targeting
2. **Cost Optimization**: Optimize bidding strategies
3. **Conversion Optimization**: Improve landing pages and funnels

Each recommendation includes:
- Priority level (1-5 scale)
- Expected improvement percentage
- Detailed description of suggested actions

## Testing

Run the test suite using:
\`\`\`bash
npm test
\`\`\`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions, please open an issue in the GitHub repository.
