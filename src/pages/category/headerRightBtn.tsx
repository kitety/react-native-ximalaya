import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { useAppSelector } from '~/hooks/state';

interface IHeaderRightBtnProps {
  onToggleEditing: () => void;
}
const HeaderRightBtn = ({ onToggleEditing }: IHeaderRightBtnProps) => {
  const { isEditing } = useAppSelector((s) => s.category);
  return (
    <HeaderButtons>
      <Item title={isEditing ? '完成' : '编辑'} onPress={onToggleEditing} />
    </HeaderButtons>
  );
};

export default HeaderRightBtn;
