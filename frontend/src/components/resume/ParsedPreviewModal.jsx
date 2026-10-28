import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  BookOpen,
  FolderGit2,
  Layers,
  ArrowRight
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="AI Resume Analysis Summary"
      subtitle={`Parsed from ${parsedData.fileName} • NLP Confidence: ${info.nlpMatchConfidence}%`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-6">
        {/* Candidate & Education banner */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900">{info.fullName}</span>
            <Badge variant="indigo" size="sm">
              {info.email}
            </Badge>
          </div>
          <p className="text-slate-600 font-medium">{info.education}</p>
          <p className="text-slate-500 italic">"{info.summary}"</p>
        </div>

        {/* Extracted Skills Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-brand-600" />
              Extracted Skills ({info.extractedSkills.length})
            </h4>
            <span className="text-[11px] text-emerald-600 font-semibold">
              Ready to sync into your profile
            </span>
          </div>

          <div className="flex flex-wrap gap-2 p-3 rounded-xl bg-slate-50/60 border border-slate-200">
            {info.extractedSkills.map((skill, index) => (
              <Badge key={index} variant="emerald" size="md">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Projects Detected */}
        {info.projects && info.projects.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <FolderGit2 className="w-4 h-4 text-brand-600" />
              Detected Technical Projects ({info.projects.length})
            </h4>

            <div className="space-y-2">
              {info.projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-200 bg-white text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{proj.title}</span>
                    <span className="text-[11px] text-brand-600 font-mono">
                      {proj.tech}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1">{proj.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button
            variant="primary"
            className="gap-2 shadow-sm"
            onClick={() => {
              onSyncSkills(info.extractedSkills);
              onClose();
            }}
          >
            <Sparkles className="w-4 h-4" /> Sync Skills to My Profile
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default ParsedPreviewModal;
