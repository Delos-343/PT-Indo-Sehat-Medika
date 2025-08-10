'use client';

import React, { useCallback, useMemo, useState } from 'react';
import { ContactInput } from '../../atoms/contact/ContactInput';
import { ContactTxtArea } from '../../atoms/contact/ContactTxtArea';
import { ContactCheckbox } from '../../atoms/contact/ContactCheckbox';
import { ContactBtn } from '../../atoms/contact/ContactBtn';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: Record<string, boolean>;
  message: string;
  countryCode: string;
};

const SUBJECTS = ['General Inquiry', 'Customer Service', 'Partnership', 'Branding'];

export const ContactForm: React.FC = () => {

  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+62',
    subject: SUBJECTS.reduce((acc, s) => ({ ...acc, [s]: false }), {}),
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const onChange = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((s) => ({ ...s, [key]: value }));
    setErrors((e) => ({ ...e, [String(key)]: '' }));
  }, []);

  const toggleSubject = useCallback((subject: string) => {
    setForm((s) => ({
      ...s,
      subject: { ...s.subject, [subject]: !s.subject[subject] },
    }));
  }, []);

  const validate = useCallback(() => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = 'First name is required';
    if (!form.lastName.trim()) e.lastName = 'Last name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
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
      await new Promise((res) => setTimeout(res, 900));
      setLoading(false);
      setSuccess('Message sent. We will get back to you shortly.');
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        countryCode: '+62',
        subject: SUBJECTS.reduce((acc, s) => ({ ...acc, [s]: false }), {}),
        message: '',
      });
    },
    [validate]
  );

  return (
    <>
      <form onSubmit={onSubmit} className="w-full hidden lg:block">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <ContactInput id="firstName" label="* First Name" value={form.firstName} onChange={(e) => onChange('firstName', e.target.value)} />
          <ContactInput id="lastName" label="* Last Name" value={form.lastName} onChange={(e) => onChange('lastName', e.target.value)} />
          <ContactInput id="email" label="* Email" value={form.email} onChange={(e) => onChange('email', e.target.value)} />
          <div>
            <label className="block text-sm text-[var(--color-bg-primary)] mb-2">
              Phone Number
            </label>
            <div className="flex items-center gap-3">
              <select
                aria-label="Country Code"
                value={form.countryCode}
                onChange={(e) => onChange('countryCode', e.target.value)}
                className="bg-transparent border-b border-white/30 py-2 pr-4 outline-none text-[var(--color-bg-primary)]"
              >
                <option value="+62">
                  +62
                </option>
                <option value="+1">
                  +1
                </option>
                <option value="+60">
                  +60
                  </option>
                <option value="+44">
                  +44
                </option>
              </select>
              <input
                type="tel"
                className="w-full bg-transparent border-b border-white/30 py-2 outline-none text-white placeholder:text-white/50"
                placeholder="Phone number"
                value={form.phone}
                onChange={(e) => onChange('phone', e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* subjects */}
        <div className="my-12">
          <div className="text-[var(--color-bg-primary)] font-light mb-3">
            * Select Subject
          </div>
          <div className="grid sm:flex flex-wrap gap-4">
            {SUBJECTS.map((s) => (
              <ContactCheckbox key={s} id={`sub-${s}`} label={s} checked={!!form.subject[s]} onChange={() => toggleSubject(s)} />
            ))}
          </div>
        </div>
        {/* message */}
        <div className="mt-12">
          <ContactTxtArea id="message" label="* Message" placeholder="Write your message..." value={form.message} onChange={(e) => onChange('message', e.target.value)} />
        </div>
        {/* errors & success */}
        <div className="mt-4">
          {Object.values(errors).map((msg, idx) => (
            msg ? <div key={idx} className="text-sm text-rose-400 mb-1">{msg}</div> : null
          ))}
          {success && <div className="text-sm text-emerald-300">{success}</div>}
        </div>
        {/* submit */}
        <div className="mt-8 flex justify-center sm:justify-end">
          <ContactBtn type="submit" disabled={loading}>
            {loading ? 'Sending…' : 'Send Message'}
          </ContactBtn>
        </div>
      </form>
    </>
  );
};
