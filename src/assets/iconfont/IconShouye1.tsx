// @ts-nocheck
/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps, Path, Svg } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconShouye1: FunctionComponent<Props> = ({ size = 18, color, ...rest }) => {
  return (
    <Svg viewBox='0 0 1024 1024' width={size} height={size} {...rest}>
      <Path
        d='M551.24565315 146.49575202a55.72257041 55.72257041 0 0 0-74.87611771 0L173.59749031 433.99014919a27.93080806 27.93080806 0 0 0 37.40329743 41.4877653l4.81445789-4.57112789V770.96744029a55.86161614 55.86161614 0 0 0 55.86161614 55.93113899h162.56182192v-168.17579269a39.33255672 39.33255672 0 0 1 39.34993745-39.38469887h76.49252415a39.33255672 39.33255672 0 0 1 39.34993743 39.38469887v168.17579269h166.42034055a55.86161614 55.86161614 0 0 0 55.87899684-55.931139V474.57411735c12.40983009 11.22794151 30.01649379 10.37628651 40.34063816-1.12974643a27.93080806 27.93080806 0 0 0-2.01616287-39.45422174L551.24565315 146.51313273z'
        fill={getIconColor(color, 0, '#d81e06')}
      />
    </Svg>
  );
};

IconShouye1 = React.memo ? React.memo(IconShouye1) : IconShouye1;

export default IconShouye1;
