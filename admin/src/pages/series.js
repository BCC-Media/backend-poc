import React, { useCallback, useRef } from 'react';

import {  useQueryWithStore, Loading, Error, List, Datagrid, TextField, BooleanField, Create, SimpleForm, TextInput, ReferenceField, NumberInput, DateTimeInput, NumberField, DateField, Edit, EditButton, ImageInput, ImageField, Show, SimpleShowLayout, RichTextField, ReferenceInput, FormDataConsumer, useDataProvider, useNotify, ReferenceManyField, ShowButton } from 'react-admin';
import { StatusField, StatusInput } from '../components/StatusComponents';
import RichTextInput from 'ra-input-rich-text';
import { LocalizableStringQuickEdit } from './localizablestring';
import { useMutation } from '@apollo/client';
import { SimpleEditFormWithLocalizations } from '../components/SimpleEditFormWithLocalizations';

export const SeriesList = (props) => {
	return (
		<List {...props} >
			<Datagrid>
				<TextField source="id" />
				<TextField label="Title" source="title.localizedstrings[0].value" />
				<RichTextField label="Description" source="description.localizedstrings[0].value" />
				<ImageField source="image" />
				<DateField source="published" />
				<StatusField source="status" />
				<ShowButton />
			</Datagrid>
		</List>
	);
};

export const SeriesCreate = (props) => {
	return (
		<Create {...props}>
			<SimpleForm>
				<ImageInput label="Enter image" source="image">
					<ImageField source="image"/>
				</ImageInput>
				<TextInput label="Enter title (norwegian)" source="title.data.localizedstrings.data.value" />
				<NumberInput style={{display:'none'}} initialValue="1" source="title.data.localizedstrings.data.languageid" />
				<RichTextInput label="Enter description (norwegian)" source="description.data.localizedstrings.data.value" />
				<NumberInput style={{display:'none'}} initialValue="1" source="description.data.localizedstrings.data.languageid" />
				<NumberInput label="Enter status" source="status" />
				<DateTimeInput label="Enter publish date" source="published" />
			</SimpleForm>
		</Create>
	)
}

const LocalizedStringEdit = ({ record }) => {
   const { loaded, error, data } = useQueryWithStore({
        type: 'getOne',
        resource: 'users',
        payload: { id: record.id }
    });
    if (!loaded) { return <Loading />; }
    if (error) { return <Error />; }
    return <div>User {data.username}</div>;
};

export const SeriesEdit = (props) => {
	return (
		<Edit {...props}>
			<SimpleEditFormWithLocalizations>
				<ImageInput label="Enter image" source="image" />
				<TextInput label="Enter title (norwegian)" source="title.localizedstrings[0].value" />
				<RichTextInput label="Description" source="description.localizedstrings[0].value" />
				<StatusInput label="Enter status" source="status" />
				<DateTimeInput label="Enter publish date" source="published" />
			</SimpleEditFormWithLocalizations>
		</Edit>
	)
}

export const SeriesShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
			<TextField source="id" />
			<TextField label="Title" source="title.localizedstrings[0].value" />
			<RichTextField label="Description" source="description.localizedstrings[0].value" />
			<ImageField source="image" />
			<DateField source="published" />
			<StatusField source="status" />
			
			<ReferenceManyField
			reference="season"
			target="seriesid"
			label="Seasons">
				<Datagrid>
					<DateField source="published" />
					<TextField source="title.localizedstrings[0].value" />
					<RichTextField source="description.localizedstrings[0].value" />
					<EditButton />
				</Datagrid>
			</ReferenceManyField>
        </SimpleShowLayout>
    </Show>
);