import React from 'react'
import { Create, Datagrid, Edit, EditButton, List, NumberInput, ShowButton, SimpleForm, TextField, TextInput } from "react-admin"

export const VideoList = (props) => {
	return (
		<List {...props}>
			<Datagrid>
				<TextField source="filename" />
			</Datagrid>
		</List>
	)
}

export const VideoCreate = (props) => {
	return (
		<Create {...props}>
			<SimpleForm>
				<TextInput source="filename" />
				<TextInput source="urls.data.type" />
				<TextInput source="urls.data.value" />
				<TextInput source="urls.data.contentKeyId" />
			</SimpleForm>
		</Create>
	)
}