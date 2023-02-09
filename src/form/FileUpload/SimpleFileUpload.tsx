import React, { FunctionComponent, useState } from 'react';

import classes from './FileUpload.module.scss';
import { useField } from 'formik';
import Button from 'core/Components/Button/Button';
import If from 'core/Components/If';
import Icon from 'core/Components/Icon/Icon';
import { Color } from 'Color';


interface Props {
    name: string;
    disabled?: boolean;
}


const SimpleFileUpload: FunctionComponent<Props> = (props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [field, meta, helpers] = useField(props.name);

    const [imagePreview, setImagePreview] = useState('');

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.currentTarget.files;

        if (files && files.length) {
            helpers.setValue(files[0]);
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
            <If show={!imagePreview}>
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
            <If show={!!imagePreview}>
                <div className={classes.previewContainer}>
                    <div className={classes.imageContainer}>
                        <div className={classes.previewRemove}>
                            <Icon name="x-circle" size="lg" color={Color.primary_danger_red} backgroundColor={Color.utility_white} onClick={onRemove} />
                        </div>
                        <img src={imagePreview} alt="New" />
                    </div>
                </div>
            </If>
        </>
    );
};


export default SimpleFileUpload;