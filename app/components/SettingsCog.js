import React from 'react';
import { Glyphicon, DropdownButton, MenuItem } from 'react-bootstrap';

const SettingsCog = ({ items }) => {
	const menuItems = items.map((item, i) => {
		return <MenuItem key={i} eventKey={i} onClick={item.onClick}>{item.label}</MenuItem>;
	});
	return (
		<DropdownButton title={<Glyphicon glyph="cog" />} noCaret pullRight id="settings-cog">
      {menuItems}
    </DropdownButton>
	);
};

export default SettingsCog;