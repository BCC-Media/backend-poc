import React from 'react';

import { List, Datagrid, TextField, BooleanField, Create, SimpleForm, TextInput, SelectInput, NumberInput, DateTimeInput, NumberField, DateField, ReferenceField, ReferenceInput, Edit} from 'react-admin';

export const n_episodelist = (props) => {
	return (
		<List {...props} >
			<Datagrid>
				<TextField source="id" />
				<TextField source="image" />
				<DateField source="published" />
				<ReferenceField source="seasonid" reference="season">
					<TextField source="image" />
				</ReferenceField>
				<NumberField source="status" />
			</Datagrid>
		</List>
	);
};

export const n_episodecreate = (props) => {
	return (
		<Create {...props}>
			<SimpleForm>
				<ReferenceInput label="Enter season" source="season_id" reference="n_season">
					<SelectInput source="id" />
				</ReferenceInput>
			</SimpleForm>
		</Create>
	)
}