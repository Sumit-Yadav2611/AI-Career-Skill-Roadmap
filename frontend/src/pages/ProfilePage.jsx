import React, { useState } from 'react';
import {
  GraduationCap,
  Plus,
  Trash2,
  Save,
  CheckCircle2,
  Layers,
  Wrench,
  Palette,
  Terminal,
  Database,
  Cpu,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import FormInput from '../components/common/FormInput';
import ResumeUploader from '../components/resume/ResumeUploader';
import ParsedPreviewModal from '../components/resume/ParsedPreviewModal';

export const ProfilePage = () => {
  const { user, updateUserProfile, addSkill, removeSkill, syncResumeSkills } = useAuth();

  const [academicData, setAcademicData] = useState({
    name: user?.name || user?.fullName || '',
    email: user?.email || '',
    college: user?.college || '',
    degree: user?.degree || 'B.Tech',
    branch: user?.branch || 'Computer Science & Engineering',
    semester: user?.semester || '5th Semester',
    cgpa: user?.cgpa || '8.5',
  });

  const [savingAcademic, setSavingAcademic] = useState(false);
  const [savingSkill, setSavingSkill] = useState(false);
  const [academicSuccess, setAcademicSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillProficiency, setNewSkillProficiency] = useState('Intermediate');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend');

  const [parsedData, setParsedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [syncSuccessMsg, setSyncSuccessMsg] = useState('');

  const handleAcademicChange = (e) => {
    setAcademicData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSaveAcademic = async (e) => {
    e.preventDefault();
    setProfileError('');
    setAcademicSuccess(false);
    setSavingAcademic(true);
    try {
      await updateUserProfile(academicData);
      setAcademicSuccess(true);
      setTimeout(() => setAcademicSuccess(false), 3000);
    } catch (err) {
      setProfileError(err?.message || 'Unable to save profile details.');
    } finally {
      setSavingAcademic(false);
    }
  };

  const handleAddSkill = async (e) => {
    e.preventDefault();
    setProfileError('');
    if (!newSkillName.trim()) return;

    const alreadyExists = (user?.userSkills || []).some(
      (s) => s.name?.trim().toLowerCase() === newSkillName.trim().toLowerCase()
    );
    if (alreadyExists) {
      setProfileError('This skill is already listed in your inventory.');
      return;
    }

    setSavingSkill(true);
    try {
      await addSkill({
        name: newSkillName.trim(),
        proficiency: newSkillProficiency,
        category: newSkillCategory,
      });
      setNewSkillName('');
    } catch (err) {
      setProfileError(err?.message || 'Unable to add skill.');
    } finally {
      setSavingSkill(false);
    }
  };

  const handleRemoveSkill = async (skillId) => {
    setProfileError('');
    try {
      await removeSkill(skillId);
    } catch (err) {
      setProfileError(err?.message || 'Unable to remove skill.');
    }
  };

  const handleResumeParsed = (result) => {
    setParsedData(result);
    setIsModalOpen(true);
  };

  const handleSyncSkills = async (extractedSkills) => {
    setProfileError('');
    try {
      await syncResumeSkills(extractedSkills);
      setSyncSuccessMsg(`Synced ${extractedSkills.length} skills from resume into profile!`);
      setTimeout(() => setSyncSuccessMsg(''), 5000);
    } catch (err) {
      setProfileError(err?.message || 'Unable to sync skills.');
    }
  };

  // Group skills by category for showcase matching user image
  const userSkillsList = user?.userSkills || [
    { id: '1', name: 'Java', proficiency: 'Advanced', category: 'Language' },
    { id: '2', name: 'JavaScript (ES6+)', proficiency: 'Advanced', category: 'Language' },
    { id: '3', name: 'React.js', proficiency: 'Intermediate', category: 'Frontend' },
    { id: '4', name: 'Next.js', proficiency: 'Intermediate', category: 'Frontend' },
    { id: '5', name: 'HTML5', proficiency: 'Advanced', category: 'Frontend' },
    { id: '6', name: 'CSS3', proficiency: 'Advanced', category: 'Frontend' },
    { id: '7', name: 'Tailwind CSS', proficiency: 'Intermediate', category: 'Frontend' },
    { id: '8', name: 'Node.js', proficiency: 'Intermediate', category: 'Backend' },
    { id: '9', name: 'Express.js', proficiency: 'Intermediate', category: 'Backend' },
    { id: '10', name: 'REST APIs', proficiency: 'Intermediate', category: 'Backend' },
    { id: '11', name: 'Figma', proficiency: 'Intermediate', category: 'UI/UX Design' },
    { id: '12', name: 'Wireframing', proficiency: 'Intermediate', category: 'UI/UX Design' },
    { id: '13', name: 'Git', proficiency: 'Intermediate', category: 'Tools & Platforms' },
    { id: '14', name: 'GitHub', proficiency: 'Intermediate', category: 'Tools & Platforms' },
    { id: '15', name: 'Postman', proficiency: 'Intermediate', category: 'Tools & Platforms' },
    { id: '16', name: 'VS Code', proficiency: 'Advanced', category: 'Tools & Platforms' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-7">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1E202B] pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1 rounded-md bg-red-950/80 border border-red-800/60 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]">
              <GraduationCap className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-red-500">
              Candidate Profile & Resume
            </span>
            <Badge variant="rose" size="sm">Active Sync</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Academic Profile & Skills Matrix
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your verified credentials, upload/update your resume, and refine your technical inventory.
          </p>
        </div>
      </div>

      {profileError && (
        <div className="p-4 rounded-xl bg-red-950/50 border border-red-800/60 text-red-300 text-xs">
          {profileError}
        </div>
      )}

      {syncSuccessMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{syncSuccessMsg}</span>
        </div>
      )}

      {/* 1. Resume Section with Upload / Update button logic */}
      <section>
        <ResumeUploader onResumeParsed={handleResumeParsed} />
      </section>

      {/* 2. Visual Skill Domains (Matching Reference Screenshot Design) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-red-500" />
            <h2 className="text-base font-bold text-white">
              Skill Domains & Tooling
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            {userSkillsList.length} Technical Skills
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* UI/UX Design Card (From Screenshot) */}
          <Card className="p-5 bg-[#12131A] border border-[#222432] hover:border-red-600/40 transition-all rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-950/70 border border-red-800/50 text-red-500 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.25)]">
                  <Palette className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">UI/UX Design</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">06</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Figma', 'Wireframing', 'Prototyping', 'User Research', 'Visual Design', 'Info Architecture'].map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#181924] text-slate-200 border border-[#2B2C3C] hover:border-red-500/50 hover:text-white transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Tools & Platforms Card (From Screenshot) */}
          <Card className="p-5 bg-[#12131A] border border-[#222432] hover:border-red-600/40 transition-all rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-950/70 border border-red-800/50 text-red-500 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.25)]">
                  <Wrench className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Tools & Platforms</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">04</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Git', 'GitHub', 'Postman', 'VS Code', 'Docker', 'Linux'].map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#181924] text-slate-200 border border-[#2B2C3C] hover:border-red-500/50 hover:text-white transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>

          {/* Frontend & Languages Card (From Screenshot) */}
          <Card className="p-5 bg-[#12131A] border border-[#222432] hover:border-red-600/40 transition-all rounded-2xl relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-red-950/70 border border-red-800/50 text-red-500 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.25)]">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white">Frontend Frameworks</h3>
              </div>
              <span className="text-[10px] text-slate-500 font-mono">05</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind CSS', 'TypeScript'].map((skill) => (
                <span
                  key={skill}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#181924] text-slate-200 border border-[#2B2C3C] hover:border-red-500/50 hover:text-white transition-all cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* 3. Add Custom Skill & Academic Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Academic Form */}
        <Card className="p-6 bg-[#12131A] border border-[#222432] rounded-2xl">
          <div className="flex items-center justify-between mb-4 border-b border-[#1E202B] pb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-bold text-white">Academic Credentials</h3>
            </div>
            {academicSuccess && (
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
              </span>
            )}
          </div>

          <form onSubmit={handleSaveAcademic} className="space-y-4">
            <FormInput
              id="name"
              name="name"
              label="Full Name"
              value={academicData.name}
              onChange={handleAcademicChange}
            />

            <FormInput
              id="college"
              name="college"
              label="University / Institution"
              placeholder="e.g. National Institute of Technology"
              value={academicData.college}
              onChange={handleAcademicChange}
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Degree
                </label>
                <input
                  name="degree"
                  value={academicData.degree}
                  onChange={handleAcademicChange}
                  className="w-full rounded-xl border border-[#252738] bg-[#12131A] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  CGPA / Grade
                </label>
                <input
                  name="cgpa"
                  value={academicData.cgpa}
                  onChange={handleAcademicChange}
                  className="w-full rounded-xl border border-[#252738] bg-[#12131A] px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                />
              </div>
            </div>

            <Button
              type="submit"
              size="md"
              className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-full shadow-lg shadow-red-600/30 gap-2"
              isLoading={savingAcademic}
            >
              <Save className="w-4 h-4" /> Save Academic Info
            </Button>
          </form>
        </Card>

        {/* Right: Skills Inventory List */}
        <Card className="p-6 bg-[#12131A] border border-[#222432] rounded-2xl">
          <div className="flex items-center justify-between mb-4 border-b border-[#1E202B] pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-red-500" />
              <h3 className="text-sm font-bold text-white">
                Skills Inventory ({userSkillsList.length})
              </h3>
            </div>
            <Badge variant="rose" size="sm">Editable</Badge>
          </div>

          <form onSubmit={handleAddSkill} className="mb-4 p-3.5 rounded-xl bg-[#161722] border border-[#252738] space-y-2.5">
            <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
              Add Verified Technical Skill
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Skill name (e.g. Docker, Redis)"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                required
                className="w-full rounded-xl border border-[#2B2C3C] bg-[#12131A] px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
              />
              <select
                value={newSkillProficiency}
                onChange={(e) => setNewSkillProficiency(e.target.value)}
                className="rounded-xl border border-[#2B2C3C] bg-[#12131A] px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <Button type="submit" size="sm" className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white font-bold rounded-full gap-1.5" isLoading={savingSkill}>
              <Plus className="w-3.5 h-3.5" /> Add Skill
            </Button>
          </form>

          <div className="flex flex-wrap gap-2 max-h-72 overflow-y-auto p-1">
            {userSkillsList.map((skill) => (
              <div
                key={skill.id || skill.name}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#2A2B3C] bg-[#181924] text-xs hover:border-red-500/40 transition-colors"
              >
                <span className="font-semibold text-slate-200">{skill.name}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-bold bg-red-950/70 text-red-400 border border-red-800/40">
                  {skill.proficiency || 'Intermediate'}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="text-slate-500 hover:text-red-400 p-0.5 transition-colors"
                  title="Remove skill"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>

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
