import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Grid,
} from '@mui/material';
import { Order } from '../../types/interfaces';

interface Props {
  order: Order;
  index: number;
}

const OrderCard = ({ order, index }: Props) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card
        variant="outlined"
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Display order details */}
        <CardHeader
          title={`Order #${index + 1}`}
          subheader={order.createdAt?.toString().slice(0, 10)}
        />
        <Divider />
        <CardContent sx={{ flexGrow: 1 }}>
          {order.items.length > 0 ? (
            // Display order items in a list
            <List
              sx={{
                maxHeight: 200,
                overflow: 'auto',
                '&::-webkit-scrollbar': {
                  width: 8,
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'rgba(0, 0, 0, 0.2)',
                  borderRadius: 4,
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                },
              }}
            >
              {order.items.map(item => (
                <ListItem key={item._id} disableGutters>
                  <ListItemText
                    primary={item.name}
                    secondary={`$${item.price} x ${item.quantity}`}
                  />
                </ListItem>
              ))}
            </List>
          ) : (
            <Typography variant="body1">No items in this order</Typography>
          )}
        </CardContent>
        <Divider />
        <Box sx={{ p: 2 }}>
          {/* Display order total and status */}
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Total: ${order.totalAmount.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color={
              order.status === 'Pending'
                ? 'primary'
                : order.status === 'Accepted'
                ? 'success'
                : 'error'
            }
            sx={{ width: '100%' }}
          >
            {order.status}
          </Button>
        </Box>
      </Card>
    </Grid>
  );
};

export default OrderCard;
