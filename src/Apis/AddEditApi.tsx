import React, { FunctionComponent } from 'react';
import { FormikValidatorBase, IsString, IsNotEmpty, IsNumber, Min } from 'formik-class-validator';
import { FormikHelpers } from 'formik';

import FormSection from 'form/FormSection/FormSection';
import Input from 'form/Input/Input';
import FormFooter from 'form/FormFooter/FormFooter';
import Form from 'form/Form';
import ApiService, { ApiResult } from 'api/ApiService';
import handleFormError from 'form/formUtil';
import { NavigationService } from 'core/Services/NavigationService';
import { ApiDto } from 'server/dto/api.dto';
import Button from 'core/Components/Button/Button';
import ComboBox from 'form/ComboBox/ComboBox';
import { ServerSize } from 'apiEnums';
import DangerZone from 'core/Components/DangerZone/DangerZone.';
import If from 'core/Components/If';


interface Props {
    api?: ApiDto;
}


class AddEditApiModel extends FormikValidatorBase {
    id: number = 0;

    @IsString({ message: 'Required' })
    @IsNotEmpty({ message: 'Required' })
    name: string = '';

    @IsNumber(undefined, { message: 'Required' })
    @IsNotEmpty({ message: 'Required' })
    @Min(1, { message: 'Required' })
    instanceCount: number = 1;

    @IsNumber(undefined, { message: 'Required' })
    @IsNotEmpty({ message: 'Required' })
    instanceSize: ServerSize = ServerSize.small;
}

const submit = async (values: AddEditApiModel, formikHelpers: FormikHelpers<AddEditApiModel>) => {
    const apiCallback = (x: ApiResult<ApiDto>) => {
        const result = handleFormError(x, formikHelpers);
        if (!result.hasErrors) {
            NavigationService.goTo('/apis');
        }
    };

    if (values.id) {
        ApiService.serverApi.useUpdateApi(values).then(apiCallback);
    } else {
        ApiService.serverApi.useCreateApi(values).then(apiCallback);
    }
};

const serviceSizeOptionsLength = Object.keys(ServerSize).length / 2;
const serverSizeValues = Object.keys(ServerSize).splice(0, serviceSizeOptionsLength);

const serverSizeOptions = serverSizeValues.map((x) => {
    return {
        value: parseInt(x),
        label: ServerSize[x as unknown as number]
    };
});


const AddEditApi: FunctionComponent<Props> = (props: Props) => {

    const initialValues = new AddEditApiModel();

    if (props.api) {
        initialValues.id = props.api.id;
        initialValues.name = props.api.name;
        initialValues.instanceCount = props.api.instanceCount;
        initialValues.instanceSize = props.api.instanceSize;
    }

    const validate = AddEditApiModel.createValidator();

    const saveButtonText = props.api ? 'Update Api' : 'Create Api';
    const deleteFn = () => ApiService.serverApi.useDeleteApi(props.api?.id || 0);

    return (
        <Form initialValues={initialValues} onSubmit={submit} validate={validate} render={formikBag => {
            return (
                <>
                    <FormSection>
                        <Input label="Name" name="name" />

                        <Input label="Instance Count" name="instanceCount" type="number" />

                        <ComboBox label="Instance Size" name="instanceSize" options={serverSizeOptions} />
                    </FormSection>

                    <FormFooter>
                        <Button disabled={(formikBag.submitCount && !formikBag.isValid) || formikBag.isSubmitting} isSubmit={true} fullWidth={false}>{saveButtonText}</Button>
                    </FormFooter>

                    <If show={!!props.api}>
                        <DangerZone entityName="Api" deleteFn={deleteFn} urlAfterDelete="/apis" />
                    </If>

                </>
            );
        }} />
    );
};


export default AddEditApi;