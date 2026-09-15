import { useEffect, useState } from 'react';
import { Logo } from '../common';
import { Icon } from '../Icon';
import { DONE_STEP, LAST_STEP, STEP_LABELS, initialForm, validateStep, type UpdateForm } from './form';
import { DoneStep, EmailStep, NomineeStep, PanStep, PhoneStep, ResidencyStep } from './steps';

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
  maxNominees?: number;
}

function Stepper({ current }: { current: number }) {
  return (
    <ol className="stepper">
      {STEP_LABELS.map((label, i) => {
        const step = i + 1;
        const state = step < current ? 'is-done' : step === current ? 'is-active' : '';
        return (
          <li key={label} className={`stepper__step ${state}`} aria-current={step === current ? 'step' : undefined}>
            <div className="stepper__circle">{step < current ? <Icon name="check" /> : step}</div>
            <div className="stepper__label">{label}</div>
          </li>
        );
      })}
    </ol>
  );
}

export function OnboardingModal({ open, onClose, maxNominees = 4 }: OnboardingModalProps) {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');

  // Every opening restarts at step 1, but answers are kept between openings.
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) {
      setStep(1);
      setError('');
    }
  }

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const update: UpdateForm = (patch) => {
    setForm((prev) => ({ ...prev, ...patch }));
    setError('');
  };

  const next = () => {
    const message = validateStep(step, form);
    setError(message);
    if (!message) setStep(step + 1);
  };

  const back = () => {
    if (step === 1) {
      onClose();
      return;
    }
    setStep(step - 1);
    setError('');
  };

  const isDone = step === DONE_STEP;

  return (
    <div className="modal-backdrop">
      <div className="modal" role="dialog" aria-modal="true" aria-label="Open an account">
        <div className="modal__header">
          <Logo height={18} />
          <button type="button" className="modal__close" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>

        {!isDone && <Stepper current={step} />}

        <div className="modal__body">
          {step === 1 && <ResidencyStep form={form} update={update} />}
          {step === 2 && <PhoneStep form={form} update={update} />}
          {step === 3 && <EmailStep form={form} update={update} />}
          {step === 4 && <PanStep form={form} update={update} />}
          {step === 5 && <NomineeStep form={form} update={update} maxNominees={maxNominees} />}

          {isDone ? (
            <DoneStep form={form} onClose={onClose} />
          ) : (
            <>
              <div className="modal__footer">
                <button type="button" className="modal-btn-secondary" onClick={back}>
                  Back
                </button>
                <div className="modal__footer-right">
                  <span className="step-counter">
                    {step} of {LAST_STEP}
                  </span>
                  <button type="button" className="modal-btn-primary" onClick={next}>
                    {step === LAST_STEP ? 'SUBMIT' : 'CONTINUE'}
                  </button>
                </div>
              </div>
              {error && (
                <div className="form-error" role="alert">
                  {error}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
