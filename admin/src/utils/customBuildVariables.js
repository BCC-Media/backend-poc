import buildDataProvider, { buildArgs, buildVariables } from 'ra-data-hasura';
import gql from 'graphql-tag';

/**
 * Extracts just the fields from a GraphQL AST.
 * @param {GraphQL AST} queryAst
 */
const extractFieldsFromQuery = (queryAst) => {
    return queryAst.definitions[0].selectionSet.selections;
};

// Define the additional fields that we want.
const GET_TITLE = gql`
    {
        title {
            localizedstrings {
                languageid
                value
            }
        }
    }
`;
const GET_DESCRIPTION = gql`
    {
        description {
            localizedstrings {
                languageid
                value
            }
        }
    }
`;

export const customBuildVariables = (introspectionResults) => {
    const vars = buildVariables(introspectionResults);    
    return (
        resource,
        aorFetchType,
        params,
        queryType
      ) => {
        console.log("customBuildVariables inside", {resource, aorFetchType, params, queryType});
        var result = buildVariables(introspectionResults)(resource, aorFetchType, params, queryType);
        console.log("customBuildVariables result", result)
        return result;
      };
};

export const customBuildQuery = (query, variables) => {
    const vars = buildArgs(query, variables);
    console.log("query, variables", query, variables);
    console.log("query, variables", vars);
    
    return vars;
};
