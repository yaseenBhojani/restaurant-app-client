import Box from '@mui/material/Box';

import { IChildren } from '../../types/interfaces';

const Container = ({ children }: IChildren) => {
  return <Box sx={{ minHeight: '100vh', width: '100%' }}>{children}</Box>;
};

export default Container;
