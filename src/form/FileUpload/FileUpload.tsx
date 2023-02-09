import React, { FunctionComponent, useState, useEffect } from 'react';
import { useField } from 'formik';

import Button from 'core/Components/Button/Button';
import If from 'core/Components/If';
import Icon from 'core/Components/Icon/Icon';
import { Color } from 'Color';
import { ApiResult } from 'api/ApiService';

import classes from './FileUpload.module.scss';
import Loading from 'core/Components/Loading';


interface Props {
    name: string;
    presignedUrlFn(fileName: string, contentType: string): Promise<ApiResult<string>>;
    disabled?: boolean;
}


const FileUpload: FunctionComponent<Props> = (props: Props) => {
    const [field, meta, helpers] = useField(props.name);

    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (field.value) {
            setImagePreview(field.value);

            if (field.value.indexOf('?') > -1) {
                const pictureUrl = field.value.split('?')[0].split('/').pop()!;
                helpers.setValue(pictureUrl);
            }
        }
        // eslint-disable-next-line
    }, []);

    const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);

        const files = event.currentTarget.files;

        if (files && files.length) {
            const presignedUrl = await props.presignedUrlFn(files[0].name, files[0].type);

            const uploadedPicture = await fetch(presignedUrl.data!, {
                method: 'PUT',
                body: files[0]
            });

            const pictureUrl = uploadedPicture.url.split('?')[0].split('/').pop()!;

            helpers.setValue(pictureUrl);
            setTimeout(() => helpers.setTouched(true));

            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(files[0]);
        } else {
            helpers.setValue(null);
            setTimeout(() => helpers.setTouched(true));
            setImagePreview('');
        }

        setIsLoading(false);
    };

    const onRemove = () => {
        helpers.setValue(null);
        setTimeout(() => helpers.setTouched(true));
        setImagePreview('');
    };

    const uploadButtonClick = () => {
        document.getElementById('file' + props.name)!.click();
    };

    return (
        <>
            <If show={!imagePreview && !isLoading}>
                <div className={classes.container}>
                    <Button type="Secondary" fullWidth={false} onClick={uploadButtonClick}>Add image +</Button>
                    <input
                        id={'file' + props.name}
                        type="file"
                        onChange={onChange}
                        disabled={props.disabled === true}
                        className={classes.input}
                        accept=".png"
                    />
                    {
                        meta.touched && meta.error && <div style={{ color: 'red' }}>{meta.error}</div>
                    }
                </div>
            </If>
            <If show={!!imagePreview && !isLoading}>
                <div className={classes.previewContainer}>
                    <div className={classes.imageContainer}>
                        <div className={classes.previewRemove}>
                            <Icon name="x-circle" size="lg" color={Color.primary_danger_red} backgroundColor={Color.utility_white} onClick={onRemove} />
                        </div>
                        <img src={imagePreview} alt="New" className={classes.previewImage} />
                    </div>
                </div>
            </If>
            <If show={isLoading}>
                <div className={classes.loading}>
                    <Loading isLoading={true} />
                </div>
            </If>
        </>
    );
};


export default FileUpload;