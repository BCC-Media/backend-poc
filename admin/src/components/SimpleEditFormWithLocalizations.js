import React from 'react';

import { SimpleForm, useDataProvider, useNotify } from "react-admin";

export const SimpleEditFormWithLocalizations = ({save, ...args}) => {
	const notify = useNotify();
	const dataProvider = useDataProvider();
	console.log("saveFunc save", save);
	console.log("saveFunc args", args);
	const mySave = async (values,b,c) => {
		var updates = [];
		for (var obj in values) {
			const norwegian = values[obj]?.localizedstrings?.find(ls => ls.languageid == 1);
			if (norwegian == null) continue;
			updates.push(dataProvider.update('localizedstring', {
				id: norwegian.id,
				data: { value: norwegian.value }
			}).catch((reason) => {
				notify(`Saving localizedstring failed.`, 'error');
			}));
		}

		await Promise.all(updates);
		console.log(updates);
		console.log({values,b,c})
		return save(values,b,c);
	};
	return (<SimpleForm save={mySave} {...args} />);
 }