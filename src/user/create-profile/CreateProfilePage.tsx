import React, { FunctionComponent } from 'react';

import ApiService from 'api/ApiService';
import { NavigationService } from 'core/Services/NavigationService';
import Loading from 'core/Components/Loading';


const CreateProfilePage: FunctionComponent<{}> = () => {

  ApiService.userApi.useCreateProfile().then(x => {
    NavigationService.goTo('/');
  });

  return (
    <Loading isLoading={true} />
  );
};

export default CreateProfilePage;
