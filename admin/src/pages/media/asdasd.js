import React from 'react';
import {
    Edit,
    TextInput,
    SimpleForm,
    required,
    SaveButton,
    Toolbar,
    translate
} from 'react-admin';
import Button from '@material-ui/core/Button';

const MediaTranslationEditToolbar = translate(({ onCancel, translate, ...props }) => (
    <Toolbar {...props}>
        <SaveButton />
        <Button onClick={onCancel}>{translate('ra.action.cancel')}</Button>
    </Toolbar>
));

export const PostQuickCreateButton = ({ onChange }) => {
    const form = useForm();
    
}

const MediaTranslationEdit = ({ onCancel, ...props }) => (
    

    <Edit title=" " {...props}>
        <SimpleForm toolbar={<MediaTranslationEditToolbar onCancel={onCancel} />}>
            <TextInput source="title" validate={required()} />
            <TextInput source="description" validate={required()} />
        </SimpleForm>
    </Edit>
);

export default MediaTranslationEdit;
