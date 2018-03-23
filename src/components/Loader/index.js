import React from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';

const LoaderWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default () => <LoaderWrapper><Spin size="large" /></LoaderWrapper>