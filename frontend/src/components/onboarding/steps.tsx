import type { ReactNode } from 'react';
import { Icon } from '../Icon';
import {
  DIAL_CODES,
  RELATIONS,
  emptyNominee,
  totalShare,
  type Nominee,
  type OnboardingForm,
  type UpdateForm,
} from './form';

interface StepProps {
  form: OnboardingForm;
  update: UpdateForm;
}

const digitsOnly = (value: string, max: number) => value.replace(/\D/g, '').slice(0, max);

function StepIntro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <>
      <div className="step-title">{title}</div>
      <div className="step-sub">{children}</div>
    </>
  );
}

export function ResidencyStep({ form, update }: StepProps) {
  const choices = [
    {
      value: 'Indian' as const,
      title: 'Indian Resident',
      description: 'Resident individual with an Indian PAN and address.',
      patch: { residency: 'Indian', dialCode: '+91' } satisfies Partial<OnboardingForm>,
    },
    {
      value: 'NRI' as const,
      title: 'NRI',
      description: 'Non-resident — needs NRE / NRO bank details later.',
      patch: { residency: 'NRI' } satisfies Partial<OnboardingForm>,
    },
  ];

  return (
    <div>
      <StepIntro title="Where do you reside?">This decides your account type and the documents we need.</StepIntro>
      <div className="choice-list" role="radiogroup" aria-label="Residency">
        {choices.map((choice) => (
          <button
            key={choice.value}
            type="button"
            role="radio"
            aria-checked={form.residency === choice.value}
            className={form.residency === choice.value ? 'choice is-selected' : 'choice'}
            onClick={() => update(choice.patch)}
          >
            <div className="choice__title">{choice.title}</div>
            <div className="choice__desc">{choice.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
}

function OtpButton({ sent, idleLabel, onSend }: { sent: boolean; idleLabel: string; onSend: () => void }) {
  return (
    <button type="button" className={sent ? 'otp-btn is-sent' : 'otp-btn'} onClick={onSend}>
      {sent ? 'SENT' : idleLabel}
    </button>
  );
}

function OtpInput({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (value: string) => void }) {
  return (
    <>
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        className="input input--otp"
        value={value}
        onChange={(e) => onChange(digitsOnly(e.target.value, 6))}
        maxLength={6}
        inputMode="numeric"
        autoComplete="one-time-code"
        placeholder="······"
      />
    </>
  );
}

export function PhoneStep({ form, update }: StepProps) {
  return (
    <div>
      <StepIntro title="Verify your phone">
        {form.residency === 'NRI'
          ? 'Use the number registered with your overseas address.'
          : "We'll send a one-time password to this number."}
      </StepIntro>
      <div className="field-row">
        <select
          className="select"
          aria-label="Country code"
          value={form.dialCode}
          onChange={(e) => update({ dialCode: e.target.value })}
        >
          {DIAL_CODES.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <input
          className="input input--grow"
          aria-label="Phone number"
          value={form.phone}
          onChange={(e) => update({ phone: e.target.value.replace(/[^0-9 ]/g, '') })}
          placeholder="98765 43210"
          inputMode="numeric"
          autoComplete="tel-national"
        />
        <OtpButton sent={form.phoneOtpSent} idleLabel="SEND OTP" onSend={() => update({ phoneOtpSent: true })} />
      </div>
      {form.phoneOtpSent && (
        <div>
          <OtpInput id="phone-otp" label="Enter the 6-digit OTP" value={form.phoneOtp} onChange={(phoneOtp) => update({ phoneOtp })} />
          <div className="hint">
            Didn't get it?{' '}
            <button type="button" className="link-btn" onClick={() => update({ phoneOtp: '' })}>
              Resend OTP
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function EmailStep({ form, update }: StepProps) {
  return (
    <div>
      <StepIntro title="Verify your email">Statements and contract notes go to this address.</StepIntro>
      <div className="field-row">
        <input
          className="input input--grow"
          aria-label="Email address"
          type="email"
          value={form.email}
          onChange={(e) => update({ email: e.target.value })}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <OtpButton sent={form.emailOtpSent} idleLabel="SEND CODE" onSend={() => update({ emailOtpSent: true })} />
      </div>
      {form.emailOtpSent && (
        <div>
          <OtpInput id="email-otp" label="Enter the 6-digit code" value={form.emailOtp} onChange={(emailOtp) => update({ emailOtp })} />
        </div>
      )}
    </div>
  );
}

export function PanStep({ form, update }: StepProps) {
  return (
    <div>
      <StepIntro title="Verify your PAN">We check your name and date of birth against income-tax records.</StepIntro>
      <div className="field-grid">
        <div>
          <label className="label" htmlFor="pan">
            PAN number
          </label>
          <input
            id="pan"
            className="input input--pan"
            value={form.pan}
            onChange={(e) => update({ pan: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10) })}
            maxLength={10}
            placeholder="ABCDE1234F"
          />
        </div>
        <div className="field-pair">
          <div>
            <label className="label" htmlFor="pan-name">
              Name as per PAN
            </label>
            <input
              id="pan-name"
              className="input"
              value={form.panName}
              onChange={(e) => update({ panName: e.target.value })}
              placeholder="Full name"
              autoComplete="name"
            />
          </div>
          <div>
            <label className="label" htmlFor="dob">
              Date of birth
            </label>
            <input
              id="dob"
              className="input input--date"
              type="date"
              value={form.dob}
              onChange={(e) => update({ dob: e.target.value })}
              autoComplete="bday"
            />
          </div>
        </div>
        <div className="notice">Your PAN is used only for KYC verification and is never shared.</div>
      </div>
    </div>
  );
}

export function NomineeStep({ form, update, maxNominees }: StepProps & { maxNominees: number }) {
  const { nominees } = form;
  const total = totalShare(nominees);
  const canAdd = nominees.length < maxNominees;
  const canRemove = nominees.length > 1;

  const updateNominee = (index: number, patch: Partial<Nominee>) =>
    update({ nominees: nominees.map((nominee, i) => (i === index ? { ...nominee, ...patch } : nominee)) });

  return (
    <div>
      <StepIntro title="Add nominees">Add up to {maxNominees} nominees. Shares must total 100%.</StepIntro>
      <div className="choice-list">
        {nominees.map((nominee, index) => {
          const num = index + 1;
          return (
            // Nominees have no stable id; position is their identity in this form.
            <div key={index} className="nominee">
              <div className="nominee__head">
                <div className="nominee__num">NOMINEE {num}</div>
                <button
                  type="button"
                  className="nominee__remove"
                  disabled={!canRemove}
                  onClick={() => update({ nominees: nominees.filter((_, i) => i !== index) })}
                >
                  Remove
                </button>
              </div>
              <div className="nominee__fields">
                <input
                  className="input"
                  aria-label={`Nominee ${num} full name`}
                  value={nominee.name}
                  onChange={(e) => updateNominee(index, { name: e.target.value })}
                  placeholder="Full name"
                />
                <select
                  className="select"
                  aria-label={`Nominee ${num} relation`}
                  value={nominee.relation}
                  onChange={(e) => updateNominee(index, { relation: e.target.value })}
                >
                  <option value="">Relation</option>
                  {RELATIONS.map((relation) => (
                    <option key={relation} value={relation}>
                      {relation}
                    </option>
                  ))}
                </select>
                <div className="share">
                  <input
                    aria-label={`Nominee ${num} share percent`}
                    value={nominee.share}
                    onChange={(e) => updateNominee(index, { share: e.target.value.replace(/[^0-9.]/g, '') })}
                    inputMode="decimal"
                    placeholder="0"
                  />
                  <span>%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="nominee-footer">
        <button
          type="button"
          className="add-nominee"
          disabled={!canAdd}
          onClick={() => update({ nominees: [...nominees, emptyNominee()] })}
        >
          <span className="add-nominee__plus">+</span> Add nominee
        </button>
        <div className={total === 100 ? 'share-total is-complete' : 'share-total'}>Allocated {total}% of 100%</div>
      </div>
    </div>
  );
}

export function DoneStep({ form, onClose }: { form: OnboardingForm; onClose: () => void }) {
  return (
    <div className="done">
      <div className="done__icon">
        <Icon name="check" />
      </div>
      <div className="done__title">You're all set</div>
      <div className="done__text">
        Your {form.residency === 'NRI' ? 'NRI' : 'resident'} account is under review. We'll email {form.email || 'you'} once KYC
        clears — usually within 24 hours.
      </div>
      <button type="button" className="modal-btn-primary" onClick={onClose}>
        BACK TO PTC INDIA
      </button>
    </div>
  );
}
