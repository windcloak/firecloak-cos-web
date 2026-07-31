export interface TutorialStep {
  image: string;
  caption: string;
  description: string;
  link?: string;
}

export interface TutorialDetails {
  id: string;
  name: string;
  order: number;
  description: string;
  longDescription: string;
  materials: string[];
  steps: TutorialStep[];
  mainImgUrl: string;
}
