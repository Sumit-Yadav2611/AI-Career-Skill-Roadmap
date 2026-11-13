import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileCheck,
  AlertCircle,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { careerService } from '../../services/careerService';
import { isMockMode } from '../../services/api';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';

export const ResumeUploader = ({ onResumeParsed }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [parseStatus, setParseStatus] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateAndProcessFile = (selectedFile) => {
    setError('');
    if (!selectedFile) return;

    const hasPdfExtension = selectedFile.name.toLowerCase().endsWith('.pdf');
    const hasPdfMimeType = selectedFile.type === 'application/pdf';

    if (!hasPdfExtension || (selectedFile.type && !hasPdfMimeType)) {
      setError('Please select a valid PDF file.');
      return;
    }

    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    setFile(selectedFile);
    uploadAndParse(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
    // Allow selecting the same file again after a failed upload.
    e.target.value = '';
  };

  const uploadAndParse = async (targetFile) => {
    try {
      setIsUploading(true);
      setParseStatus(
        isMockMode
          ? 'Preparing a sample result. The uploaded file is not parsed in demo mode.'
          : 'Uploading your PDF to the resume parsing service...'
      );

      const result = await careerService.parseResume(targetFile);

      setParseStatus(isMockMode ? 'Sample preview ready.' : 'Resume analysis completed.');
      if (onResumeParsed) {
        onResumeParsed(result);
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Resume analysis failed. Please check the PDF and try again.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4 gap-3">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            Resume Analyzer
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Upload a PDF resume to review extracted profile information and skills.
          </p>
        </div>
        <Badge variant={isMockMode ? 'amber' : 'indigo'} size="sm">
          {isMockMode ? 'Demo data' : 'API mode'}
        </Badge>
      </div>

      {isMockMode && (
        <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
          Development demo mode: the file is not parsed or uploaded. The preview contains sample data and must not be treated as your resume analysis.
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Select or drop a PDF resume"
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 ${
          dragActive
            ? 'border-brand-500 bg-brand-50/50 scale-[1.01]'
            : 'border-slate-200 hover:border-brand-400 hover:bg-slate-50/60'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-3 shadow-inner">
            <UploadCloud className="w-7 h-7" />
          </div>

          <p className="text-sm font-bold text-slate-800">
            {file ? file.name : 'Click to upload or drag & drop your resume PDF'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            PDF format only (Max 5MB)
          </p>

          <Button
            size="sm"
            variant="secondary"
            className="mt-4 pointer-events-none"
          >
            Select PDF File
          </Button>
        </div>
      </div>

      {isUploading && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-brand-600 animate-spin" />
          <div className="text-xs">
            <p className="font-bold text-slate-800">
              {isMockMode ? 'Preparing demo preview' : 'Analyzing resume'}
            </p>
            <p className="text-slate-500">{parseStatus}</p>
          </div>
        </div>
      )}

      {file && !isUploading && (
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold truncate">{file.name}</span>
            <span className="text-emerald-600 shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
          </div>
          <Badge variant={isMockMode ? 'amber' : 'emerald'} size="sm">
            {isMockMode ? 'Sample preview' : 'Analyzed'}
          </Badge>
        </div>
      )}
    </Card>
  );
};
export default ResumeUploader;
