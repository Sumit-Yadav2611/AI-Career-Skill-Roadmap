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
  if (!parsedData || !parsedData.parsedInfo) return null;

  const info = parsedData.parsedInfo;
  const isDemoData = parsedData.isDemoData === true;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Resume Analysis Preview"
      subtitle={
        isDemoData
          ? 'Sample preview only — the uploaded PDF was not parsed.'
          : `Parsed from ${parsedData.fileName}`
      }
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {isDemoData && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>
              These details belong to sample data, not your uploaded resume. Skill syncing is disabled so another student's sample information cannot be added to your profile.
            </span>
          </div>
        )}

        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-sm text-slate-900">{info.fullName}</span>
            <Badge variant={isDemoData ? 'amber' : 'indigo'} size="sm">
              {isDemoData ? 'Sample data' : info.email}
            </Badge>
          </div>
          {!isDemoData && <p className="text-slate-500">{info.email}</p>}
          <p className="text-slate-600 font-medium">{info.education}</p>
          <p className="text-slate-500 italic">"{info.summary}"</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2 gap-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-brand-600" />
              {isDemoData ? 'Sample skills' : 'Extracted skills'} ({info.extractedSkills.length})
            </h4>
            {isDemoData ? (
              <Badge variant="amber" size="sm">Not parsed</Badge>
            ) : (
              <span className="text-[11px] text-emerald-600 font-semibold">Review before adding</span>
            )}
          </div>

          <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-slate-50/60 border border-slate-200">
            {info.extractedSkills.map((skill, index) => (
              <Badge key={index} variant={isDemoData ? 'slate' : 'emerald'} size="md">
                {isDemoData ? null : <CheckCircle2 className="w-3.5 h-3.5 mr-1" />}
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {info.projects && info.projects.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-brand-600" />
              {isDemoData ? 'Sample projects' : 'Detected technical projects'} ({info.projects.length})
            </h4>

            <div className="space-y-2">
              {info.projects.map((project, index) => (
                <div key={index} className="p-3 rounded-xl border border-slate-200 bg-white text-xs">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-bold text-slate-900">{project.title}</span>
                    <span className="text-[11px] text-brand-600 font-mono">{project.tech}</span>
                  </div>
                  <p className="text-slate-500 mt-1">{project.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button
            variant="primary"
            className="gap-2 shadow-sm"
            disabled={isDemoData}
            onClick={() => {
              if (!isDemoData) {
                onSyncSkills(info.extractedSkills);
                onClose();
              }
            }}
          >
            <Sparkles className="w-4 h-4" />
            {isDemoData ? 'Sync disabled in demo' : 'Add skills to my profile'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ParsedPreviewModal;
