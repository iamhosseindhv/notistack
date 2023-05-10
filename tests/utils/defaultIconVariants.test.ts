import { it, expect } from 'vitest';
import { customRenderer } from '../test-utils';

import { default as defaultIconVariants } from '../../src/utils/defaultIconVariants';

it('should render icon correctly: <CheckIcon />', () => {
  const checkIcon = defaultIconVariants.success;

  const { asFragment } = customRenderer(checkIcon);
  expect(asFragment()).toMatchSnapshot();
})

it('should render icon correctly: <WarningIcon />', () => {
  const warningIcon = defaultIconVariants.warning;
  
  const { asFragment } = customRenderer(warningIcon);
  expect(asFragment()).toMatchSnapshot();
})

it('should render icon correctly: <ErrorIcon />', () => {
  const errorIcon = defaultIconVariants.error;

  const { asFragment } = customRenderer(errorIcon);
  expect(asFragment()).toMatchSnapshot();
})

it('should render icon correctly: <InfoIcon />', () => {
  const infoIcon = defaultIconVariants.info;

  const { asFragment } = customRenderer(infoIcon);
  expect(asFragment()).toMatchSnapshot();
})
