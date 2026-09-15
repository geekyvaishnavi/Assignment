export type Residency = '' | 'Indian' | 'NRI';

export interface Nominee {
  name: string;
  relation: string;
  share: string;
}

export interface OnboardingForm {
  residency: Residency;
  dialCode: string;
  phone: string;
  phoneOtpSent: boolean;
  phoneOtp: string;
  email: string;
  emailOtpSent: boolean;
  emailOtp: string;
  pan: string;
  panName: string;
  dob: string;
  nominees: Nominee[];
}

export type UpdateForm = (patch: Partial<OnboardingForm>) => void;

export const STEP_LABELS = ['Residency', 'Phone', 'Email', 'PAN', 'Nominee'] as const;
export const LAST_STEP = STEP_LABELS.length;
export const DONE_STEP = LAST_STEP + 1;

export const DIAL_CODES = ['+91', '+971', '+65', '+44', '+1'];
export const RELATIONS = ['Spouse', 'Son', 'Daughter', 'Father', 'Mother', 'Brother', 'Sister', 'Other'];

export const emptyNominee = (): Nominee => ({ name: '', relation: '', share: '' });

export const initialForm: OnboardingForm = {
  residency: '',
  dialCode: '+91',
  phone: '',
  phoneOtpSent: false,
  phoneOtp: '',
  email: '',
  emailOtpSent: false,
  emailOtp: '',
  pan: '',
  panName: '',
  dob: '',
  nominees: [emptyNominee()],
};

/** Sum of nominee shares, rounded to two decimals so 33.3 + 33.3 + 33.4 counts as 100. */
export function totalShare(nominees: Nominee[]) {
  const total = nominees.reduce((sum, nominee) => sum + (parseFloat(nominee.share) || 0), 0);
  return Math.round(total * 100) / 100;
}

/** Returns the message blocking the given step, or an empty string when it is complete. */
export function validateStep(step: number, form: OnboardingForm): string {
  switch (step) {
    case 1:
      return form.residency ? '' : 'Please choose your residency status.';
    case 2:
      if (form.phone.replace(/\D/g, '').length < 10) return 'Enter a valid 10-digit phone number.';
      if (!form.phoneOtpSent) return 'Send and enter the OTP to continue.';
      if (form.phoneOtp.length !== 6) return 'Enter the 6-digit OTP sent to your phone.';
      return '';
    case 3:
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return 'Enter a valid email address.';
      if (!form.emailOtpSent) return 'Send and enter the code to continue.';
      if (form.emailOtp.length !== 6) return 'Enter the 6-digit code sent to your email.';
      return '';
    case 4:
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan.toUpperCase())) return 'PAN must look like ABCDE1234F.';
      if (!form.panName.trim()) return 'Enter your name as printed on your PAN.';
      if (!form.dob) return 'Select your date of birth.';
      return '';
    case 5:
      if (form.nominees.some((nominee) => !nominee.name.trim() || !nominee.relation)) {
        return 'Each nominee needs a name and a relation.';
      }
      if (totalShare(form.nominees) !== 100) return 'Nominee shares must add up to exactly 100%.';
      return '';
    default:
      return '';
  }
}
