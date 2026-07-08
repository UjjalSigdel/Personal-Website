export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface TechnicalSkill {
  name: string;
  percentage: number;
}

export interface SoftSkill {
  name: string;
  icon: JSX.Element;
}
