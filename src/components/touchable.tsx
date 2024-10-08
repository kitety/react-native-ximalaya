import React, { FC } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const Touchable: FC<TouchableOpacityProps> = ({ style, ...props }) => {
  const newStyle = [props.disabled ? styles.disabled : {}, style];
  return <TouchableOpacity activeOpacity={0.8} {...props} style={newStyle} />;
};
const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
export default Touchable;
