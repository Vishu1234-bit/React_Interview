import {useState} from "react";
export default function App() {
  const [formData,setFormData]= useState({
    loan:100000,
    interest:30,
    term:3})
  const [mortgagePayment,setMortgagePayment]=useState('');
  const [totalPayment,setTotalPayment]=useState('');
  const [totalInterest,setTotalInterest]=useState('');
  function calculateMortgage(e){
      e.preventDefault();
      const loanAmount = parseFloat(formData.loan);
      const annualInterest = parseFloat(formData.interest)/100;
      const monthlyInterest = annualInterest/12;
      const loanTermTotal = parseFloat(formData.term)*12;
      let monthlyPayment;
      if(monthlyInterest===0){
      monthlyPayment = (loanAmount/loanTermTotal);
      }else{
      const numerator = loanAmount*monthlyInterest*Math.pow(1+monthlyInterest,loanTermTotal)
      const denominator = Math.pow(1+monthlyInterest,loanTermTotal) -1;
      monthlyPayment = (numerator/denominator);
      }
      setMortgagePayment(monthlyPayment.toFixed(2))
      setTotalPayment((mortgagePayment*loanTermTotal).toFixed(2));
      setTotalInterest((totalPayment-loanAmount).toFixed(2));
  }   
  function updateFormData(e){
      return setFormData({
        ...formData,
      [e.target.name]:e.target.value?parseFloat(e.target.value):''})
  }
  return (
    <form className="form" onSubmit={calculateMortgage}>
    <label>Loan Amount: 
      <input type="number" 
      name="loan" 
      value={formData.loan}
      onChange={updateFormData}/>
    </label>
    <label>Annual Interest Rate: 
      <input type="number"
      name="interest" 
      value={formData.interest}
      onChange={updateFormData} />
    </label>
    <label>Loan Term: 
      <input type="number"
      name="term" 
      value={formData.term}
      onChange={updateFormData} />
    </label>
    <button className="calculate">Calculate</button>
    <div className="form">
     <label>Monthly mortgage payment :
     {mortgagePayment}
     </label>
     <label>Total payment amount :
     {totalPayment}
     </label>
     <label>Total interest paid :
     {totalInterest}
     </label>
    </div>
    </form>
  );
}
