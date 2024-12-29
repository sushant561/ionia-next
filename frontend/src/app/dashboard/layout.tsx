// frontend/app/dashboard/layout.tsx

import { FC } from 'react';
import Layout from '../../components/common/Layout';

const DashboardLayout: FC = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default DashboardLayout;
