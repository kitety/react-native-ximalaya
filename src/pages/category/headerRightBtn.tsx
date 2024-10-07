import { HeaderButtons, Item } from 'react-navigation-header-buttons';

interface IHeaderRightBtnProps {
  onToggleEditing: () => void;
  isEditing: boolean;
}
const HeaderRightBtn = ({
  onToggleEditing,
  isEditing,
}: IHeaderRightBtnProps) => {
  return (
    <HeaderButtons>
      <Item title={isEditing ? '完成' : '编辑'} onPress={onToggleEditing} />
    </HeaderButtons>
  );
};

export default HeaderRightBtn;
