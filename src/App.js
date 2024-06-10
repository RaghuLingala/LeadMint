import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function App() {
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  // const [perPage, setPerPage] = useState(10);
  const [perPage, /* remove this */] = useState(10);
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [pieChartData, setPieChartData] = useState({});

  const fetchTransactions = useCallback(async () => {
    const response = await axios.get(`http://localhost:3001/transactions`, {
      params: { month, search, page, perPage }
    });
    setTransactions(response.data);
  }, [month, search, page, perPage]);

  const fetchStatistics = useCallback(async () => {
    const response = await axios.get(`http://localhost:3001/statistics`, {
      params: { month }
    });
    setStatistics(response.data);
  }, [month]);

  const fetchBarChartData = useCallback(async () => {
    const response = await axios.get(`http://localhost:3001/bar-chart`, {
      params: { month }
    });
    setBarChartData(response.data);
  }, [month]);

  const fetchPieChartData = useCallback(async () => {
    const response = await axios.get(`http://localhost:3001/pie-chart`, {
      params: { month }
    });
    setPieChartData(response.data);
  }, [month]);

  useEffect(() => {
    fetchTransactions();
    fetchStatistics();
    fetchBarChartData();
    fetchPieChartData();
  }, [fetchTransactions, fetchStatistics, fetchBarChartData, fetchPieChartData]);

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // const handlePageChange = (event) => {
  //   setPage(event.target.value);
  // };

  // const handlePerPageChange = (event) => {
  //   setPerPage(event.target.value);
  // };

  return (
    <div>
      <h1>Transactions</h1>
      <select value={month} onChange={handleMonthChange}>
        <option value="January">January</option>
        <option value="February">February</option>
        <option value="March">March</option>
        <option value="April">April</option>
        <option value="May">May</option>
        <option value="June">June</option>
        <option value="July">July</option>
        <option value="August">August</option>
        <option value="September">September</option>
        <option value="October">October</option>
        <option value="November">November</option>
        <option value="December">December</option>
      </select>
      <input type="search" value={search} onChange={handleSearchChange} placeholder="Search" />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Product Title</th>
            <th>Product Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{transaction.dateOfSale}</td>
              <td>{transaction.productTitle}</td>
              <td>{transaction.productDescription}</td>
              <td>{transaction.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => setPage(page - 1)}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
      <h2>Statistics</h2>
      <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
      <h2>Bar Chart</h2>
      <ul>
        {Object.keys(barChartData).map((key) => (
          <li key={key}>{key}: {barChartData[key]}</li>
        ))}
      </ul>
      <h2>Pie Chart</h2>
      <ul>
        {Object.keys(pieChartData).map((key) => (
          <li key={key}>{key}: {pieChartData[key]}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;