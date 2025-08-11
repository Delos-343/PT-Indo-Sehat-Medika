'use client';

import React, { useCallback, useState } from 'react';
import { ContactBtn, ContactInput, ContactTxtArea } from '../../atoms';

const SUBJECTS = ['General Inquiry', 'Customer Service', 'Partnership', 'Branding'];

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  countryCode: string;
};

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+62',
    subject: SUBJECTS[0],
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const onChange = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [String(key)]: '' }));
  }, []);

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Please write a message';
    return e;
  }, [form]);

  const onSubmit = useCallback(
    async (ev?: React.FormEvent) => {
      ev?.preventDefault();
      setSuccess(null);
      const e = validate();
      if (Object.keys(e).length) {
        setErrors(e);
        return;
      }
      setLoading(true);
      try {
        // TODO: replace with actual submit
        await new Promise((r) => setTimeout(r, 800));
        setSuccess('Message sent. We will get back to you shortly.');
        setForm({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          countryCode: '+62',
          subject: SUBJECTS[0],
          message: '',
        });
      } finally {
        setLoading(false);
      }
    },
    [validate]
  );

  // accessible custom radio visual (reusable inline)
  const RadioOption: React.FC<{ label: string; checked: boolean; onChange: () => void }> = ({ label, checked, onChange }) => (
    <>
      <label className="inline-flex items-center gap-3 cursor-pointer select-none">
        <input
          type="radio"
          name="subject"
          value={label}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <span
          aria-hidden
          className={`w-7 h-7 rounded-full flex items-center justify-center transition ${
            checked ? 'bg-white/90' : 'bg-white/10'
          }`}
        >
          <span className={`${checked ? 'w-3 h-3 rounded-full bg-[#0F4A89]' : 'w-0 h-0'}`} />
        </span>
        <span className="text-slate-100 text-sm">{label}</span>
      </label>
    </>
  );

  return (
    <>
      <form onSubmit={onSubmit} className="w-full text-slate-100">
        {/* Use single column on mobile; two columns on md for inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <ContactInput
            id="firstName"
            label="* First Name"
            value={form.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
          />
          <ContactInput
            id="lastName"
            label="* Last Name"
            value={form.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
          />
          <ContactInput
            id="email"
            label="* Email"
            value={form.email}
            onChange={(e) => onChange('email', e.target.value)}
          />
          <div>
            <label htmlFor="phone" className="block text-sm text-slate-200 mb-2"> Phone Number </label>
            <div className="flex items-center gap-3">
              <select
                aria-label="Country Code"
                value={form.countryCode}
                onChange={(e) => onChange('countryCode', e.target.value)}
                className="bg-transparent border-b border-white/20 py-2 pr-4 outline-none text-slate-100"
              >
                <option value="+62">+62</option>
                <option value="+1">+1</option>
                <option value="+60">+60</option>
                <option value="+44">+44</option>
              </select>
              <input
                id="phone"
                type="tel"
                className="w-full bg-transparent border-b border-white/20 py-2 outline-none text-slate-100 placeholder:text-white/40"
                placeholder="Phone No."
                value={form.phone}
                onChange={(e) => onChange('phone', e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Subjects */}
        <fieldset className="mt-8 border-0">
          <legend className="text-sm text-slate-200 mb-3">* Select Subject</legend>
          <div role="radiogroup" aria-label="Subject" className="flex flex-wrap gap-6">
            {SUBJECTS.map((s) => (
              <RadioOption key={s} label={s} checked={form.subject === s} onChange={() => onChange('subject', s)} />
            ))}
          </div>
        </fieldset>
        {/* Message textarea */}
        <div className="mt-8">
          <ContactTxtArea
            id="message"
            label="* Message"
            placeholder="Write your message..."
            value={form.message}
            onChange={(e) => onChange('message', e.target.value)}
          />
        </div>
        {/* Errors / success */}
        <div className="mt-4">
          {Object.values(errors).map((msg, idx) => (msg ? <div key={idx} className="text-sm text-rose-400 mb-1">{msg}</div> : null))}
          {success && <div className="text-sm text-emerald-300">{success}</div>}
        </div>
        {/* Submit button */}
        <div className="mt-8 flex justify-center sm:justify-end">
          <ContactBtn type="submit" disabled={loading} className="px-6 py-3">
            {loading ? 'Sending…' : 'Send Message'}
          </ContactBtn>
        </div>
      </form>
    </>
  );
};

export default ContactForm;
