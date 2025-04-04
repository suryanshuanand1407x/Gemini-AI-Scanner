import React from 'react';
import { useForm } from 'react-hook-form';
import { Briefcase, Building2, FileText, ListChecks, Users } from 'lucide-react';
import type { JobDetails } from '../types/screening';

interface JobFormProps {
  onSubmit: (data: JobDetails) => void;
  isLoading: boolean;
}

export function JobForm({ onSubmit, isLoading }: JobFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<JobDetails>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Building2 className="w-4 h-4" />
            Company Name
          </label>
          <input
            {...register('company', { required: 'Company name is required' })}
            className="input-field"
            placeholder="Enter company name"
          />
          {errors.company && (
            <p className="mt-2 text-sm text-red-600">{errors.company.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Briefcase className="w-4 h-4" />
            Job Title
          </label>
          <input
            {...register('title', { required: 'Job title is required' })}
            className="input-field"
            placeholder="Enter job title"
          />
          {errors.title && (
            <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
            <Users className="w-4 h-4" />
            Employment Type
          </label>
          <select
            {...register('type', { required: 'Employment type is required' })}
            className="input-field"
          >
            <option value="">Select type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
          </select>
          {errors.type && (
            <p className="mt-2 text-sm text-red-600">{errors.type.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <FileText className="w-4 h-4" />
          Job Description
        </label>
        <textarea
          {...register('description', { required: 'Job description is required' })}
          rows={4}
          className="input-field"
          placeholder="Enter a detailed job description"
        />
        {errors.description && (
          <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
          <ListChecks className="w-4 h-4" />
          Key Responsibilities
        </label>
        <textarea
          {...register('responsibilities', { required: 'Responsibilities are required' })}
          rows={4}
          className="input-field"
          placeholder="List the key responsibilities for this role"
        />
        {errors.responsibilities && (
          <p className="mt-2 text-sm text-red-600">{errors.responsibilities.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating Questions...' : 'Generate Screening Questions'}
      </button>
    </form>
  );
}