/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Logo from '../../assets/logo.png';
import { Button, ContentRow, Label } from '../../components';
import { useHistory, useParams } from 'react-router-dom';
import { deleteJob, getJob } from '../../services/apis';
import { Jobs } from './JobListing';
import { numberWithCommas } from '../../helper/numberHelper';
import { Pencil, Trash } from '../../assets';
import MultiStepForm from '../form';
import { formatFormData } from '../../helper/format';

const JobDetails = () => {
  const params: { id: string } = useParams();
  const [jobDetails, setJobDeatils] = useState<Jobs>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modal, setModal] = useState<any>();

  const history = useHistory();

  const fetchJobDetail = async (id: string) => {
    if (id) {
      try {
        const data = await getJob(id);
        if (data) {
          setJobDeatils(data);
        }
      } catch (error) {
        history.push('/error');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (id) {
      try {
        await deleteJob(id);
        history.push('/');
      } catch (error) {
        history.push('/error');
      }
    }
  };

  const handleOpen = (modal: any) => {
    setIsModalOpen(true);
    setModal({
      isEdit: true,
      data: formatFormData(modal),
      id: modal.id,
    });
  };

  const handleClosed = (isEdited?: boolean) => {
    setIsModalOpen(false);
    setModal({});
    if (isEdited) {
      fetchJobDetail(params.id);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchJobDetail(params.id);
    }
  }, [params.id]);

  return (
    <div className="h-[100vh] bg-gray grid grid-cols-1 md:grid-cols-2 gap-8 px-5 md:px-14 py-12 pt-24">
      {jobDetails ? (
        <div className="h-[400px] md:h-[325px] sm:w-full md:w-[750px] lg:w-[830px] border border-gray bg-white rounded-lg px-[24px] py-[16px] relative">
          <div>
            <ContentRow>
              <div>
                <img src={Logo} alt="logo.png" className="h-11 w-11" />
              </div>
              <div className="flex flex-col gap-1">
                <Label className="text-dark font-sans font-medium text-xl">
                  {jobDetails.job_title}
                </Label>
                <Label className="text-dark font-sans font-medium">
                  {jobDetails.company_name} - {jobDetails.industry}
                </Label>
                <Label className="text-textGray">
                  {jobDetails.location} ({jobDetails.remote_type})
                </Label>

                <Label className="text-dark font-sans pt-[24px]">
                  Part-Time (9.00 am - 5.00 pm IST)
                </Label>
                <Label className="text-dark font-sans ">
                  Experience ({`${jobDetails.experience_min}-${jobDetails.experience_max}Years`})
                </Label>
                <Label className="text-dark font-sans ">
                  INR {numberWithCommas(jobDetails.salary_min)} -{' '}
                  {numberWithCommas(jobDetails.salary_max)} / month
                </Label>
                <Label className="text-dark font-sans ">
                  1-{jobDetails.total_employee} employess
                </Label>
                <div className="pt-[24px] flex flex-row gap-8">
                  {jobDetails.apply_type === 'Quick apply' && (
                    <Button variant="contained">Apply Now</Button>
                  )}
                  {jobDetails.apply_type === 'External apply' && (
                    <Button variant="outline">External Apply</Button>
                  )}
                </div>
              </div>
            </ContentRow>
          </div>
          <div className="flex flex-row place-content-end gap-5 absolute top-4 right-6">
            <Pencil className="w-5 h-5 cursor-pointer" onClick={() => handleOpen(jobDetails)} />
            <Trash className="w-5 h-5 cursor-pointer" onClick={() => handleDelete(jobDetails.id)} />
          </div>
        </div>
      ) : (
        'Loading...'
      )}
      {isModalOpen && <MultiStepForm isOpen={isModalOpen} onClose={handleClosed} data={modal} />}
    </div>
  );
};

export default JobDetails;
