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

export interface Project {
  title: string;
  description: string;
  icon: JSX.Element;
  tags: string[];
  status: string;
}
