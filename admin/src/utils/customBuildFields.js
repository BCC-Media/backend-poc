import buildDataProvider, { buildFields } from 'ra-data-hasura';
import gql from 'graphql-tag';

/**
 * Extracts just the fields from a GraphQL AST.
 * @param {GraphQL AST} queryAst
 */
const extractFieldsFromQuery = (queryAst) => {
    return queryAst.definitions[0].selectionSet.selections;
};

// Define the additional fields that we want.
const GET_DESCRIPTION = gql`
    {
        translated_fields {
            description
        }
    }
`;
const GET_TITLE = gql`
    {
        translated_fields {
            title
        }
    }
`;

export const customBuildFields = (type, requestType) => {
    const fields = buildFields(type, requestType);

    console.log("customBuildFields", requestType, type);
    if (['media'].includes(type.name)/*  && ['GET_ONE', 'GET_LIST', 'UPDATE'].includes(requestType) */) {
        fields.push(...extractFieldsFromQuery(GET_TITLE));
        fields.push(...extractFieldsFromQuery(GET_DESCRIPTION));
    }
    if (['categories'].includes(type.name)/*  && ['GET_ONE', 'GET_LIST', 'UPDATE'].includes(requestType) */) {
        fields.push(...extractFieldsFromQuery(GET_TITLE));
    }
    
    return fields;
};
