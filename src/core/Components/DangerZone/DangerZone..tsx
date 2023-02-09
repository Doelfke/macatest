import Button from 'core/Components/Button/Button';
import { showToast } from 'core/Components/Toast/Toast';
import { NavigationService } from 'core/Services/NavigationService';
import FormSection from 'form/FormSection/FormSection';
import Input from 'form/Input/Input';
import React, { FunctionComponent, useState } from 'react';

interface Props {
    entityName: string;
    deleteFn: () => Promise<any>;
    urlAfterDelete: string;
}

const DangerZone: FunctionComponent<Props> = (props: Props) => {
    const [confirmDeleteValue, setConfirmDeleteValue] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const onConfirmDeleteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmDeleteValue(event.target.value);
    };

    const deleteFn = () => {
        setIsDeleting(true);
        props.deleteFn().then(() => {
            showToast('Success', `${props.entityName} successfully deleted.`);
            NavigationService.goTo(props.urlAfterDelete);
        });
    };

    return (
        <FormSection title="Danger Zone">
            <div>Type &quot;delete&quot; below to delete this {props.entityName}.</div>
            <Input name="confirmDelete" onChange={onConfirmDeleteChange} isForForm={false} />
            <Button type="Secondary" fullWidth={false} onClick={deleteFn} disabled={confirmDeleteValue !== 'delete' || isDeleting}>Delete {props.entityName}</Button>
        </FormSection>
    );
};


export default DangerZone;