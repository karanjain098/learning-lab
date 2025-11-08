// Course categories and metadata types
export type CourseCategory =
  | "Cloud Computing"
  | "DevOps"
  | "Software Development"
  | "Cybersecurity"
  | "Data Science"
  | "Machine Learning"
  | "Architecture"
  | "Blockchain"
  | "Mobile Development"
  | "Web Development";

export type CloudPlatform = "AWS" | "Azure" | "GCP" | "Multi-Cloud";
export type DevOpsTool = "Docker" | "Kubernetes" | "Jenkins" | "Terraform" | "GitLab" | "GitHub Actions";
export type ProgrammingLanguage = "Python" | "JavaScript" | "Java" | "Go" | "C#" | "TypeScript" | "Rust";

// Course categorization
export interface CourseCategorization {
  primaryCategory: CourseCategory;
  subcategories?: string[];
  cloudPlatforms?: CloudPlatform[];
  devOpsTools?: DevOpsTool[];
  programmingLanguages?: ProgrammingLanguage[];
  customTags?: string[];
}

// Media handling interfaces
export interface YoutubeVideo {
  videoId: string;
  startTime?: number;
  endTime?: number;
  title: string;
  thumbnail?: string;
}

export interface ImageAsset {
  url: string;
  altText: string;
  caption?: string;
  width?: number;
  height?: number;
  fileSize?: number;
}

export interface FileAsset {
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  uploadDate: string;
  description?: string;
}

// Course section specific interfaces
export interface TextSection {
  type: "text";
  content: string;
  formatting: {
    headingLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    isRichText: boolean;
    hasSyntaxHighlighting?: boolean;
  };
}

export interface CodeSection {
  type: "code";
  language: string;
  code: string;
  explanation?: string;
  highlightedLines?: number[];
  runnable?: boolean;
  testCases?: {
    input: string;
    expectedOutput: string;
  }[];
}

export interface VideoSection {
  type: "video";
  videoType: "youtube" | "uploaded";
  video: YoutubeVideo | FileAsset;
  transcriptUrl?: string;
  timestamps?: Array<{
    time: number;
    label: string;
  }>;
}

export interface ImageSection {
  type: "image";
  image: ImageAsset;
  zoomEnabled?: boolean;
  overlay?: {
    text?: string;
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  };
}

export interface QuizSection {
  type: "quiz";
  questions: Array<{
    type: "multiple-choice" | "single-choice" | "true-false" | "fill-in";
    question: string;
    options?: string[];
    correctAnswer: string | string[];
    explanation?: string;
    points: number;
  }>;
  passingScore: number;
  timeLimit?: number;
  shuffleQuestions?: boolean;
}

export interface LabSection {
  type: "lab";
  labType: "hands-on" | "guided" | "challenge";
  instructions: string;
  prerequisites?: string[];
  setupSteps: string[];
  tasks: Array<{
    title: string;
    description: string;
    hints?: string[];
    validationSteps?: string[];
  }>;
  resources?: FileAsset[];
  expectedDuration: number;
}

// Course module structure
export interface CourseModule {
  id: string;
  title: string;
  description: string;
  order: number;
  sections: Array<
    | TextSection
    | CodeSection
    | VideoSection
    | ImageSection
    | QuizSection
    | LabSection
  >;
  estimatedDuration: number;
}

// Course pricing and access
export interface CoursePricing {
  type: "free" | "paid" | "subscription";
  price?: number;
  currency?: string;
  subscriptionPlan?: string;
  hasTrialAccess?: boolean;
  trialDuration?: number;
}

// Course structure with all metadata
export interface CourseStructure {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  thumbnail: ImageAsset;
  
  // Categorization
  categorization: CourseCategorization;
  
  // Course content
  learningObjectives: string[];
  prerequisites?: string[];
  modules: CourseModule[];
  
  // Course metadata
  skillLevel: "beginner" | "intermediate" | "advanced" | "expert";
  estimatedDuration: number;
  lastUpdated: string;
  version: string;
  
  // Access & pricing
  pricing: CoursePricing;
  enrollmentStatus: "open" | "closed" | "coming-soon";
  
  // Author info
  author: {
    id: string;
    name: string;
    bio?: string;
    avatar?: string;
  };
  
  // Stats & metrics
  stats?: {
    enrolled: number;
    completed: number;
    averageRating: number;
    reviewCount: number;
  };
}