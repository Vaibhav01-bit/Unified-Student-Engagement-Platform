import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, User, BookOpen, Globe, DollarSign, ChevronRight, ChevronLeft, Check } from 'lucide-react';
import storage from '../utils/storage';
import { PageTransition } from '../components/ui/PageTransition';
import { ButtonAnim } from '../components/ui/ButtonAnim';

const countries = ['Canada', 'UK', 'Australia', 'Germany', 'USA', 'Ireland', 'New Zealand', 'Netherlands'];
const courses = ['Computer Science', 'MBA', 'Data Science', 'Engineering', 'Medicine', 'Law', 'Arts & Humanities', 'Business'];
const qualifications = ['Bachelor\'s Degree', 'Master\'s Degree', 'Diploma', '12th Grade', 'PhD'];

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Study Goals', icon: BookOpen },
  { id: 3, title: 'Ready to go!', icon: Check },
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    qualification: '',
    targetCourse: '',
    preferredCountries: [],
    budget: '',
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (step === 1) {
      if (!form.name.trim()) e.name = 'Name is required';
      if (!form.qualification) e.qualification = 'Please select your qualification';
    }
    if (step === 2) {
      if (!form.targetCourse) e.targetCourse = 'Please select a target course';
      if (form.preferredCountries.length === 0) e.preferredCountries = 'Select at least one country';
      if (!form.budget) e.budget = 'Please select a budget range';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      if (step < 3) setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const toggleCountry = (country) => {
    setForm((f) => ({
      ...f,
      preferredCountries: f.preferredCountries.includes(country)
        ? f.preferredCountries.filter((c) => c !== country)
        : [...f.preferredCountries, country],
    }));
  };

  const handleSubmit = () => {
    storage.set('edupath_profile', {
      ...form,
      createdAt: new Date().toISOString(),
    });
    storage.set('edupath_checklist_completed', []);
    navigate('/dashboard');
  };

  return (
    <PageTransition transitionKey="onboarding">
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal/10 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-lg relative z-10">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-teal mb-4 shadow-lg shadow-primary/30">
            <GraduationCap size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-white">EduPath</h1>
          <p className="text-muted mt-1">Your Study Abroad Journey Starts Here</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {steps.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  step === s.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/40'
                    : step > s.id
                    ? 'bg-teal/20 text-teal-400 border border-teal/30'
                    : 'bg-surface-card text-muted border border-surface-border'
                }`}
              >
                {step > s.id ? <Check size={14} /> : <s.icon size={14} />}
                <span className="hidden sm:block">{s.title}</span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-6 h-0.5 mx-1 transition-colors duration-300 ${step > s.id ? 'bg-teal/40' : 'bg-surface-border'}`} />
              )}
            </div>
          ))}
        </div>

        {/* Form Card */}
        <div className="card animate-slide-up">
          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Tell us about yourself</h2>
                <p className="text-muted text-sm">We'll personalize your experience</p>
              </div>

              <div>
                <label className="label">Full Name *</label>
                <input
                  id="onboarding-name"
                  type="text"
                  className="input-field"
                  placeholder="e.g. Priya Sharma"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="label">Current Qualification *</label>
                <select
                  id="onboarding-qualification"
                  className="input-field"
                  value={form.qualification}
                  onChange={(e) => setForm({ ...form, qualification: e.target.value })}
                >
                  <option value="">Select qualification</option>
                  {qualifications.map((q) => (
                    <option key={q} value={q}>{q}</option>
                  ))}
                </select>
                {errors.qualification && <p className="text-red-400 text-xs mt-1">{errors.qualification}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Study Goals */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">Your Study Goals</h2>
                <p className="text-muted text-sm">Help us find the best universities for you</p>
              </div>

              <div>
                <label className="label">Target Course *</label>
                <select
                  id="onboarding-course"
                  className="input-field"
                  value={form.targetCourse}
                  onChange={(e) => setForm({ ...form, targetCourse: e.target.value })}
                >
                  <option value="">Select a course</option>
                  {courses.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.targetCourse && <p className="text-red-400 text-xs mt-1">{errors.targetCourse}</p>}
              </div>

              <div>
                <label className="label">Preferred Countries * <span className="text-muted font-normal">(select all that apply)</span></label>
                <div className="grid grid-cols-2 gap-2">
                  {countries.map((country) => {
                    const selected = form.preferredCountries.includes(country);
                    return (
                      <button
                        key={country}
                        type="button"
                        id={`country-${country.toLowerCase().replace(' ', '-')}`}
                        onClick={() => toggleCountry(country)}
                        className={`px-3 py-2 rounded-xl text-sm font-medium text-left transition-all duration-200 border ${
                          selected
                            ? 'bg-primary/20 border-primary/50 text-white'
                            : 'bg-surface border-surface-border text-muted hover:border-primary/30 hover:text-white'
                        }`}
                      >
                        {selected ? '✓ ' : ''}{country}
                      </button>
                    );
                  })}
                </div>
                {errors.preferredCountries && <p className="text-red-400 text-xs mt-1">{errors.preferredCountries}</p>}
              </div>

              <div>
                <label className="label">Annual Budget (USD) *</label>
                <select
                  id="onboarding-budget"
                  className="input-field"
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                >
                  <option value="">Select budget range</option>
                  <option value="under-15k">Under $15,000</option>
                  <option value="15k-30k">$15,000 – $30,000</option>
                  <option value="30k-50k">$30,000 – $50,000</option>
                  <option value="over-50k">Over $50,000</option>
                </select>
                {errors.budget && <p className="text-red-400 text-xs mt-1">{errors.budget}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Summary */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white mb-1">You're all set! 🎉</h2>
                <p className="text-muted text-sm">Here's a summary of your profile</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-surface rounded-xl">
                  <span className="text-muted text-sm flex items-center gap-2"><User size={14} /> Name</span>
                  <span className="text-white font-medium">{form.name}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface rounded-xl">
                  <span className="text-muted text-sm flex items-center gap-2"><BookOpen size={14} /> Qualification</span>
                  <span className="text-white font-medium">{form.qualification}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface rounded-xl">
                  <span className="text-muted text-sm flex items-center gap-2"><GraduationCap size={14} /> Course</span>
                  <span className="text-white font-medium">{form.targetCourse}</span>
                </div>
                <div className="flex items-start justify-between p-3 bg-surface rounded-xl">
                  <span className="text-muted text-sm flex items-center gap-2 flex-shrink-0"><Globe size={14} /> Countries</span>
                  <div className="flex flex-wrap gap-1 justify-end">
                    {form.preferredCountries.map((c) => (
                      <span key={c} className="badge bg-primary/20 text-blue-300 border border-primary/30">{c}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 bg-surface rounded-xl">
                  <span className="text-muted text-sm flex items-center gap-2"><DollarSign size={14} /> Budget</span>
                  <span className="text-white font-medium">{form.budget}</span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <ButtonAnim variant="secondary" onClick={handleBack} className="flex items-center gap-2">
                <ChevronLeft size={18} />
                Back
              </ButtonAnim>
            )}
            {step < 3 ? (
              <ButtonAnim
                id="onboarding-next"
                variant="primary"
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2"
              >
                Next Step
                <ChevronRight size={18} />
              </ButtonAnim>
            ) : (
              <ButtonAnim
                id="onboarding-submit"
                variant="primary"
                onClick={handleSubmit}
                className="flex-1 flex items-center justify-center gap-2"
              >
                Launch My Dashboard
                <GraduationCap size={18} />
              </ButtonAnim>
            )}
          </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}
