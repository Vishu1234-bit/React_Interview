import { useState } from 'react';
import users from './data/users.json';

export default function DataTable() {
  const [message, setMessage] = useState('Data Table');
  const [currentPage,setCurrentPage] = useState(1);
  const [userPerPage,setUserPerPage] = useState(5);
  const totalPages = Math.ceil(users.length/userPerPage);
  const startUser = (currentPage-1)*userPerPage
  const paginatedUsers = users.slice(startUser,startUser+userPerPage)
  function handlePrev(){
    if(currentPage>1){
      setCurrentPage(currentPage-1);
    }
  }
  function handleNext(){
    if(currentPage<totalPages){
      setCurrentPage(currentPage+1);
    }
  }
  return (
    <div>
      <h1>{message}</h1>
      <table>
        <thead>
          <tr>
            {[
              { label: 'ID', key: 'id' },
              { label: 'Name', key: 'name' },
              { label: 'Age', key: 'age' },
              { label: 'Occupation', key: 'occupation' },
            ].map(({ label, key }) => (
              <th key={key}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedUsers.map(({ id, name, age, occupation }) => (
            <tr key={id}>
              <td>{id}</td>
              <td>{name}</td>
              <td>{age}</td>
              <td>{occupation}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
      <select
      onChange = {(e)=>{setUserPerPage(Number(e.target.value));setCurrentPage(1)}}>
      {[5,10,20].map((size)=>(
        <option 
        key= {size}
        value={size}
        >Show {size}</option>
      )
      )}
      </select>
      <button 
      onClick = {handlePrev}
      disabled= {currentPage===1}>Prev</button>
      <span>Page {currentPage} of {totalPages}</span>
      <button 
      onClick = {handleNext}
      disabled = {currentPage===totalPages}>Next</button>
      </div>
    </div>
  );
}
