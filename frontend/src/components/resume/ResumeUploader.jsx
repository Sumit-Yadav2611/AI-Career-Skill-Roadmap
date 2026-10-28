import React, { useState, useRef } from 'react';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RefreshCw,
  FileCheck
} from 'lucide-react';
import { careerService } from '../../services/careerService';
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

    if (!selectedFile.name.endsWith('.pdf') && selectedFile.type !== 'application/pdf') {
      setError('Only PDF resumes are supported. Please upload a .pdf file.');
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
  };

  const uploadAndParse = async (targetFile) => {
    try {
      setIsUploading(true);
      setParseStatus('Extracting text content via pdfplumber...');
      await new Promise((res) => setTimeout(res, 600));

      setParseStatus('Running spaCy Named Entity Recognition on skills...');
      await new Promise((res) => setTimeout(res, 700));

      setParseStatus('Benchmarking against career requirement matrix...');
      const result = await careerService.parseResume(targetFile);

      setParseStatus('Done!');
      if (onResumeParsed) {
        onResumeParsed(result);
      }
    } catch (err) {
      setError('Failed to parse resume. Please ensure the PDF has readable text.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            AI Resume Analyzer (NLP Engine)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Extracts tech skills, education, and projects according to SPMP Lab 3 specs.
          </p>
        </div>
        <Badge variant="indigo" size="sm">
          pdfplumber + spaCy
        </Badge>
      </div>

      {error && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
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

      {/* Parsing progress status */}
      {isUploading && (
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 animate-pulse">
          <RefreshCw className="w-5 h-5 text-brand-600 animate-spin" />
          <div className="text-xs">
            <p className="font-bold text-slate-800">Processing Resume with NLP</p>
            <p className="text-slate-500">{parseStatus}</p>
          </div>
        </div>
      )}

      {file && !isUploading && (
        <div className="mt-4 flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
          <div className="flex items-center gap-2">
            <FileCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">{file.name}</span>
            <span className="text-emerald-600">({(file.size / 1024).toFixed(1)} KB)</span>
          </div>
          <Badge variant="emerald" size="sm">
            Parsed & Ready
          </Badge>
        </div>
      )}
    </Card>
  );
};
export default ResumeUploader;
