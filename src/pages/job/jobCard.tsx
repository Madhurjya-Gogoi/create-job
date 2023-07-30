import React from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { Button, ContentRow, Label } from '../../components';
import { Jobs } from './JobListing';
import { numberWithCommas } from '../../helper/numberHelper';
type JobCardProps = {
  data: Jobs;
};

const JobCard = (props: JobCardProps) => {
  const { data } = props;
  const history = useHistory();

  const handleNagivate = (id: any) => {
    if (id) {
      history.push(`/job/${id}`);
    }
  };

  return (
    <div className="border border-gray bg-white rounded-lg px-[24px] py-[16px] cursor-pointer">
      <div onClick={() => handleNagivate(data.id)}>
        <ContentRow>
          <div>
            <img src={Logo} alt="logo.png" className="h-11 w-11" cursor-pointer />
          </div>
          <div className="flex flex-col gap-1 cursor-pointer">
            <Label className="text-dark font-sans font-medium text-xl cursor-pointer">
              {data.job_title}
            </Label>
            <Label className="text-dark font-sans font-medium cursor-pointer">
              {data.company_name} - {data.industry}
            </Label>
            <Label className="text-textGray cursor-pointer">
              {data.location} ({data.remote_type})
            </Label>

            <Label className="text-dark font-sans pt-[24px] cursor-pointer">
              Part-Time (9.00 am - 5.00 pm IST)
            </Label>
            <Label className="text-dark font-sans cursor-pointer ">
              Experience ({`${data.experience_min}-${data.experience_max}Years`})
            </Label>
            <Label className="text-dark font-sans cursor-pointer">
              INR {numberWithCommas(data.salary_min)} - {numberWithCommas(data.salary_max)} / month
            </Label>
            <Label className="text-dark font-sans cursor-pointer">
              1-{data.total_employee} employess
            </Label>
            <div className="pt-[24px] flex flex-row gap-8 cursor-pointer">
              {data.apply_type === 'Quick apply' && <Button variant="contained">Apply Now</Button>}
              {data.apply_type === 'External apply' && (
                <Button variant="outline">External Apply</Button>
              )}
            </div>
          </div>
        </ContentRow>
      </div>
    </div>
  );
};

export default JobCard;
