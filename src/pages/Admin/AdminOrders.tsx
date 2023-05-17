import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { TableCellProps } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

import Heading from '../../components/Common/Heading';
import { AppDispatch, RootState } from '../../store';
import {
  changeOrderStatus,
  getAllOrders,
} from '../../store/reducers/orderReducer';

// Styled component for table cells
const StyledTableCell = styled((props: TableCellProps) => (
  <TableCell {...props} />
))(({ theme }) => ({
  fontWeight: 'bold',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.75rem',
  },
}));

const AdminOrdersPage = () => {
  // State variables
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.order);

  // Handler for row click event
  const handleRowClick = (orderId: string) => {
    setSelectedOrderId(orderId === selectedOrderId ? null : orderId);
  };

  // Handler for status change event
  const handleStatusChange = async (event: SelectChangeEvent<string>) => {
    const newStatus = event.target.value;

    if (!selectedOrderId) return;

    try {
      // Dispatch action to change order status
      await dispatch(
        changeOrderStatus({ id: selectedOrderId, status: newStatus })
      ).unwrap();

      // If order status change is successful, dispatch action to get all orders
      await dispatch(getAllOrders()).unwrap();
    } catch (error) {
      setErrorMessage(
        axios.isAxiosError(error)
          ? error.response?.data?.message ?? 'An error occurred'
          : 'An error occurred'
      );
    }
  };

  useEffect(() => {
    // Fetch all orders when the component mounts
    const fetchData = async () => {
      try {
        await dispatch(getAllOrders()).unwrap();
      } catch (error) {
        setErrorMessage(
          axios.isAxiosError(error)
            ? error.response?.data?.message ?? 'An error occurred'
            : 'An error occurred'
        );
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      {/* Page heading */}
      <Heading level={2} imageUrl="/images/secondaryHeading.jpg">
        ORDERS
      </Heading>

      {/* Error alert */}
      {errorMessage && (
        <Alert
          onClose={() => setErrorMessage('')}
          severity="error"
          sx={{ mt: 2 }}
        >
          {errorMessage}
        </Alert>
      )}

      {/* Table container */}
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table aria-label="Orders Table">
          {/* Table header */}
          <TableHead>
            <TableRow sx={{ backgroundColor: 'secondary.main' }}>
              {/* Table header cells */}
              <StyledTableCell sx={{ color: 'common.white' }}>
                Order ID
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ color: 'common.white' }}>
                Email
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ color: 'common.white' }}>
                Address
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ color: 'common.white' }}>
                Total Amount
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ color: 'common.white' }}>
                Status
              </StyledTableCell>
              <StyledTableCell align="right" sx={{ color: 'common.white' }}>
                Created At
              </StyledTableCell>
            </TableRow>
          </TableHead>
          {/* Table body */}
          <TableBody>
            {items.length > 0 &&
              items.map((order, index) => {
                const isSelected = selectedOrderId === order._id;

                return (
                  <Fragment key={order._id}>
                    {/* Order row */}
                    <TableRow
                      // Handle row click event
                      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                      onClick={() => handleRowClick(order._id!)}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor:
                          index % 2 === 0 ? 'background.paper' : '#f5f5f5',
                      }}
                    >
                      <StyledTableCell>{order._id}</StyledTableCell>
                      <StyledTableCell align="right">
                        {order.email}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order.address}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        ${order.totalAmount.toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {isSelected ? (
                          // Show select input for status change if row is selected
                          <Select
                            value={order.status}
                            onChange={handleStatusChange}
                          >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Accepted">Accepted</MenuItem>
                            <MenuItem value="Rejected">Rejected</MenuItem>
                          </Select>
                        ) : (
                          // Show status text if row is not selected
                          order.status
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {order.createdAt?.toString().slice(0, 10)}
                      </StyledTableCell>
                    </TableRow>
                    {/* Additional row for order details */}
                    {isSelected && (
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
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminOrdersPage;
