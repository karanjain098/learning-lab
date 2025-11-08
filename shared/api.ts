/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Navbar configuration response
 */
export interface NavbarConfig {
  position: "top" | "side";
  visible: boolean;
  pagesEnabled: {
    freWebinars: boolean;
    liveEvents: boolean;
    instructorResources: boolean;
    instructorLedTraining: boolean;
    onDemandVideo: boolean;
    careerAssistance: boolean;
    examVoucher: boolean;
  };
  logoText: string;
  logoUrl?: string;
}

/**
 * Content Section Types - Building blocks for lessons/labs
 */
export type ContentSectionType = 
  // Basic content types
  | "heading"
  | "text"
  | "note"
  | "warning"
  | "info"
  | "success"
  | "error"
  
  // Rich media types
  | "image"
  | "video"
  | "pdf"
  | "audio"
  | "diagram"
  | "presentation"
  | "animation"
  
  // Interactive content
  | "code"
  | "code-challenge"
  | "quiz"
  | "poll"
  | "survey"
  | "feedback"
  
  // Lab specific types
  | "lab-instructions"
  | "lab-manual"
  | "lab-video"
  | "lab-files"
  | "lab-terminal"
  | "lab-environment"
  
  // Assessment types
  | "practice-test"
  | "certification-prep"
  | "knowledge-check"
  | "challenge"
  | "assignment"
  
  // Documentation types
  | "api-doc"
  | "architecture"
  | "troubleshooting"
  | "best-practices"
  | "checklist";
export type AccessLevel = "public" | "locked" | "instructor-only";
export type ContentStatus = "draft" | "published" | "archived";

/**
 * Protection & Access Control Settings
 */
export interface ContentProtection {
  allowCopy: boolean;
  allowDownload: boolean;
  allowPrint: boolean;
  requiresPurchase: boolean;
  applyWatermark: boolean;
  accessLevel: AccessLevel;
}

/**
 * Code Block Structure
 */
export interface CodeBlock {
  id: string;
  language: string;
  code: string;
  fileName?: string;
  description?: string;
}

/**
 * Media File Structure
 */
export interface MediaFile {
  id: string;
  url: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedAt: string;
  type: "image" | "video" | "pdf" | "audio";
  thumbnailUrl?: string;
  duration?: number;
}

/**
 * Content Section - Individual content piece
 */
// Content metadata and tracking
export interface ContentMetadata {
  version: number;
  lastUpdated: string;
  createdBy: string;
  status: ContentStatus;
  visibility: "public" | "private" | "scheduled";
  scheduledPublish?: string;
  points?: number;
  estimatedTime?: number;
  skillLevel: "Beginner" | "Intermediate" | "Advanced";
  certifications?: string[];
  tags?: string[];
}

// Lab specific interfaces
export interface LabAccess {
  type: "manual" | "automated";
  provider: "AWS" | "Azure" | "GCP";
  hoursAllowed: number;
  timeWindow: {
    start: string; // e.g., "09:00"
    end: string;   // e.g., "18:00"
  };
  credentials?: {
    username: string;
    tempPassword: string;
    expiresAt: string;
  };
}

export interface LabFiles {
  id: string;
  filename: string;
  type: "code" | "config" | "template";
  url: string;
  size: number;
}

// Rich text formatting
export interface TextFormatting {
  font?: string;
  size?: number;
  color?: string;
  highlight?: boolean;
  bold?: boolean;
  italic?: boolean;
  fontSize?: string;
  fontFamily?: string;
  textColor?: string;
  highlightedText?: string[];
}

// Extended code block with more features
export interface ExtendedCodeBlock extends CodeBlock {
  highlightLines?: number[];
  readOnly?: boolean;
}

export interface ContentSection {
  // Core fields
  id: string;
  order: number;
  type: ContentSectionType;
  title: string;
  description?: string;

  // Content and formatting
  content?: string;
  formatting?: TextFormatting;
  
  // Code related fields
  codeBlocks?: ExtendedCodeBlock[];
  code?: CodeBlock;
  expectedOutput?: string;
  hints?: string[];
  solution?: string;

  // Media related fields
  media?: MediaFile[];
  caption?: string;
  altText?: string;

  // Lab specific fields
  labAccess?: LabAccess;
  labFiles?: LabFiles[];
  prerequisites?: string[];
  objectives?: string[];

  // Note Section
  noteStyle?: "info" | "warning" | "success" | "error";

  // Challenge
  challenge?: {
    id: string;
    instructions: string;
    sampleInput?: string;
    expectedOutput?: string;
    difficulty: "easy" | "medium" | "hard";
  };

  // Protection & metadata
  protection: ContentProtection;
  metadata: ContentMetadata;

  // Tracking & Progress
  completionCriteria?: {
    type: "view" | "submit" | "pass-test" | "time-spent";
    requiredScore?: number;
    minimumTime?: number; // in minutes
    maxAttempts?: number;
  };
  progress?: {
    started: boolean;
    completed: boolean;
    score?: number;
    attempts: number;
    timeSpent: number; // in minutes
    lastAttempt?: string;
  };

  // Timestamps
  createdAt: string;
  updatedAt: string;
}

/**
 * Lesson - Container for multiple content sections
 */
export interface Lesson {
  id: string;
  title: string;
  description?: string;
  courseId: string;
  labId: string;
  order: number;
  sections: ContentSection[];
  estimatedTime: number;
  status: ContentStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * Lab Exercise
 */
export interface Lab {
  id: string;
  title: string;
  description: string;
  courseId: string;
  skillLevel: "beginner" | "intermediate" | "advanced";
  estimatedTime: number;
  format: "manual" | "video" | "challenge" | "instructor-led" | "master";
  lessons: Lesson[];
  status: ContentStatus;
  price?: number;
  pointsReward?: number;
  certification?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Course - Top level container
 */
export interface Course {
  id: string;
  title: string;
  description: string;
  category: "AWS" | "Azure" | "GCP" | "DevOps" | "Development" | "Architecture" | "Security";
  skillLevel: "beginner" | "intermediate" | "advanced";
  labs: Lab[];
  status: ContentStatus;
  price?: number;
  pointsReward?: number;
  instructorId?: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * Learning Path - Groups multiple courses
 */
export interface LearningPath {
  id: string;
  title: string;
  description: string;
  certification: "AWS-SAA" | "AWS-DOP" | "AZ-900" | "GCP-ACE" | "CKA" | "Other";
  skillLevel: "beginner" | "intermediate" | "advanced";
  courseIds: string[];
  estimatedHours: number;
  price?: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * User Purchase/Access Record
 */
export interface UserAccess {
  userId: string;
  courseId?: string;
  labId?: string;
  lessonId?: string;
  accessLevel: AccessLevel;
  purchasedAt: string;
  expiresAt?: string;
}

/**
 * Completion tracking
 */
export interface Progress {
  userId: string;
  courseId?: string;
  labId?: string;
  lessonId?: string;
  completionPercentage: number;
  completedAt?: string;
  certificateUrl?: string;
}
