import React, { Component, Fragment } from 'react';

import { List, Datagrid, TextField, BooleanField, Create, SimpleForm, TextInput, SelectInput, NumberInput, DateTimeInput, NumberField, DateField, ReferenceField, ReferenceInput, Edit, UPDATE, crudGetMatching} from 'react-admin';

import dataProvider from "../App";


export const LocalizableStringQuickEdit = (props) => {
	return (
		<Edit {...props} resource="localizablestring">
			<SimpleForm>
                <TextInput label="Enter title (norwegian)" source="localizedstrings[0].value" />
			</SimpleForm>
		</Edit>
	)
}

/* 
export class LocalizableStringQuickEdit extends Component {

    handleSubmit = values => {
        console.log(this.props)
        const { change, fetchStart, fetchEnd, showNotification, dataProvider } = this.props;
            
        // Dispatch an action letting react-admin know a API call is ongoing
        fetchStart();
        dataProvider(UPDATE, "localizablestring", { data: values })
        .then(({ data }) => {
            // Refresh the choices of the ReferenceInput to ensure our newly created post
            // always appear, even after selecting another post
            crudGetMatching(
                "posts",
                "comments@post_id",
                { page: 1, perPage: 25 },
                { field: "id", order: "DESC" },
                {}
            );
            this.setState({ showDialog: false });
        })
        .catch(error => {
            showNotification(error.message, "error");
        })
        .finally(() => {
            // Dispatch an action letting react-admin know a API call has ended
            fetchEnd();
        });
    }

    render() {
        return (
            <Fragment>
                <SimpleForm save={this.handleSubmit} resource="localizablestring" toolbar={null} >
                    <TextInput label="Enter title (norwegian)" source="localizedstrings[0].value" />
                </SimpleForm>
            </Fragment>
        )
    }
} */