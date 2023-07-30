import React, { useState } from 'react';
import { Button, InputField, Label, Modal, RadioButton } from '../../components';
import { useForm } from 'react-hook-form';
import { formDefaultState, formState } from './type';
import { createJob, updateJob } from '../../services/apis';
import { useJobCreatedContext } from '../../hooks/useCreatedJob';
import { useHistory } from 'react-router-dom';

type Props = {
  isOpen?: boolean;
  onClose: (isEdited?: boolean) => void;
  data?: {
    isEdit?: boolean;
    data?: formState;
    id?: string;
  };
};

const MultiStepForm: React.FC<Props> = ({ isOpen, onClose, data }: Props) => {
  const [step, setStep] = useState(1);

  const history = useHistory();

  const methods = useForm<formState>({
    defaultValues: data?.isEdit ? data?.data : formDefaultState,
    mode: 'all',
  });

  // custom hook
  const { setIsJobCreated } = useJobCreatedContext();

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  const handleNext = async () => {
    const isValid = await trigger();

    if (step === 1 && isValid) {
      setStep(2);
    }
  };

  const handleSave = async (value: formState) => {
    if (value && data?.id && data.isEdit) {
      try {
        await updateJob(data?.id, value);
        onClose(true);
      } catch (error) {
        onClose();
        history.push('/error');
      }
    } else {
      try {
        await createJob(value);
        setIsJobCreated(true);
        onClose();
      } catch (error) {
        onClose();
        history.push('/error');
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white w-[350px] sm:w-[580px] md:w-[577px] md:h-[564px] p-[15px] sm:p-[30px] md:p-[32px] border border-gray rounded-lg">
        {step === 1 && (
          <>
            <div className="grid grid-cols-2 gap-8 pb-[24px]">
              <div>
                <Label className="text-dark font-sans font-medium text-xl">
                  {' '}
                  {data?.isEdit ? 'Update the job' : 'Create a job'}
                </Label>
              </div>
              <div className="place-self-end text-dark font-sans font-normal text-lg">
                <Label>Step 1</Label>
              </div>
            </div>

            <div>
              <div className="pb-[6px] relative">
                <InputField
                  label="Job title"
                  placeholder="ex. UX UI Designer"
                  isRequired={true}
                  {...register('job_title', {
                    required: 'This field is required',
                    minLength: {
                      value: 5,
                      message: 'Job title must be at least 5 characters',
                    },
                    maxLength: {
                      value: 30,
                      message: 'Job title cannot exceed 30 characters',
                    },
                  })}
                />
                {errors.job_title && (
                  <Label className="text-error text-xs font-sans absolute bottom-[4px]">
                    {errors.job_title.message}
                  </Label>
                )}
              </div>
              <div className="pb-[6px] relative">
                <InputField
                  label="Company name"
                  placeholder="ex. Google"
                  isRequired={true}
                  {...register(`company_name`, {
                    required: 'This field is required',
                    minLength: {
                      value: 5,
                      message: ' Company name must be at least 5 characters',
                    },
                    maxLength: {
                      value: 30,
                      message: 'Company name cannot exceed 30 characters',
                    },
                  })}
                />
                {errors.company_name && (
                  <Label className="text-error text-xs font-sans absolute bottom-[4px]">
                    {errors.company_name.message}
                  </Label>
                )}
              </div>
              <div className="pb-[6px] relative">
                <InputField
                  label="Industry"
                  placeholder="ex. Information Technology"
                  isRequired={true}
                  {...register(`industry`, {
                    required: 'This field is required',
                    minLength: {
                      value: 5,
                      message: 'Industry type must be at least 5 characters',
                    },
                    maxLength: {
                      value: 30,
                      message: 'Industry type cannot exceed 30 characters',
                    },
                  })}
                />
                {errors.industry && (
                  <Label className="text-error text-xs font-sans absolute bottom-[4px]">
                    {errors.industry.message}
                  </Label>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
                <div className="relative">
                  <InputField
                    label="Location"
                    placeholder="ex. Chennai"
                    isRequired={true}
                    {...register(`location`, { required: 'This field is required' })}
                  />
                  {errors.location && (
                    <Label className="text-error text-xs font-sans absolute bottom-[-4px]">
                      {errors.location.message}
                    </Label>
                  )}
                </div>
                <div className="relative">
                  <InputField
                    label="Remote type"
                    placeholder="ex. In-office"
                    isRequired={true}
                    {...register(`remote_type`, { required: 'This field is required' })}
                  />
                  {errors.remote_type && (
                    <Label className="text-error text-xs font-sans absolute bottom-[-4px]">
                      {errors.remote_type.message}
                    </Label>
                  )}
                </div>
              </div>
            </div>
            <div className="grid place-items-end pt-[82px]">
              <Button onClick={handleNext}>Next</Button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="grid grid-cols-2 gap-8 pb-[24px]">
              <div>
                <Label className="text-dark font-sans font-medium text-xl">
                  {' '}
                  {data?.isEdit ? 'Update the job' : 'Create a job'}
                </Label>
              </div>
              <div className="place-self-end text-dark font-sans font-normal text-lg">
                <Label>Step 2</Label>
              </div>
            </div>
            <div>
              <div className="grid grid-cols-2 gap-8 pb-[5px]">
                <div className="relative">
                  <InputField
                    label="Experience"
                    placeholder="Minimum"
                    isRequired={true}
                    {...register(`experience_min`, { required: 'This field is required' })}
                  />{' '}
                  {errors.experience_min && (
                    <Label className="text-error text-xs font-sans absolute bottom-[-1px]">
                      {errors.experience_min.message}
                    </Label>
                  )}
                </div>
                <div className="relative">
                  <InputField
                    placeholder="Maximum"
                    isRequired={true}
                    {...register(`experience_max`, { required: 'This field is required' })}
                  />
                  {errors.experience_max && (
                    <Label className="text-error text-xs font-sans absolute bottom-[-1px]">
                      {errors.experience_max.message}
                    </Label>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 pb-[5px]">
                <div className="relative">
                  <InputField
                    label="Salary"
                    placeholder="Minimum"
                    isRequired={true}
                    {...register(`salary_min`, { required: 'This field is required' })}
                  />{' '}
                  {errors.salary_min && (
                    <Label className="text-error text-xs font-sans absolute bottom-[-1px]">
                      {errors.salary_min.message}
                    </Label>
                  )}
                </div>
                <div className="relative">
                  <InputField
                    placeholder="Maximum"
                    isRequired={true}
                    {...register(`salary_max`, { required: 'This field is required' })}
                  />{' '}
                  {errors.salary_max && (
                    <Label className="text-error text-xs font-sans absolute bottom-[-1px]">
                      {errors.salary_max.message}
                    </Label>
                  )}
                </div>
              </div>
              <div className="pb-[5px] relative">
                <InputField
                  label="Total employee"
                  placeholder="ex. 100"
                  isRequired={true}
                  {...register(`total_employee`, { required: 'This field is required' })}
                />
                {errors.total_employee && (
                  <Label className="text-error text-xs font-sans absolute bottom-[2px]">
                    {errors.total_employee.message}
                  </Label>
                )}
              </div>
              <div className="grid grid-cols-1 gap-[4px] mb-4">
                <Label className="block text-dark font-sans font-semibold text-sm">
                  Apply type
                </Label>
                <div className="flex flex-row gap-[16px]">
                  <RadioButton
                    label="Quick apply"
                    {...register(`apply_type`)}
                    value="Quick apply"
                  />
                  <RadioButton
                    label="External apply"
                    {...register(`apply_type`)}
                    value="External apply"
                  />
                </div>
              </div>
            </div>
            <div className="grid place-items-end pt-[84px]">
              <Button onClick={handleSubmit(handleSave)}>Save</Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default MultiStepForm;
