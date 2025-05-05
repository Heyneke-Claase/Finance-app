document.addEventListener('DOMContentLoaded', function() {

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 600,
        offset: 80,
        once: true,
        easing: 'ease-in-out',
    });

    // --- Loan Calculator Logic ---
    const calculatorElements = {
        loanAmountSlider: document.getElementById('loan-amount'),
        loanAmountValue: document.getElementById('amount-value'),
        repaymentPeriod: document.getElementById('repayment-period'),
        baseFeeElement: document.getElementById('base-fee'),
        serviceFeeElement: document.getElementById('service-fee'),
        interestElement: document.getElementById('interest-amount'),
        monthlyPaymentElement: document.getElementById('monthly-payment'),
        totalRepaymentElement: document.getElementById('total-repayment')
    };

    const allCalcElementsFound = Object.values(calculatorElements).every(el => el !== null);

    if (allCalcElementsFound) {
        const CALC_CONSTANTS = {
            SERVICE_FEE: 60.00,
            INTEREST_RATE: 0.05,
            MAX_INITIATION_FEE: 1050.00
        };

        const currencyFormatter = new Intl.NumberFormat('en-ZA', {
            style: 'currency',
            currency: 'ZAR',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        function calculateFees(amount, period) {
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
                totalServiceFee,
                monthlyServiceFee: CALC_CONSTANTS.SERVICE_FEE,
                monthlyPayment,
                totalRepayment
            };
        }

        function updateCalculationUI(calculatedValues) {
            const elements = calculatorElements;
            requestAnimationFrame(() => {
                elements.baseFeeElement.textContent = currencyFormatter.format(calculatedValues.baseFee);
                elements.serviceFeeElement.textContent = currencyFormatter.format(calculatedValues.monthlyServiceFee);
                elements.interestElement.textContent = currencyFormatter.format(calculatedValues.interest);
                elements.monthlyPaymentElement.textContent = currencyFormatter.format(calculatedValues.monthlyPayment);
                elements.totalRepaymentElement.textContent = currencyFormatter.format(calculatedValues.totalRepayment);
            });
        }

        function updateSliderVisual(value) {
            if (calculatorElements.loanAmountValue) {
                requestAnimationFrame(() => {
                    calculatorElements.loanAmountValue.textContent = currencyFormatter.format(value);
                });
            }
        }

        const handleCalculation = () => {
            const amount = parseInt(calculatorElements.loanAmountSlider.value);
            const period = parseInt(calculatorElements.repaymentPeriod.value);
            const results = calculateFees(amount, period);
            updateCalculationUI(results);
        };

        calculatorElements.loanAmountSlider.addEventListener('input', () => {
            const currentAmount = parseInt(calculatorElements.loanAmountSlider.value);
            updateSliderVisual(currentAmount);
            handleCalculation();
        });

        calculatorElements.repaymentPeriod.addEventListener('change', handleCalculation);

        const initialAmount = parseInt(calculatorElements.loanAmountSlider.value);
        updateSliderVisual(initialAmount);
        handleCalculation();
    } else {
        console.error("One or more calculator HTML elements are missing. Please check IDs.");
    }

    // --- Form Submission via Fetch to Backend ---
    const loanForm = document.getElementById('loanApplicationForm');
    const submitButton = loanForm?.querySelector('button[type="submit"]');
    const originalButtonText = submitButton?.innerHTML;

    if (loanForm) {
        loanForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();

            if (!loanForm.checkValidity()) {
                loanForm.classList.add('was-validated');
            } else {
                loanForm.classList.add('was-validated');

                submitButton.disabled = true;
                submitButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...`;

                const formData = new FormData(loanForm);

                const serverUrl = 'http://localhost:3000/api/submit-loan'; // Update for deployment

                fetch(serverUrl, {
                    method: 'POST',
                    body: formData,
                })
                .then(response => {
                    if (!response.ok) {
                        return response.json().then(errData => {
                            throw new Error(errData.error || `Server error: ${response.statusText}`);
                        }).catch(() => {
                            throw new Error(`Server error: ${response.statusText}`);
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Server Response:', data);
                    if (data.success) {
                        alert('Application submitted successfully!');
                        loanForm.reset();
                        loanForm.classList.remove('was-validated');
                    } else {
                        throw new Error(data.error || 'Submission failed. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Submission Error:', error);
                    alert(`Error submitting application: ${error.message}`);
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                });
            }
        });
    } else {
        console.error("Loan application form not found!");
    }
    // --- End Form Submission via Fetch ---

    // --- Footer Current Year ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded