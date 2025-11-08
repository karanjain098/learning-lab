import { Course, Lab, Lesson, ContentSection } from "./api";

/**
 * Mock Content Sections
 */
const createTextSection = (
  order: number,
  title: string,
  content: string,
  locked: boolean = false,
): ContentSection => ({
  id: `section-${order}`,
  order,
  type: "text",
  title,
  content,
  formatting: {
    fontSize: "16px",
    fontFamily: "Inter",
    textColor: "#1f2937",
  },
  protection: {
    allowCopy: !locked,
    allowDownload: false,
    allowPrint: !locked,
    requiresPurchase: locked,
    applyWatermark: locked,
    accessLevel: locked ? "locked" : "public",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const createCodeSection = (
  order: number,
  title: string,
  language: string,
  code: string,
  locked: boolean = false,
): ContentSection => ({
  id: `section-${order}`,
  order,
  type: "code",
  title,
  description: `Code example in ${language}`,
  code: {
    id: `code-${order}`,
    language,
    code,
    fileName: `example-${order}.${language === "python" ? "py" : "js"}`,
    description: `Sample ${language} code`,
  },
  protection: {
    allowCopy: !locked,
    allowDownload: false,
    allowPrint: false,
    requiresPurchase: locked,
    applyWatermark: locked,
    accessLevel: locked ? "locked" : "public",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const createImageSection = (
  order: number,
  title: string,
  locked: boolean = false,
): ContentSection => ({
  id: `section-${order}`,
  order,
  type: "image",
  title,
  description: "Architecture diagram",
  media: {
    id: `image-${order}`,
    url: `https://via.placeholder.com/800x400?text=${encodeURIComponent(title)}`,
    fileName: `diagram-${order}.png`,
    fileSize: 245000,
    mimeType: "image/png",
    uploadedAt: new Date().toISOString(),
    type: "image",
    thumbnailUrl: `https://via.placeholder.com/200x100?text=${encodeURIComponent(title)}`,
  },
  protection: {
    allowCopy: false,
    allowDownload: !locked,
    allowPrint: false,
    requiresPurchase: locked,
    applyWatermark: locked,
    accessLevel: locked ? "locked" : "public",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const createVideoSection = (
  order: number,
  title: string,
  locked: boolean = false,
): ContentSection => ({
  id: `section-${order}`,
  order,
  type: "video",
  title,
  description: "Instructional video",
  media: {
    id: `video-${order}`,
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    fileName: `video-${order}.mp4`,
    fileSize: 1024000,
    mimeType: "video/mp4",
    uploadedAt: new Date().toISOString(),
    type: "video",
    thumbnailUrl: "https://via.placeholder.com/200x120",
    duration: 600,
  },
  protection: {
    allowCopy: false,
    allowDownload: false,
    allowPrint: false,
    requiresPurchase: locked,
    applyWatermark: locked,
    accessLevel: locked ? "locked" : "public",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const createNoteSection = (
  order: number,
  title: string,
  content: string,
  style: "info" | "warning" | "success" | "error" = "info",
): ContentSection => ({
  id: `section-${order}`,
  order,
  type: "note",
  title,
  content,
  noteStyle: style,
  protection: {
    allowCopy: false,
    allowDownload: false,
    allowPrint: false,
    requiresPurchase: false,
    applyWatermark: false,
    accessLevel: "public",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

const createChallengeSection = (
  order: number,
  title: string,
): ContentSection => ({
  id: `section-${order}`,
  order,
  type: "challenge",
  title,
  description: "Hands-on challenge exercise",
  challenge: {
    id: `challenge-${order}`,
    instructions: "Complete the following challenge by implementing the required functionality.",
    sampleInput: "input_example_data",
    expectedOutput: "expected_output_data",
    difficulty: "medium",
  },
  protection: {
    allowCopy: false,
    allowDownload: false,
    allowPrint: false,
    requiresPurchase: false,
    applyWatermark: false,
    accessLevel: "public",
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

/**
 * Mock Lessons with Content Sections
 */
const createLesson = (
  id: string,
  title: string,
  courseId: string,
  labId: string,
  order: number,
  sections: ContentSection[],
): Lesson => ({
  id,
  title,
  description: `Lesson: ${title}`,
  courseId,
  labId,
  order,
  sections,
  estimatedTime: 30,
  status: "published",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

/**
 * AWS Fundamentals Course - Lab 1: EC2 Basics
 */
const awsEc2BasicLesson1: Lesson = createLesson(
  "lesson-aws-1-1",
  "Introduction to EC2",
  "course-aws-1",
  "lab-aws-1-1",
  1,
  [
    createTextSection(
      1,
      "What is Amazon EC2?",
      "Amazon Elastic Compute Cloud (EC2) is a web service that provides resizable compute capacity in the cloud. It is designed to make web-scale cloud computing easier for developers.",
      false,
    ),
    createImageSection(2, "EC2 Architecture Diagram", false),
    createNoteSection(
      3,
      "Important Concepts",
      "EC2 instances are virtual servers that run your applications. You can launch, stop, and terminate instances as needed.",
      "info",
    ),
    createCodeSection(
      4,
      "AWS CLI - Launch Instance",
      "bash",
      `aws ec2 run-instances \\
  --image-id ami-0c55b159cbfafe1f0 \\
  --count 1 \\
  --instance-type t2.micro \\
  --key-name MyKey`,
      true,
    ),
    createVideoSection(5, "EC2 Instance Types Explained", true),
  ],
);

const awsEc2BasicLesson2: Lesson = createLesson(
  "lesson-aws-1-2",
  "Instance Types and Sizing",
  "course-aws-1",
  "lab-aws-1-1",
  2,
  [
    createTextSection(
      1,
      "Understanding Instance Types",
      "EC2 provides multiple instance types optimized for different use cases. Each instance family is designed for specific workloads.",
      false,
    ),
    createImageSection(2, "Instance Type Comparison Chart", false),
    createCodeSection(
      3,
      "Get Available Instance Types",
      "bash",
      `aws ec2 describe-instance-types \\
  --filters "Name=instance-type,Values=t2.*" \\
  --query 'InstanceTypes[*].[InstanceType,MemoryInfo.SizeInMiB]'`,
      true,
    ),
    createChallengeSection(4, "Select Right Instance Type"),
  ],
);

const awsEc2BasicLab: Lab = {
  id: "lab-aws-1-1",
  title: "EC2 Instance Fundamentals",
  description: "Learn the basics of Amazon EC2 and how to launch, configure, and manage instances.",
  courseId: "course-aws-1",
  skillLevel: "beginner",
  estimatedTime: 60,
  format: "manual",
  lessons: [awsEc2BasicLesson1, awsEc2BasicLesson2],
  status: "published",
  price: 29.99,
  pointsReward: 100,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * AWS Fundamentals Course - Lab 2: S3 Storage
 */
const awsS3Lesson1: Lesson = createLesson(
  "lesson-aws-1-3",
  "S3 Basics",
  "course-aws-1",
  "lab-aws-1-2",
  1,
  [
    createTextSection(
      1,
      "Introduction to Amazon S3",
      "Amazon Simple Storage Service (S3) is an object storage service that offers scalability, data availability, security, and performance.",
      false,
    ),
    createVideoSection(2, "S3 Concepts Overview", false),
    createNoteSection(
      3,
      "Key Benefits",
      "S3 provides 11 nines of durability, automatic scaling, and built-in security features.",
      "success",
    ),
  ],
);

const awsS3Lab: Lab = {
  id: "lab-aws-1-2",
  title: "S3 Storage and Management",
  description: "Master Amazon S3 for storing and retrieving objects at scale.",
  courseId: "course-aws-1",
  skillLevel: "beginner",
  estimatedTime: 45,
  format: "manual",
  lessons: [awsS3Lesson1],
  status: "published",
  price: 24.99,
  pointsReward: 80,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * AWS Fundamentals Course
 */
const awsFundamentalsCourse: Course = {
  id: "course-aws-1",
  title: "AWS Fundamentals",
  description: "Master the core AWS services and concepts needed for cloud computing.",
  category: "AWS",
  skillLevel: "beginner",
  labs: [awsEc2BasicLab, awsS3Lab],
  status: "published",
  price: 99.99,
  pointsReward: 500,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Kubernetes Essentials Course - Lab 1: Pods
 */
const k8sPodsLesson1: Lesson = createLesson(
  "lesson-k8s-1-1",
  "Understanding Pods",
  "course-k8s-1",
  "lab-k8s-1-1",
  1,
  [
    createTextSection(
      1,
      "What is a Pod?",
      "A Pod is the smallest deployable unit in Kubernetes. It can contain one or more containers (usually Docker containers) that share storage, network, and specifications.",
      false,
    ),
    createImageSection(2, "Pod Architecture", false),
    createCodeSection(
      3,
      "Create a Pod",
      "yaml",
      `apiVersion: v1
kind: Pod
metadata:
  name: my-pod
spec:
  containers:
  - name: nginx
    image: nginx:latest
    ports:
    - containerPort: 80`,
      false,
    ),
    createNoteSection(
      4,
      "Best Practice",
      "Pods are usually created indirectly through higher-level constructs like Deployments or StatefulSets.",
      "warning",
    ),
    createVideoSection(5, "Pods Deep Dive", false),
  ],
);

const k8sPodsLab: Lab = {
  id: "lab-k8s-1-1",
  title: "Kubernetes Pods",
  description: "Learn to create and manage Kubernetes Pods.",
  courseId: "course-k8s-1",
  skillLevel: "beginner",
  estimatedTime: 45,
  format: "manual",
  lessons: [k8sPodsLesson1],
  status: "published",
  price: 34.99,
  pointsReward: 120,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Kubernetes Essentials Course - Lab 2: Deployments
 */
const k8sDeploymentsLesson1: Lesson = createLesson(
  "lesson-k8s-1-2",
  "Managing Deployments",
  "course-k8s-1",
  "lab-k8s-1-2",
  1,
  [
    createTextSection(
      1,
      "Deployments Overview",
      "A Deployment is a higher-level Kubernetes object that manages ReplicaSets and Pods. It provides declarative updates and rollback capabilities.",
      false,
    ),
    createCodeSection(
      2,
      "Basic Deployment",
      "yaml",
      `apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:latest`,
      true,
    ),
    createChallengeSection(3, "Create and Scale a Deployment"),
  ],
);

const k8sDeploymentsLab: Lab = {
  id: "lab-k8s-1-2",
  title: "Kubernetes Deployments",
  description: "Master Deployments for managing containerized applications at scale.",
  courseId: "course-k8s-1",
  skillLevel: "intermediate",
  estimatedTime: 60,
  format: "manual",
  lessons: [k8sDeploymentsLesson1],
  status: "published",
  price: 44.99,
  pointsReward: 150,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Kubernetes Essentials Course
 */
const k8sEssentialsCourse: Course = {
  id: "course-k8s-1",
  title: "Kubernetes Essentials",
  description: "Master Kubernetes orchestration and container management.",
  category: "DevOps",
  skillLevel: "intermediate",
  labs: [k8sPodsLab, k8sDeploymentsLab],
  status: "published",
  price: 149.99,
  pointsReward: 750,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Azure Basics Course - Lab 1: Virtual Machines
 */
const azureVMLesson1: Lesson = createLesson(
  "lesson-azure-1-1",
  "Creating Virtual Machines",
  "course-azure-1",
  "lab-azure-1-1",
  1,
  [
    createTextSection(
      1,
      "Azure Virtual Machines",
      "Azure Virtual Machines provide on-demand, scalable computing resources. You can choose from various VM sizes and operating systems.",
      false,
    ),
    createImageSection(2, "VM Creation Workflow", false),
    createCodeSection(
      3,
      "Create VM with Azure CLI",
      "bash",
      `az vm create \\
  --resource-group myResourceGroup \\
  --name myVM \\
  --image UbuntuLTS \\
  --admin-username azureuser \\
  --generate-ssh-keys`,
      true,
    ),
    createVideoSection(4, "Azure VM Types and Sizing", true),
  ],
);

const azureVMLab: Lab = {
  id: "lab-azure-1-1",
  title: "Azure Virtual Machines",
  description: "Create and manage virtual machines in Microsoft Azure.",
  courseId: "course-azure-1",
  skillLevel: "beginner",
  estimatedTime: 50,
  format: "manual",
  lessons: [azureVMLesson1],
  status: "published",
  price: 39.99,
  pointsReward: 130,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * Azure Basics Course
 */
const azureBasicsCourse: Course = {
  id: "course-azure-1",
  title: "Azure Basics",
  description: "Get started with Microsoft Azure cloud services.",
  category: "Azure",
  skillLevel: "beginner",
  labs: [azureVMLab],
  status: "published",
  price: 89.99,
  pointsReward: 450,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

/**
 * All Courses
 */
export const ALL_COURSES: Course[] = [
  awsFundamentalsCourse,
  k8sEssentialsCourse,
  azureBasicsCourse,
];

/**
 * Helper functions to retrieve data
 */
export const getCourseById = (courseId: string): Course | undefined => {
  return ALL_COURSES.find((c) => c.id === courseId);
};

export const getLabById = (labId: string): Lab | undefined => {
  return ALL_COURSES.flatMap((c) => c.labs).find((l) => l.id === labId);
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
  return ALL_COURSES.flatMap((c) => c.labs)
    .flatMap((l) => l.lessons)
    .find((lesson) => lesson.id === lessonId);
};

export const getCoursesByCategory = (category: string): Course[] => {
  return ALL_COURSES.filter((c) => c.category === category);
};

export const getLabsByCourse = (courseId: string): Lab[] => {
  const course = getCourseById(courseId);
  return course?.labs || [];
};

export const getLessonsByLab = (labId: string): Lesson[] => {
  const lab = getLabById(labId);
  return lab?.lessons || [];
};
