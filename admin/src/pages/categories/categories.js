import React from 'react';

import { List, Datagrid, TextField, BooleanField, Create, SimpleForm, TextInput, SelectInput, NumberInput, DateTimeInput, NumberField, DateField, ReferenceField, ReferenceInput, Edit, EditButton} from 'react-admin';
import {CategoryTranslationEdit} from './CategoryTranslationEdit.js';

export const CategoryCreate = (props) => {
	return (
		<Create {...props}>
			<SimpleForm>
				<NumberInput style={{display:'none'}} initialValue="1" source="translated_fields.data[0].language_id" />
				<TextInput label="Enter title (norwegian)" source="translated_fields.data[0].title" />
			</SimpleForm>
		</Create>
	)
}
export const CategoryEdit = (props) => {
	return (
		<Edit {...props}>
			<SimpleForm>
				<CategoryTranslationEdit/>
				<TextInput source="test"/>
			</SimpleForm>
		</Edit>
	)
}
export const CategoryList = (props) => {
	return (
		<List {...props}>
			<Datagrid>
				<TextField source="translated_fields[0].title" label="Title" />
				<EditButton/>
			</Datagrid>
		</List>
	)
}