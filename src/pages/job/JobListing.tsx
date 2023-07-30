/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import JobCard from './jobCard';
import { getAllJobs } from '../../services/apis';
import { useJobCreatedContext } from '../../hooks/useCreatedJob';
import { useHistory } from 'react-router-dom';

export interface Jobs {
  company_name: string;
  experience_max: number;
  experience_min: number;
  id: string;
  industry: string;
  job_title: string;
  location: string;
  remote_type: string;
  salary_max: number;
  salary_min: number;
  total_employee: number;
  apply_type: string;
}

const JobListing = () => {
  const [jobsList, setJobsList] = useState<Jobs[]>([]);

  const history = useHistory();

  const fetchAllJobs = async () => {
    try {
      const data = await getAllJobs();
      if (data) {
        setJobsList(data);
      }
    } catch (error) {
      history.push('/error');
    }
  };

  // custom hook
  const { isJobCreated, setIsJobCreated } = useJobCreatedContext();

  useEffect(() => {
    if (isJobCreated) {
      fetchAllJobs();
      setIsJobCreated(false);
    }
  }, [isJobCreated, setIsJobCreated]);

  useEffect(() => {
    fetchAllJobs();
  }, []);

  return (
    <>
      <div className="h-[100vh] bg-gray grid grid-cols-1 md:grid-cols-2 gap-8 px-5 md:px-10 py-12 pt-20 overflow-auto">
        {jobsList && jobsList.length > 0 ? (
          <>
            {jobsList.map((job: Jobs, index: number) => {
              return <JobCard data={job} key={index} />;
            })}
          </>
        ) : (
          <>Loading...</>
        )}
      </div>
    </>
  );
};

export default JobListing;
