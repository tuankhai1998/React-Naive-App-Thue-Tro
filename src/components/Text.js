import React from 'react';
import { Text } from 'react-native';

const CustomText = (props) => {
  const { children, type } = props;
  const styles = [{ fontFamily: type ? type : 'Roboto' }, props.style];
  const allProps = Object.assign({ styles }, props)

  return (
    <Text {...allProps}> {children}</Text >
  );
}

export default CustomText;