import React from 'react';

import { List, Datagrid, TextField, BooleanField, Create, SimpleForm, TextInput, SelectInput, NumberInput, DateTimeInput, NumberField, DateField, ReferenceField, ReferenceInput, Edit, EditButton} from 'react-admin';
import { QueryBuilder } from '../components/QueryBuilder';

export const QueryCreate = (props) => {
	return (
		<Create {...props}>
			<SimpleForm>
				<TextInput source="name" />
                <QueryBuilder source="filter"/>
			</SimpleForm>
		</Create>
	)
}

export const QueryEdit = (props) => {
	return (
		<Edit {...props}>
			<SimpleForm>
				<TextInput source="name"/>
                <QueryBuilder source="filter"/>
			</SimpleForm>
		</Edit>
	)
}

export const QueryList = (props) => {
	return (
		<List {...props}>
			<Datagrid>
				<TextField source="name" />
                <TextField source="filter"/>
				<EditButton/>
			</Datagrid>
		</List>
	)
}