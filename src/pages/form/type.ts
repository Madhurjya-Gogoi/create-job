export type formState = {
  job_title: string;
  company_name: string;
  industry: string;
  location: string;
  remote_type: string;
  experience_min: string;
  salary_min: string;
  total_employee: string;
  experience_max: string;
  salary_max: string;
  apply_type: string;
};

export const formDefaultState: formState = {
  job_title: '',
  company_name: '',
  industry: '',
  location: '',
  remote_type: '',
  experience_min: '',
  salary_min: '',
  total_employee: '',
  experience_max: '',
  salary_max: '',
  apply_type: '',
};
