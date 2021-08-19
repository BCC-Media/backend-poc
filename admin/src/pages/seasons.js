import RichTextInput from 'ra-input-rich-text';
import React from 'react';

import { List, Datagrid, TextField, ReferenceField, Create, SimpleForm, TextInput, SelectInput, NumberInput, DateTimeInput, NumberField, DateField, ReferenceInput, Edit, ImageInput, EditButton, ImageField, RichTextField, ShowButton } from 'react-admin';
import { SimpleEditFormWithLocalizations } from '../components/SimpleEditFormWithLocalizations';
import { StatusField, StatusInput } from '../components/StatusComponents';

export const SeasonList = (props) => {
	return (
		<List {...props} >
			<Datagrid>
				<ReferenceField label="Series" source="seriesid" reference="series">
					<TextField source="title.localizedstrings[0].value" />
				</ReferenceField>
				<TextField source="id" />
				<TextField label="Title" source="title.localizedstrings[0].value" />
				<RichTextField label="Description" source="description.localizedstrings[0].value" />
				<ImageField source="image" />
				<DateField source="published" />
				<StatusField source="status" />
				<ShowButton/>
			</Datagrid>
		</List>
	);
};

export const SeasonCreate = (props) => {
	return (
		<Create {...props}>
			<SimpleForm>
				<ReferenceInput label="Enter series" source="seriesid" reference="series">
					<SelectInput optionText="title.localizedstrings[0].value" />
				</ReferenceInput>
				<ImageInput label="Enter image" source="image">
					<ImageField source="image"/>
				</ImageInput>
				<TextInput label="Enter title (norwegian)" source="title.data.localizedstrings.data.value" />
				<NumberInput style={{display:'none'}} initialValue="1" source="title.data.localizedstrings.data.languageid" />
				<RichTextInput label="Enter description (norwegian)" source="description.data.localizedstrings.data.value" />
				<NumberInput style={{display:'none'}} initialValue="1" source="description.data.localizedstrings.data.languageid" />
				<StatusInput label="Enter status" source="status" />
				<DateTimeInput label="Enter publish date" source="published" />
			</SimpleForm>
		</Create>
	)
}


export const SeasonEdit = (props) => {
	return (
		<Edit {...props}>
			<SimpleEditFormWithLocalizations>
				<ReferenceInput label="Enter series" source="seriesid" reference="series">
					<SelectInput optionText="title.localizedstrings[0].value" />
				</ReferenceInput>
				<ImageInput label="Enter image" source="image">
					<ImageField source="image"/>
				</ImageInput>
				<TextInput label="Enter title (norwegian)" source="title.localizedstrings[0].value" />
				<RichTextInput label="Description" source="description.localizedstrings[0].value" />
				<StatusInput label="Enter status" source="status" />
				<DateTimeInput label="Enter publish date" source="published" />
			</SimpleEditFormWithLocalizations>
		</Edit>
	)
}
