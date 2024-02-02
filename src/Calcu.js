import React, { useState } from 'react';

const Calcu = () => {
  const [loanAmt, setLoanAmt] = useState('');
  const [loanyears, setLoanyears] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [Months, setMonths] = useState('');
  const [monthly_EMI, setMonthly_EMI] = useState('');
  const [totalAmtWithInt, setTotalAmtWithInt] = useState('');
  const [totalIntAmt, setTotalIntAmt] = useState('');
  const [PA, setPA] = useState('');
  const [PM, setPM] = useState('');
  const [Table, setTable] = useState([]);

  const calculateLoan = () => {
    const lamt = parseFloat(loanAmt);
    const years = parseFloat(loanyears);
    const month = years * 12;
    const rate = parseFloat(interestRate) / 100;
    const monthly_EMI = rate / 12;
    const emi = (lamt * monthly_EMI) / (1 - Math.pow(1 + monthly_EMI, -month));
    const intrest = emi * month;
    const netinterst = intrest - lamt;
    const principal = netinterst - emi;
    const PA = ((netinterst / lamt) / years) * 100;
    const PM = (PA / month) * 10;

    setMonths(`${month} Months`);
    setMonthly_EMI(emi.toFixed(2));
    setTotalAmtWithInt(intrest.toFixed());
    setTotalIntAmt(netinterst.toFixed());
    setPA(`${PA.toFixed(2)}%`);
    setPM(`${PM.toFixed(2)}%`);

    let balance = lamt;
    let amortizationData = [];

    const arr = ['jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sup', 'OCt', 'Nuv', 'Des'];
    let yr = 2024, mon = 0;

    for (let i = 1; i <= month+1; i++) {
      const intrest = balance * monthly_EMI;
      const principal_payment = emi - intrest;

      const rowData = {
        number: i,
        month: arr[mon],
        year: yr,
        startBalance: balance,
        interest: intrest.toFixed(2),
        emi: emi.toFixed(2),
        principalPaid: principal_payment.toFixed(2),
        endingBalance: Math.ceil(balance)
      };

      amortizationData.push(rowData);

      if (mon === 11) {
        mon = 0;
        yr++;
      } else {
        mon++;
      }

      balance = (balance - principal_payment).toFixed(2);
    }

    setTable(amortizationData);
  };

  return (
    <div className="container">
      <div className="box">
        <div className="heading">
          <h1>Loan Amortization Calculator</h1>
        </div>
        <div className="body">
          <p>Loan Amount</p>
          <input type="text" className="inp" placeholder="Enter Loan Amount" value={loanAmt} onChange={(e) => setLoanAmt(e.target.value)} />
          <p>Loan Tenure</p>
          <input type="text" className="inp2" placeholder="Enter no.of years" value={loanyears} onChange={(e) => setLoanyears(e.target.value)} />

          <p>Interest Rate (Reducing)</p>
          <input type="number" className="inp2" placeholder="Enter Interest Rate" value={interestRate} onChange={(e) => setInterestRate(e.target.value)}/>

          <input type="button" value="Calcutate" className="btn" onClick={calculateLoan} />
        </div>
      </div>

      <br />
      Payment Duration:
      <input type="text" id="display" className="bn" value={Months} readOnly />
      <br />
      <br />
      Calculated Monthly EMI:
      <input type="text" id="emi" className="bn" value={monthly_EMI} readOnly />
      <br />
      <br />
      Total Amount with Interest:
      <input type="text"  className="bn" value={totalAmtWithInt} readOnly />
      <br />
      <br />
      Total Interest Amount:
      <input type="text"  className="bn" value={totalIntAmt} readOnly />
      <br />
      <br />
      Flat Interest Rate PA:
      <input type="text"  className="bn" value={PA} readOnly />
      <br />
      <br />
      Flat Interest Rate PM:
      <input type="text"  className="bn" value={PM} readOnly />

      <br />
      <br />
      <h2 className="center">In Table Format </h2>
      <table  border="1" className="t_center">
        <tr>
          <th>no.</th>
          <th>month</th>
          <th>Year</th>
          <th>Start Balance</th>
          <th>Interest</th>
          <th>Emi</th>
          <th>Principal Paid</th>
          <th>Ending Balance</th>
        </tr>
        {Table.map((row) => (
          <tr key={row.number}>
            <td>{row.number}</td>
            <td>{row.month}</td>
            <td>{row.year}</td>
            <td>{row.startBalance}</td>
            <td>{row.interest}</td>
            <td>{row.emi}</td>
            <td>{row.principalPaid}</td>
            <td>{row.endingBalance}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default Calcu;
