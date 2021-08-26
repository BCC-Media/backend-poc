import React, { useState } from 'react';
import { useForm } from 'react-final-form';
import {
    required,
    Button,
    SaveButton,
    TextInput,
    useUpdate,
    useNotify,
    useQuery,
    FormWithRedirect,
    Loading,
    Error,
    CreateButton
} from 'react-admin';
import RichTextInput from 'ra-input-rich-text';

function MediaTranslationEdit({ onChange }) {
    const [update, { }] = useUpdate('media_t');
    const notify = useNotify();
    const form = useForm();
    var parentFormValues = form.getState().values;
    console.log("parentFormValues", parentFormValues)

    const initialLoad = useQuery({
        type: 'getList',
        resource: 'media_t',
        payload: { 
            filter: {
                media_id: parentFormValues.id,
                'language#code@_eq': 'no'
            } 
        }
    });
    console.log(initialLoad.data)
    if (initialLoad.loading) return <Loading />;
    console.log(initialLoad)
    if (initialLoad.error && initialLoad.error.status === 404) return <CreateButton basePath="media_t" resource="media_t"></CreateButton>;
    else if (initialLoad.error) return <Error error={initialLoad.error} />;

    const handleSubmit = async values => {
        update(
            { payload: { id: initialLoad.data[0].id, data: values } },
            {
                onSuccess: ({ data }) => {
                    console.log(data)
                    onChange();
                },
                onFailure: ({ error }) => {
                    notify(error.message, 'error');
                }
            }
        );
    };

    return (
        <>
            <FormWithRedirect
                initialValues={initialLoad.data[0]}
                resource="media_t"
                save={handleSubmit}
                render={({
                    handleSubmitWithRedirect,
                    pristine,
                    saving
                }) => (
                    <>
                        <TextInput
                            source="title"
                            label="Title (norwegian)"
                            validate={required()}
                            fullWidth
                        />
                        <RichTextInput
                            source="description"
                            label="Description (norwegian)"
                            validate={required()}
                            fullWidth
                        />
                        <SaveButton
                            handleSubmitWithRedirect={handleSubmitWithRedirect}
                            pristine={pristine}
                            saving={saving}
                            disabled={saving}
                        />
                    </>
                )}
            />
        </>
    );
}

export default MediaTranslationEdit;
