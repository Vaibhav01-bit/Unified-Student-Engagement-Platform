import salaryData from '../data/salary.json';

/**
 * Calculate admission probability score
 * score = (gpa/4.0)*40 + (ielts/9.0)*35 + min(experience,5)*5
 */
export function calculateAdmissionScore(gpa, ielts, experience) {
  const gpaScore = (parseFloat(gpa) / 4.0) * 40;
  const ieltsScore = (parseFloat(ielts) / 9.0) * 35;
  const expScore = Math.min(parseFloat(experience), 5) * 5;
  const total = Math.round(gpaScore + ieltsScore + expScore);

  let verdict, color, label;
  if (total >= 70) {
    verdict = 'High';
    color = 'text-green-400';
    label = '🟢 High Probability';
    description = 'Excellent profile! You have strong chances at most universities in your target list.';
  } else if (total >= 50) {
    verdict = 'Medium';
    color = 'text-yellow-400';
    label = '🟡 Medium Probability';
    description = 'Good profile. Focus on strong SOP and LOR to strengthen your application.';
  } else {
    verdict = 'Low';
    color = 'text-red-400';
    label = '🔴 Low Probability';
    description = 'Consider retaking IELTS or gaining more experience before applying.';
  }

  var description;
  if (total >= 70) {
    description = 'Excellent profile! You have strong chances at most universities in your target list.';
  } else if (total >= 50) {
    description = 'Good profile. Focus on strong SOP and LOR to strengthen your application.';
  } else {
    description = 'Consider retaking IELTS or gaining more experience before applying.';
  }

  return { score: total, verdict, color, label, description, percentage: total };
}

/**
 * Calculate ROI for a given course/country/cost
 */
export function calculateROI(cost, course, country) {
  const match = salaryData.find(
    (s) => s.course.toLowerCase() === course.toLowerCase() && s.country.toLowerCase() === country.toLowerCase()
  );

  if (!match) {
    return {
      avgSalary: 0,
      roi: 0,
      breakEvenMonths: 0,
      verdict: 'Unknown',
      color: 'text-muted',
      description: 'No salary data for this combination.',
    };
  }

  const avgSalary = match.avgSalaryUSD;
  const roi = avgSalary - cost;
  const breakEvenMonths = Math.round((cost / avgSalary) * 12);

  let verdict, color, description;
  if (roi > 50000) {
    verdict = 'Excellent';
    color = 'text-green-400';
    description = 'Outstanding ROI! This investment is highly likely to pay off within 2 years.';
  } else if (roi > 20000) {
    verdict = 'Good';
    color = 'text-teal-400';
    description = 'Solid ROI. The investment should break even within 3 years.';
  } else if (roi > 0) {
    verdict = 'Average';
    color = 'text-yellow-400';
    description = 'Moderate ROI. Consider scholarships or lower-cost alternatives.';
  } else {
    verdict = 'Risky';
    color = 'text-red-400';
    description = 'Negative ROI. Explore scholarships, cheaper countries, or higher-salary niches.';
  }

  return { avgSalary, roi, breakEvenMonths, verdict, color, description };
}

/**
 * Rule-based loan eligibility engine
 * Income in lakhs (INR)
 */
export function calculateLoanEligibility(incomeInLakhs, hasCoApplicant, hasCollateral) {
  const income = parseFloat(incomeInLakhs);
  let tier, loanMin, loanMax, interestRate, label, color;

  if (income > 8) {
    tier = 'High';
    loanMin = 2000000; // 20L
    loanMax = 4000000; // 40L
    interestRate = 8.5;
    label = '🟢 High Eligibility';
    color = 'text-green-400';
  } else if (income >= 5) {
    tier = 'Medium';
    loanMin = 1000000; // 10L
    loanMax = 2000000; // 20L
    interestRate = 10.5;
    label = '🟡 Medium Eligibility';
    color = 'text-yellow-400';
  } else {
    tier = 'Low';
    loanMin = 500000; // 5L
    loanMax = 1000000; // 10L
    interestRate = 12.5;
    label = '🔴 Low Eligibility';
    color = 'text-red-400';
  }

  // Co-applicant boosts the upper limit
  if (hasCoApplicant && tier !== 'High') {
    loanMax = Math.round(loanMax * 1.3);
    interestRate -= 0.5;
  }

  // Collateral reduces interest rate
  if (hasCollateral) {
    interestRate -= 1.0;
    loanMax = Math.round(loanMax * 1.2);
  }

  // EMI calculation: monthly EMI for 10 year tenure
  const tenureMonths = 120;
  const monthlyRate = interestRate / 100 / 12;
  const emiMin = Math.round(
    (loanMin * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );
  const emiMax = Math.round(
    (loanMax * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1)
  );

  return {
    tier,
    label,
    color,
    loanMin,
    loanMax,
    interestRate: Math.max(7.0, interestRate).toFixed(1),
    emiMin,
    emiMax,
    tenure: '10 years',
  };
}

/**
 * Calculate loan readiness score from checklist
 * Returns 0-100
 */
export function getLoanReadinessScore(completedIds) {
  const loanItems = ['passport', 'offer_letter', 'income_proof', 'bank_statement', 'loan_approval'];
  const completed = completedIds.filter((id) => loanItems.includes(id));
  return Math.round((completed.length / loanItems.length) * 100);
}

/**
 * Calculate overall progress
 */
export function getProgressPercentage(completedIds, totalItems) {
  if (totalItems === 0) return 0;
  return Math.round((completedIds.length / totalItems) * 100);
}
