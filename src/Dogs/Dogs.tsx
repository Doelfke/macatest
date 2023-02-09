import React, { FunctionComponent, useState } from 'react';

import ComboBox from 'form/ComboBox/ComboBox';
import { SelectOption } from 'form/ComboBox/SelectOption';
import ApiService from 'api/ApiService';
import If from 'core/Components/If';

interface Props {
    breeds: any;
}

const Dogs: FunctionComponent<Props> = (props:Props) => {

    const options = Object.keys(props.breeds.message).map((b)=> {
        return {
            label: b.toString(),
            value: b.toString()
        }
    });

    const [selectedBreed, setSelectedBreed] = useState('');
    const [breedImgUrl, setBreedImgUrl] = useState('');

    const onBreedChange = (value?: SelectOption) =>{
        setSelectedBreed(value?.value);

        if (value) {
            ApiService.dogsApi.getBreedImage(value!.value).then((resp)=>{
                setBreedImgUrl(resp.message[0]);
            })
        }
    }

    return (
        <div>
            <ComboBox name="Breeds" label="Breeds" isForForm={false} 
            options={options} value={selectedBreed} onChange={onBreedChange}/>

            <If show={!!breedImgUrl}>
                <img src={breedImgUrl} />
            </If>
        </div>
    );
};


export default Dogs;