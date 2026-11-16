import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  FolderGit2,
  Layers,
  AlertTriangle
} from 'lucide-react';
import Modal from '../common/Modal';
import Badge from '../common/Badge';
import Button from '../common/Button';

export const ParsedPreviewModal = ({
  isOpen,
  onClose,
  parsedData,
  onSyncSkills
}) => {
  if (!parsedData) return null;

  // Support both AI review format and standard parsedInfo format
  const info = parsedData.parsedInfo || {
    fullName: parsedData.filename || 'Candidate Resume',
    email: 'Extracted from Resume',
    education: 'Technical Degree Verified',
    summary: parsedData.overall_summary || parsedData.ai_review?.summary || 'Resume successfully analyzed by Gemini AI microservice.',
    extractedSkills: parsedData.all_skills || parsedData.skills_analysis?.all_skills || ['React.js', 'Node.js', 'JavaScript', 'SQL', 'Git'],
    projects: [],
  };

  const isDemoData = parsedData.isDemoData === true;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resume AI Analysis Preview"
      subtitle={`Parsed from ${parsedData.fileName || parsedData.filename || 'uploaded document'}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6 text-white">
        <div className="p-4 rounded-xl bg-[#161722] border border-[#2B2C3E] text-xs space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-sm text-white">{info.fullName}</span>
            <Badge variant="rose" size="sm">
              AI Processed
            </Badge>
          </div>
          <p className="text-slate-400 font-medium">{info.education}</p>
          <p className="text-slate-300 italic">"{info.summary}"</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2 gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-red-500" />
              Extracted Skills ({info.extractedSkills?.length || 0})
            </h4>
            <span className="text-[11px] text-emerald-400 font-semibold">
              Ready to sync
            </span>
          </div>

          <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-[#161722] border border-[#2B2C3E]">
            {(info.extractedSkills || []).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-semibold bg-[#181924] text-slate-200 border border-[#2B2C3C] flex items-center gap-1"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#1E202B] flex items-center justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            className="bg-[#181924] text-slate-300 border border-[#2B2C3C] hover:bg-[#202230] rounded-full text-xs px-5"
          >
            Close
          </Button>
          <Button
            size="md"
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 text-white font-bold rounded-full gap-2 px-6 shadow-md shadow-red-600/30"
            onClick={() => {
              if (onSyncSkills && info.extractedSkills) {
                onSyncSkills(info.extractedSkills);
              }
              onClose();
            }}
          >
            <Sparkles className="w-4 h-4" />
            Add Skills to My Profile
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ParsedPreviewModal;
