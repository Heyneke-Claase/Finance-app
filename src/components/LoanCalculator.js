// src/components/LoanCalculator.js
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Card, Form } from 'react-bootstrap';

const CALC_CONSTANTS = {
  SERVICE_FEE: 60.00,
  INTEREST_RATE: 0.05,
  MAX_INITIATION_FEE: 1050.00,
};

const currencyFormatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [repaymentPeriod, setRepaymentPeriod] = useState(1); // in months
  const [calculatedValues, setCalculatedValues] = useState({
    baseFee: 0,
    interest: 0,
    monthlyServiceFee: CALC_CONSTANTS.SERVICE_FEE,
    monthlyPayment: 0,
    totalRepayment: 0,
  });

  const calculateFees = useCallback((amount, period) => {
    const validPeriod = Math.max(1, period);
    let baseFee = 165.00;
    if (amount > 1000) {
      baseFee += (amount - 1000) * 0.10;
    }
    baseFee = Math.min(baseFee, CALC_CONSTANTS.MAX_INITIATION_FEE);
    const interest = amount * CALC_CONSTANTS.INTEREST_RATE * validPeriod;
    const totalServiceFee = CALC_CONSTANTS.SERVICE_FEE * validPeriod;
    const totalRepayment = amount + baseFee + interest + totalServiceFee;
    const monthlyPayment = totalRepayment / validPeriod;

    return {
      baseFee,
      interest,
      monthlyServiceFee: CALC_CONSTANTS.SERVICE_FEE,
      monthlyPayment,
      totalRepayment,
    };
  }, []);

  useEffect(() => {
    const results = calculateFees(loanAmount, repaymentPeriod);
    setCalculatedValues(results);
  }, [loanAmount, repaymentPeriod, calculateFees]);

  const handleAmountChange = (e) => {
    setLoanAmount(parseInt(e.target.value));
  };

  const handlePeriodChange = (e) => {
    setRepaymentPeriod(parseInt(e.target.value));
  };

  return (
    <section id="calculator" className="py-5 bg-light-subtle">
      <Container data-aos="fade-up">
        <h2 className="text-center mb-4 fw-bold">Estimate Your Loan Costs</h2>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm p-4 p-lg-5 calculator-card">
              <Form.Group className="mb-4">
                <Form.Label htmlFor="loan-amount-slider">
                  Loan Amount: <span id="amount-value" className="fw-bold">{currencyFormatter.format(loanAmount)}</span>
                </Form.Label>
                <Form.Range
                  id="loan-amount-slider"
                  min="500"
                  max="8000"
                  step="100"
                  value={loanAmount}
                  onChange={handleAmountChange}
                />
                <div className="d-flex justify-content-between small text-muted mt-1">
                  <span>R 500</span>
                  <span>R 8,000</span>
                </div>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label htmlFor="repayment-period-select">Repayment Term:</Form.Label>
                <Form.Select id="repayment-period-select" size="lg" value={repaymentPeriod} onChange={handlePeriodChange}>
                  <option value="1">1 Month</option>
                  <option value="3">3 Months</option>
                  <option value="6">6 Months</option>
                </Form.Select>
              </Form.Group>

              <div className="mt-3 border-top pt-4">
                <h4 className="text-center fw-normal mb-4">Estimated Breakdown</h4>
                <Row className="g-3 small calculation-details">
                  <Col xs={6} className="d-flex justify-content-between">
                    <span>Initiation Fee:</span>
                    <strong id="base-fee">{currencyFormatter.format(calculatedValues.baseFee)}</strong>
                  </Col>
                  <Col xs={6} className="d-flex justify-content-between">
                    <span>Monthly Service Fee:</span>
                    <strong id="service-fee">{currencyFormatter.format(calculatedValues.monthlyServiceFee)}</strong>
                  </Col>
                  <Col xs={6} className="d-flex justify-content-between">
                    <span>Total Interest:</span>
                    <strong id="interest-amount">{currencyFormatter.format(calculatedValues.interest)}</strong>
                  </Col>
                  <Col xs={6} className="d-flex justify-content-between">
                    <span>Total Repayment:</span>
                    <strong id="total-repayment">{currencyFormatter.format(calculatedValues.totalRepayment)}</strong>
                  </Col>
                </Row>
              </div>

              <div className="mt-4 text-center bg-light p-3 rounded result-box">
                <h4 className="fw-normal mb-1">Estimated Monthly Repayment:</h4>
                <p className="display-6 fw-bold mb-2" id="monthly-payment">
                  {currencyFormatter.format(calculatedValues.monthlyPayment)}
                </p>
                <small className="text-muted d-block">
                  *Estimate only based on max NCA rates (5% interest p/m, R60 service fee p/m, calculated initiation fee). Subject to credit assessment & affordability checks. Ts&Cs apply.
                </small>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default LoanCalculator;