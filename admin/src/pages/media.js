import React, { useCallback, useRef } from 'react';

import {  useQueryWithStore, Loading, Error, List, Datagrid, TextField, BooleanField, Create, SimpleForm, TextInput, ReferenceField, NumberInput, DateTimeInput, NumberField, DateField, Edit, EditButton, ImageInput, ImageField, Show, SimpleShowLayout, RichTextField, ReferenceInput, FormDataConsumer, useDataProvider, useNotify, ReferenceManyField, ShowButton, BooleanInput, TabbedForm, FormWithRedirect, SaveButton, Toolbar, DeleteButton, DeleteWithUndoButton, FunctionField, DataProviderContext } from 'react-admin';
import { StatusField, StatusInput } from '../components/StatusComponents';
import RichTextInput from 'ra-input-rich-text';
import { LocalizableStringQuickEdit } from './localizablestring';
import { useMutation } from '@apollo/client';
import { SimpleEditFormWithLocalizations } from '../components/SimpleEditFormWithLocalizations';
import MediaTranslationEdit from './media/MediaTranslationEdit';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { Box, FormGroup } from '@material-ui/core';
import { MediaTypeInput } from '../components/MediaTypeComponents';
import { createId } from 'ra-data-hasura';

export const MediaListWithFilter = (filter) => (props) => {
	return (
		<List basePath="media" resource="media" filter={filter} {...props} >
			<Datagrid>
				<TextField label="Title" source="translated_fields[0].title" />
				<RichTextField label="Description" source="translated_fields[0].description" />
				<StatusField source="status" />
				<TextField source="id" />
				<ShowButton />
				<EditButton/>
			</Datagrid>
		</List>
	);
};

export const MediaCreate = (props) => {
	return (
		<Create {...props}>
			<SimpleForm>
				<ImageInput label="Enter image" source="image">
					<ImageField source="image"/>
				</ImageInput>
				<MediaTypeInput source="type" />
				<NumberInput style={{display:'none'}} initialValue="1" source="translated_fields.data[0].language_id" />
				<TextInput label="Enter title (norwegian)" source="translated_fields.data[0].title" />
				<RichTextInput label="Enter description (norwegian)" source="translated_fields.data[0].description" />
				<BooleanInput source="is_draft" />
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

export const MediaEdit = (props) => {
	return (
		<Edit {...props}>
			<FormWithRedirect
			render={formProps => (
				<>
					<Box p="1em">
						<h3>Translated fields</h3>
						<MediaTranslationEdit />
					</Box>
					<Box p="1em">
						<h3>Details</h3>
						<MediaTypeInput source="type"/>
						<ImageInput label="Enter image" source="image">
							<ImageField/>
						</ImageInput>
						<DateTimeInput label="Available from" source="available_from" />
						<DateTimeInput label="Available to" source="available_to" />
						<BooleanInput label="Draft" source="is_draft" />
					</Box>
					<Toolbar>
						<Box display="flex" justifyContent="space-between" width="100%">
							<SaveButton
								saving={formProps.saving}
								handleSubmitWithRedirect={formProps.handleSubmitWithRedirect}
							/>
							<DeleteWithUndoButton record={formProps.record} />
						</Box>
					</Toolbar>
				</>
			)}/>
		</Edit>
	)
}

export const MediaShow = (props) => (
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
			target="Mediaid"
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