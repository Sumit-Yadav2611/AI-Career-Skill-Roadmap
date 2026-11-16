import React, { useState, useEffect, useRef } from 'react';
import {
  UploadCloud,
  FileCheck,
  AlertCircle,
  Sparkles,
  RefreshCw,
  FileText,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { resumeService } from '../../services/resumeService';
import { aiService, HIGH_DEMAND_MESSAGE } from '../../services/aiService';
import Button from '../common/Button';
import Card from '../common/Card';
import Badge from '../common/Badge';

export const ResumeUploader = ({ onResumeParsed }) => {
  const [existingResume, setExistingResume] = useState(null);
  const [loadingResume, setLoadingResume] = useState(true);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStatus, setProcessStatus] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const inputRef = useRef(null);

  // Fetch existing resumes from backend on mount
  useEffect(() => {
    let cancelled = false;
    const fetchBackendResume = async () => {
      try {
        setLoadingResume(true);
        const resumes = await resumeService.getMyResumes();
        if (!cancelled && resumes && resumes.length > 0) {
          // Take the latest resume
          setExistingResume(resumes[0]);
        }
      } catch (err) {
        console.warn('Notice loading resume from backend:', err.message);
      } finally {
        if (!cancelled) setLoadingResume(false);
      }
    };

    fetchBackendResume();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processSelectedFile(e.target.files[0]);
    }
    e.target.value = '';
  };

  const processSelectedFile = async (file) => {
    setError('');
    setSuccessMsg('');

    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setError('Only PDF resumes are supported. Please select a valid PDF file.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds the 5MB limit.');
      return;
    }

    setSelectedFile(file);

    try {
      setIsProcessing(true);
      const isUpdate = Boolean(existingResume);

      setProcessStatus(
        isUpdate
          ? 'Updating your resume in backend database...'
          : 'Uploading resume to backend database...'
      );

      // 1. Call backend API (upload or update)
      let backendRecord;
      if (isUpdate) {
        backendRecord = await resumeService.updateLatestResume(file);
      } else {
        backendRecord = await resumeService.uploadResume(file);
      }

      setExistingResume(backendRecord);
      setSuccessMsg(
        isUpdate
          ? `Resume "${file.name}" updated successfully in backend!`
          : `Resume "${file.name}" uploaded successfully to backend!`
      );

      // 2. Trigger AI Review / Parsing
      setProcessStatus('Analyzing resume with AI service for skills & ATS scoring...');
      try {
        const aiAnalysis = await aiService.reviewResumeUpload(file);
        if (onResumeParsed) {
          onResumeParsed(aiAnalysis);
        }
      } catch (aiErr) {
        console.warn('AI analysis notice:', aiErr.message);
        setError(HIGH_DEMAND_MESSAGE);
      }
    } catch (err) {
      console.error('Resume process error:', err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        'Failed to process resume. Please verify backend connection and try again.'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManualTrigger = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <Card className="p-6 bg-[#12131A] border border-[#222432] shadow-xl rounded-2xl relative overflow-hidden">
      {/* Ambient Crimson Glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4 gap-3 relative z-10">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-red-950/70 border border-red-800/40 text-red-500 shadow-[0_0_12px_rgba(239,68,68,0.25)]">
              <Sparkles className="w-4 h-4" />
            </span>
            Resume Management & AI Analyzer
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Backend integrated resume storage and instant AI skill extraction.
          </p>
        </div>

        <Badge
          variant={existingResume ? 'emerald' : 'rose'}
          size="sm"
          className={existingResume ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/50' : 'bg-red-950/60 text-red-400 border-red-800/50'}
        >
          {loadingResume ? 'Checking...' : existingResume ? 'Resume Connected' : 'No Resume'}
        </Badge>
      </div>

      {/* Notifications */}
      {error && (
        <div className="mb-4 p-3.5 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {successMsg && (
        <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2.5">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Existing Resume Display if fetched from backend */}
      {existingResume && (
        <div className="mb-5 p-4 rounded-xl bg-[#161722] border border-[#2D2E3E] text-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-red-950/80 border border-red-800/40 flex items-center justify-center text-red-500 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-white truncate max-w-[240px] sm:max-w-md">
                  {existingResume.originalFileName || 'Resume.pdf'}
                </p>
                <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                  {existingResume.fileSize && (
                    <span>{(existingResume.fileSize / 1024).toFixed(1)} KB</span>
                  )}
                  {existingResume.uploadedAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {new Date(existingResume.uploadedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <Badge variant="emerald" size="sm" className="bg-emerald-950/60 text-emerald-400 border-emerald-800/50">
              Active in DB
            </Badge>
          </div>
        </div>
      )}

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={handleManualTrigger}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleManualTrigger();
          }
        }}
        role="button"
        tabIndex={0}
        aria-label="Upload or update resume"
        className={`border-2 border-dashed rounded-2xl p-7 text-center cursor-pointer transition-all duration-200 ${
          dragActive
            ? 'border-red-500 bg-red-950/20 scale-[1.01]'
            : 'border-[#262838] hover:border-red-600/60 hover:bg-[#161722]/60'
        }`}
      >
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-red-950/70 border border-red-800/40 text-red-500 flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <UploadCloud className="w-7 h-7" />
          </div>

          <p className="text-sm font-bold text-white">
            {selectedFile
              ? selectedFile.name
              : existingResume
              ? 'Click to select a new PDF or drag & drop to update'
              : 'Click to select or drag & drop your resume PDF'}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Standard PDF format (Max 5MB)
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      {isProcessing && (
        <div className="mt-4 p-4 rounded-xl bg-[#161722] border border-[#2B2C3C] flex items-center gap-3">
          <RefreshCw className="w-5 h-5 text-red-500 animate-spin" />
          <div className="text-xs">
            <p className="font-bold text-white">Processing Resume</p>
            <p className="text-slate-400">{processStatus}</p>
          </div>
        </div>
      )}

      {/* Action Buttons: Upload Button changes to Update Button when resume is fetched */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        {existingResume ? (
          /* When resume IS fetched from backend: button is UPDATE */
          <Button
            size="md"
            onClick={handleManualTrigger}
            disabled={isProcessing}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-full px-6 py-2.5 shadow-lg shadow-red-600/30 gap-2 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Update Resume
          </Button>
        ) : (
          /* When NO resume is there: button is UPLOAD */
          <Button
            size="md"
            onClick={handleManualTrigger}
            disabled={isProcessing}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-full px-6 py-2.5 shadow-lg shadow-red-600/30 gap-2 transition-all"
          >
            <UploadCloud className="w-4 h-4" />
            Upload Resume
          </Button>
        )}

        {existingResume && (
          <Button
            size="md"
            variant="secondary"
            onClick={handleManualTrigger}
            disabled={isProcessing}
            className="bg-[#181924] text-slate-200 border border-[#2D2E40] hover:bg-[#202230] hover:text-white rounded-full px-5 py-2.5 text-xs font-semibold gap-2"
          >
            Select Different PDF
          </Button>
        )}
      </div>
    </Card>
  );
};

export default ResumeUploader;
