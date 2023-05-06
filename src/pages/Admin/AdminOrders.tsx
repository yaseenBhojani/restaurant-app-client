import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect, Fragment } from 'react';

import Heading from '../../components/Common/Heading';
import cartImage from '../../assets/images/foodCart.jpg';
import { AppDispatch, RootState } from '../../store';
import {
  changeOrderStatus,
  getAllOrders,
} from '../../store/reducers/orderReducer';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));

const AdminOrdersPage = () => {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.order);

  const handleRowClick = (orderId: string) => {
    setSelectedOrderId(orderId === selectedOrderId ? null : orderId);
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;
    dispatch(changeOrderStatus({ id: selectedOrderId!, status: newStatus }))
      .unwrap()
      .then(() => {
        dispatch(getAllOrders())
          .unwrap()
          .catch((error: any) => {
            console.log(error);
            setErrorMessage(error.message);
          });
      })
      .catch((error: any) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  useEffect(() => {
    dispatch(getAllOrders())
      .unwrap()
      .catch((error: any) => console.log(error));
  }, []);

  return (
    <>
      <Heading level={2} imageUrl={cartImage}>
        ORDERS
      </Heading>
      {errorMessage && (
        <Alert
          onClose={() => setErrorMessage('')}
          severity="error"
          sx={{ mt: 2 }}
        >
          {errorMessage}
        </Alert>
      )}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 650 }} aria-label="Orders Table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Order ID</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Address</StyledTableCell>
              <StyledTableCell align="right">Total Amount</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right">Created At</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length > 0 &&
              items.map(order => (
                <Fragment key={order._id}>
                  <TableRow
                    onClick={() => handleRowClick(order._id!)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" scope="row">
                      {order._id}
                    </TableCell>
                    <TableCell align="right">{order.email}</TableCell>
                    <TableCell align="right">{order.address}</TableCell>
                    <TableCell align="right">
                      ${order.totalAmount.toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      {selectedOrderId === order._id ? (
                        <Select
                          value={order.status}
                          onChange={handleStatusChange}
                        >
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Accepted">Accepted</MenuItem>
                          <MenuItem value="Rejected">Rejected</MenuItem>
                        </Select>
                      ) : (
                        order.status
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {order.createdAt?.toString().slice(0, 10)}
                    </TableCell>
                  </TableRow>
                  {selectedOrderId === order._id && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <Box sx={{ p: 2 }}>
                          <p>Order details:</p>
                          <ul>
                            {order.items.map((item, index) => (
                              <li key={index}>
                                {item.name} ({item.quantity})
                              </li>
                            ))}
                          </ul>
                        </Box>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminOrdersPage;
