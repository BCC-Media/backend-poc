import React, { useState } from 'react';
import { useForm } from 'react-final-form';
import { parseId, createId } from 'ra-data-hasura';
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

export const CategoryTranslationEdit = ({ onChange }) => {
    const [update, { }] = useUpdate('category_t');
    const notify = useNotify();
    const form = useForm();
    var parentFormValues = form.getState().values;
    console.log("parentFormValues", parentFormValues)
    var parentPK = parseId(parentFormValues.id);
    var primaryKey = {
        id: parentPK.id,
        language_id: 1
    };

    const initialLoad = useQuery({
        type: 'getOne',
        resource: 'category_t',
        payload: { id: createId(primaryKey) }
    });
    console.log(initialLoad.data)
    if (initialLoad.loading) return <Loading />;
    console.log(initialLoad)
    if (initialLoad.error && initialLoad.error.status === 404) return <CreateButton basePath="media_t" resource="media_t"></CreateButton>;
    else if (initialLoad.error) return <Error error={initialLoad.error} />;

    const handleSubmit = async values => {
        update(
            { payload: { data: values } },
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
                initialValues={initialLoad.data}
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