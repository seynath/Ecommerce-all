import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { base_url } from '../utils/baseUrl';
import * as XLSX from 'xlsx';
import { DatePicker, Button, Table, Typography, Space } from 'antd';
// import 'bootstrap/dist/css/bootstrap.min.css';

const { Title } = Typography;
const { RangePicker } = DatePicker;

const SalesReport = () => {
  const [sales, setSales] = useState([]);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      console.log(fromDate);
      const response = await axios.get(`${base_url}report/sales-report`, {
        params: { fromDate, toDate },
      });
      console.log(response.data);
      setSales(response.data);

      setSalesData(response.data.flatMap((sale) =>
        Object.values(sale.items).map((item) => ({
          date_time: new Date(sale.date_time).toLocaleDateString(),
          total: sale.total,
          order_source: sale.order_source,
          order_id: sale.sales_id,
          product_id: item.product_id,
          product_title: item.product_title,
          size_name: item.size_name,
          color_name: item.color_name,
          quantity: item.quantity,
          unit_price: item.unit_price,
        }))
      ));
    };

    if (fromDate && toDate) {
      fetchSales();
    }
  }, [fromDate, toDate]);

  const handleRangePickerChange = (dates) => {
    if (dates) {
      setFromDate(dates[0].format('YYYY-MM-DD'));
      setToDate(dates[1].format('YYYY-MM-DD'));
    } else {
      setFromDate('');
      setToDate('');
    }
  };

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(salesData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');
    XLSX.writeFile(workbook, 'sales.xlsx');
  };

  const columns = [
    { title: 'Date Time', dataIndex: 'date_time', key: 'date_time' },
    { title: 'Order Source', dataIndex: 'order_source', key: 'order_source' },
    { title: 'Sales/OrderID', dataIndex: 'order_id', key: 'order_id' },
    { title: 'Product ID', dataIndex: 'product_id', key: 'product_id' },
    { title: 'Product', dataIndex: 'product_title', key: 'product_title' },
    { title: 'Size', dataIndex: 'size_name', key: 'size_name' },
    { title: 'Color', dataIndex: 'color_name', key: 'color_name' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    { title: 'Unit Price', dataIndex: 'unit_price', key: 'unit_price' },
    { title: 'Total', dataIndex: 'total', key: 'total' },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Sales Report</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <RangePicker onChange={handleRangePickerChange} />
        <Button type="primary" onClick={handleDownloadExcel}
        style={{
          backgroundColor: "#000000",
          color: "white",
          padding: "10px 15px",
          border: "none",
          borderRadius: "25px",
          cursor: "pointer",
          fontSize: "16px",
          margin: "10px 0",
          width:"25%"
        }}
        >
          Download Excel
        </Button>
        <Table
          className="table table-bordered table-hover"
          columns={columns}
          dataSource={salesData}
          rowKey={(record) => `${record.date_time}-${record.order_id}-${record.product_id}`}
          size="small"
          pagination={{ pageSize: 10 }}
        />
      </Space>
    </div>
  );
};

export default SalesReport;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { base_url } from '../utils/baseUrl';
// import * as XLSX from 'xlsx';

// const SalesReport = () => {
//   const [sales, setSales] = useState([]);
//   const [fromDate, setFromDate] = useState('');
//   const [toDate, setToDate] = useState('');
//   const [salesData, setSalesData] = useState([]);

//   useEffect(() => {
//     const fetchSales = async () => {
//       console.log(fromDate);
//       const response = await axios.get(`${base_url}report/sales-report`, {
//         params: { fromDate, toDate },
//       });
//       console.log(response.data);
//       setSales(response.data);

//       setSalesData(response.data.flatMap((sale) =>
//         Object.values(sale.items).map((item) => ({
//           date_time: new Date(sale.date_time).toLocaleDateString(),
//           total: sale.total,
//           order_source: sale.order_source,
//           // sales_id: sale.order_source === 'offline' ? sale.sales_id : sale.order_id,
//           order_id:sale.sales_id ,
//           product_id: item.product_id,
//           product_title: item.product_title,
//           size_name: item.size_name,
//           color_name: item.color_name,
//           quantity: item.quantity,
//           unit_price: item.unit_price,
//         }))
//       ));
    
//     }

  
//   if (fromDate && toDate) {
//     fetchSales();
//   }
// }, [fromDate, toDate]);

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     setFromDate(e.target.fromDate.value);
//     setToDate(e.target.toDate.value);
//   };

//   const handleDownloadExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(salesData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales');
//     XLSX.writeFile(workbook, 'sales.xlsx');
//   };

//   return (
//     <div>
//       <h1>Sales Report</h1>
//       <form onSubmit={handleFormSubmit}>
//         <label>
//           From Date:
//           <input type="date" name="fromDate" />
//         </label>
//         <label>
//           To Date:
//           <input type="date" name="toDate" />
//         </label>
//         <button type="submit">Generate Report</button>
//       </form>
//       <button onClick={handleDownloadExcel}>Download Excel</button>
//       <table className="table table-bordered table-hover mt-2 table-sm">
//         <thead>
//           <tr>
//             <th>Date Time</th>
//             <th>Order Source</th>
//             <th>Sales/OrderID</th>
//             <th>Product ID</th>
//             <th>Product</th>
//             <th>Size</th>
//             <th>Color</th>
//             <th>Quantity</th>
//             <th>Unit Price</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>
//           {salesData.map((sale) => (
//             <tr key={`${sale.date_time}-${sale.sales_id}-${sale.product_id}`}>
//               <td>{sale.date_time}</td>
//               <td>{sale.order_source}</td>
//               <td>{sale.order_id}</td>
//               <td>{sale.product_id}</td>
//               <td>{sale.product_title}</td>
//               <td>{sale.size_name}</td>
//               <td>{sale.color_name}</td>
//               <td>{sale.quantity}</td>
//               <td>{sale.unit_price}</td>
//               <td>{sale.total}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default SalesReport;






