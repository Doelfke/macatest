import { FormikHelpers } from 'formik';

import { ApiResult } from 'api/ApiService';
import { showToast } from 'core/Components/Toast/Toast';


const handleFormError = (apiResult: ApiResult<any>, formikHelpers: FormikHelpers<any>) => {
    const result = {
        hasErrors: false,
        errorsHandled: false
    };

    if (apiResult.error) {
        result.hasErrors = true;
    }

    if (apiResult.error && Array.isArray(apiResult.error)) {
        apiResult.error.forEach(error => {
            formikHelpers.setFieldError(error.property, 'Invalid');
        });

        result.errorsHandled = true;
    }

    if (apiResult.error && !Array.isArray(apiResult.error)) {
        showToast('Error', 'Something went wrong, please try again.');

        result.errorsHandled = true;
    }

    return result;
};

export default handleFormError;