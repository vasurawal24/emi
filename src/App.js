
import { useState } from 'react';
import './App.css';
function App() {
  let [amount, setamount] = useState('');
  let [year, setyear] = useState('');
  let [rate, setrate] = useState('');
  
  let [duration, setduration] = useState('');
  let [final , setFinal] = useState('');
  let [emi, setemi] = useState('');
  let [total, settotal] = useState('');
  let [yetotal, setyetotal] = useState('');

  function EMI() {
    setamount(Number(amount))
    setyear(Number(year))
    setrate(Number(rate))
    let ra = rate / 12 / 100
    
    let tempemi = ((amount * ra * Math.pow((1 + ra), (year * 12))) / (Math.pow((1 + ra), (year * 12)) - 1)).toFixed(2);
    let Tamt = (tempemi * ((year) * 12));
    let Tint = (Tamt - (amount)).toFixed(2);
    // console.log(typeof(Tint))
    
    let Year_inter = (Tint / (year)).toFixed(2);
    

    setduration(year * 12)
    setemi(tempemi);
    settotal(Tamt);
    setyetotal(Tint);
    setFinal(Year_inter);


  }
  return (
    <>
      Amount = 
      <input type="text" value={amount} onChange={(e) => { setamount(e.target.value) }} /><br></br>
      Year =

      <input type="text" value={year} onChange={(e) => { setyear(e.target.value) }} /><br></br>

      Rate = 
      <input type="text" value={rate} onChange={(e) => { setrate(e.target.value) }} /><br></br>
        <br/>
      <input type="button"  value="Find" onClick={EMI}></input> <br></br>
     
        <br></br>
      <table border="1">
     
        <tr>
          <td>Payment Duration</td>
          <td><input type="text" value={duration} /></td>
        </tr>
        <tr>
          <td>Calculated Monthly EMI</td>
          <td><input type="text" value={emi} /></td>
        </tr>
        <tr>
          <td>Total  Amount</td>
          <td><input type="text" value={total} /></td>
        </tr>

        <tr>
          <td>Total Interest Amount</td>
          <td><input type="text" value={yetotal} /></td>
        </tr>
        <tr>
          <td>Yearly Interest Amount</td>
          <td><input type="text" value={final} /></td>
        </tr>

      </table>

    </>
  );
}

export default App;