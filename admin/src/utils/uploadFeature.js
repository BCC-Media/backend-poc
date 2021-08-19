// in addUploadFeature.js
/**
 * Convert a `File` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
 const convertFileToBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file.rawFile);

    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});

/**
 * For posts update only, convert uploaded image in base 64 and attach it to
 * the `picture` sent property, with `src` and `title` attributes.
 */
const addUploadFeature = requestHandler => (type, resource, params) => {
    console.log({type, resource, params});
    if (['UPDATE', 'CREATE'].includes(type) && params.data?.image?.rawFile instanceof File) {
        console.log("converting image to base64");
        return convertFileToBase64(params.data.image)
            .then(base64picture => requestHandler(type, resource, {
                ...params,
                data: {
                    ...params.data,
                    image: base64picture,
                },
            }));
    }
    // for other request types and resources, fall back to the default request handler
    return requestHandler(type, resource, params);
};

export default addUploadFeature;