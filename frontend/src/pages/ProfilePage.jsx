import React, { useState } from 'react';
import {
  User,
  GraduationCap,
  Sparkles,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  FileText,
  Layers,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import FormInput from '../components/common/FormInput';
import ResumeUploader from '../components/resume/ResumeUploader';
import ParsedPreviewModal from '../components/resume/ParsedPreviewModal';

export const ProfilePage = () => {
  const { user, updateUserProfile, addSkill, removeSkill, syncResumeSkills } = useAuth();

  // Academic Form state
  const [academicData, setAcademicData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    college: user?.college || '',
    degree: user?.degree || 'B.Tech in Computer Science',
    branch: user?.branch || 'Computer Science',
    semester: user?.semester || '6th Semester',
    cgpa: user?.cgpa || '8.45',
  });

  const [savingAcademic, setSavingAcademic] = useState(false);
  const [academicSuccess, setAcademicSuccess] = useState(false);

  // New Skill state
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState('Intermediate');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend');

  // Resume parsed state
  const [parsedData, setParsedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState('');

  const handleAcademicChange = (e) => {
    setAcademicData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSaveAcademic = async (e) => {
    e.preventDefault();
    setSavingAcademic(true);
    try {
      await updateUserProfile(academicData);
      setAcademicSuccess(true);
      setTimeout(() => setAcademicSuccess(false), 3000);
    } finally {
      setSavingAcademic(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    await addSkill({
      name: newSkillName.trim(),
      proficiency: newSkillProficiency,
      category: newSkillCategory
    });

    setNewSkillName('');
  };

  const handleResumeParsed = (result) => {
    setParsedData(result);
    setIsModalOpen(true);
  };

  const handleSyncSkills = async (extractedSkills) => {
    await syncResumeSkills(extractedSkills);
    setSyncSuccessMsg(`Successfully synced ${extractedSkills.length} skills from resume into your profile!`);
    setTimeout(() => setSyncSuccessMsg(''), 4000);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Student Profile & Resume Center
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your academic background, active skill inventory, and AI resume parsing.
        </p>
      </div>

      {syncSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-semibold">{syncSuccessMsg}</span>
        </div>
      )}

      {/* Resume Upload Section */}
      <ResumeUploader onResumeParsed={handleResumeParsed} />

      {/* Grid: Academic Form & Skill Tags */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Academic Form */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-brand-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Academic & Personal Information
              </h3>
            </div>
            {academicSuccess && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveAcademic} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <FormInput
                id="name"
                name="name"
                label="Full Name"
                value={academicData.name}
                onChange={handleAcademicChange}
                required
              />
              <FormInput
                id="email"
                name="email"
                label="Email Address"
                value={academicData.email}
                onChange={handleAcademicChange}
                disabled
              />
            </div>

            <FormInput
              id="college"
              name="college"
              label="College / Institute Name"
              value={academicData.college}
              onChange={handleAcademicChange}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Degree & Branch
                </label>
                <input
                  name="degree"
                  value={academicData.degree}
                  onChange={handleAcademicChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Semester
                </label>
                <input
                  name="semester"
                  value={academicData.semester}
                  onChange={handleAcademicChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  CGPA / Percentage
                </label>
                <input
                  name="cgpa"
                  type="text"
                  value={academicData.cgpa}
                  onChange={handleAcademicChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="md"
              className="w-full gap-2 mt-4"
              isLoading={savingAcademic}
            >
              <Save className="w-4 h-4" /> Save Academic Details
            </Button>
          </form>
        </Card>

        {/* Right: Skills Inventory */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Skills Inventory ({user?.userSkills?.length || 0})
              </h3>
            </div>
            <Badge variant="indigo" size="sm">
              Editable Tags
            </Badge>
          </div>

          {/* Add Skill Form */}
          <form onSubmit={handleAddSkill} className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Add New Technical Skill
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="Skill name (e.g. Docker)"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <select
                value={newSkillProficiency}
                onChange={(e) => setNewSkillProficiency(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <Button type="submit" size="sm" className="gap-1.5">
                <Plus className="w-3.5 h-3.5" /> Add Tag
              </Button>
            </div>
          </form>

          {/* Existing Skills List */}
          <div className="flex flex-wrap gap-2 max-h-80 overflow-y-auto p-1">
            {(user?.userSkills || []).map((skill) => (
              <div
                key={skill.id}
                className="group flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl border border-slate-200 bg-white text-xs hover:border-brand-300 transition-colors shadow-2xs"
              >
                <span className="font-semibold text-slate-800">{skill.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold ${
                    skill.proficiency === 'Advanced'
                      ? 'bg-purple-50 text-purple-700'
                      : skill.proficiency === 'Intermediate'
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {skill.proficiency}
                </span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="text-slate-400 hover:text-rose-500 transition-colors p-0.5"
                  title="Remove skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Resume Parsed Preview Modal */}
      <ParsedPreviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        parsedData={parsedData}
        onSyncSkills={handleSyncSkills}
      />
    </div>
  );
};
export default ProfilePage;
