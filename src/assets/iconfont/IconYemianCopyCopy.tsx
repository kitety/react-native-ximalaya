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

let IconYemianCopyCopy: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M562.805 80.6975a72.135 72.135 0 0 0-96.93 0L73.925 452.87a36.1575 36.1575 0 0 0 48.42 53.7075l6.2325-5.9175V889.1a72.315 72.315 0 0 0 72.315 72.405h210.4425v-217.71a50.9175 50.9175 0 0 1 50.94-50.985h99.0225a50.9175 50.9175 0 0 1 50.94 50.985v217.71h215.4375a72.315 72.315 0 0 0 72.3375-72.405V505.4075c16.065 14.535 38.8575 13.4325 52.2225-1.4625a36.1575 36.1575 0 0 0-2.61-51.075L562.805 80.72z"
        fill={getIconColor(color, 0, '#4b8bd3')}
      />
    </Svg>
  );
};

IconYemianCopyCopy.defaultProps = {
  size: 18,
};

IconYemianCopyCopy = React.memo ? React.memo(IconYemianCopyCopy) : IconYemianCopyCopy;

export default IconYemianCopyCopy;
