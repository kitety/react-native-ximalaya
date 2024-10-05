/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconHomeSelect: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M569.80479999 21.2736a82.0736 82.0736 0 0 0-110.28479998 0L13.568 444.7232a41.13919997 41.13919997 0 0 0 55.0912 61.10719999l7.0912-6.73279998V941.05599999a82.2784 82.2784 0 0 0 82.2784 82.38080001h239.4368v-247.70559999a57.93280001 57.93280001 0 0 1 57.9584-58.00960001h112.6656a57.93280001 57.93280001 0 0 1 57.9584 58.00960001v247.70559999h245.12a82.2784 82.2784 0 0 0 82.304-82.38080001V504.4992c18.2784 16.5376 44.2112 15.2832 59.41759999-1.66399999a41.13919997 41.13919997 0 0 0-2.96959999-58.11200001L569.80479999 21.2992z"
        fill={getIconColor(color, 0, '#1296db')}
      />
    </Svg>
  );
};

IconHomeSelect.defaultProps = {
  size: 18,
};

IconHomeSelect = React.memo ? React.memo(IconHomeSelect) : IconHomeSelect;

export default IconHomeSelect;
