import { CircularProgress, styled } from '@mui/material';
import { SpinnerProps } from '../../types/interfaces';

const StyledSpinner = styled(CircularProgress)({
  position: 'absolute',
  top: '50vh',
  left: '50vw',
  transform: 'translate(-50%, -50%)',
});

const Spinner: React.FC<SpinnerProps> = ({
  size = 40,
  thickness = 4,
  color = 'primary',
}) => <StyledSpinner size={size} thickness={thickness} color={color} />;

export default Spinner;
