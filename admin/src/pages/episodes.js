import React from 'react';

import { List, Datagrid, TextField, BooleanField, Create, SimpleForm, TextInput, SelectInput, NumberInput, DateTimeInput, NumberField, DateField, ReferenceField, ReferenceInput, Edit} from 'react-admin';

export const EpisodeList = (props) => {
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

export const EpisodeCreate = (props) => {
	return (
		<Create {...props}>
			<SimpleForm>
				<TextInput label="Enter image" source="image" />
				<NumberInput label="Enter status" source="status" />
				<DateTimeInput label="Enter publish date" source="published" />
				<ReferenceInput label="Enter season" source="seasonid" reference="season">
					<SelectInput optionText="image" />
				</ReferenceInput>
			</SimpleForm>
		</Create>
	)
}