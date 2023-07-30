import { formDefaultState, formState } from '../pages/form/type';

export const formatFormData = (data: formState): formState => {
  let formattedData = formDefaultState;
  formattedData = {
    ...formattedData,
    job_title: data.job_title,
    company_name: data.company_name,
    industry: data.industry,
    location: data.location,
    remote_type: data.remote_type,
    experience_min: data.experience_min.toString(),
    salary_min: data.salary_min.toString(),
    total_employee: data.total_employee.toString(),
    experience_max: data.experience_max.toString(),
    salary_max: data.salary_max.toString(),
    apply_type: data.apply_type,
  };

  return formattedData;
};
