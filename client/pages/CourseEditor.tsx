import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ScrollArea } from '../components/ui/scroll-area';
import { useToast } from '../components/ui/use-toast';
import type {
  CourseStructure,
  CourseCategorization,
  CourseCategory,
  CloudPlatform,
  DevOpsTool,
  ProgrammingLanguage,
} from '@shared/contentTypes';
import ContentSectionEditor from '@/components/ContentSectionEditor';

// Validation schema for course
const courseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  subtitle: z.string().optional(),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  thumbnail: z.object({
    url: z.string().url('Please enter a valid image URL'),
    altText: z.string(),
  }),
  categorization: z.object({
    primaryCategory: z.string(),
    subcategories: z.array(z.string()).optional(),
    cloudPlatforms: z.array(z.string()).optional(),
    devOpsTools: z.array(z.string()).optional(),
    programmingLanguages: z.array(z.string()).optional(),
    customTags: z.array(z.string()).optional(),
  }),
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  estimatedDuration: z.number().min(1, 'Duration must be at least 1 hour'),
});

const CourseEditor = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('basic-info');
  const [courseData, setCourseData] = useState<Partial<CourseStructure>>({});

  // Available categories and tools
  const categories: CourseCategory[] = [
    'Cloud Computing',
    'DevOps',
    'Software Development',
    'Cybersecurity',
    'Data Science',
    'Machine Learning',
    'Architecture',
    'Blockchain',
    'Mobile Development',
    'Web Development',
  ];

  const cloudPlatforms: CloudPlatform[] = ['AWS', 'Azure', 'GCP', 'Multi-Cloud'];
  const devOpsTools: DevOpsTool[] = [
    'Docker',
    'Kubernetes',
    'Jenkins',
    'Terraform',
    'GitLab',
    'GitHub Actions',
  ];
  const languages: ProgrammingLanguage[] = [
    'Python',
    'JavaScript',
    'Java',
    'Go',
    'C#',
    'TypeScript',
    'Rust',
  ];

  const handleSubmit = async (data: Partial<CourseStructure>) => {
    try {
      // Validate data
      courseSchema.parse(data);

      // TODO: Save course data
      console.log('Saving course:', data);

      toast({
        title: 'Course saved successfully!',
        description: 'Your course has been saved as a draft.',
      });

      // Navigate to course view
      navigate('/courses/' + data.id);
    } catch (error) {
      console.error('Error saving course:', error);
      toast({
        title: 'Error saving course',
        description: 'Please check all required fields and try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New Course</h1>
        <div className="space-x-4">
          <Button variant="outline" onClick={() => navigate('/courses')}>
            Cancel
          </Button>
          <Button variant="default" onClick={() => handleSubmit(courseData)}>
            Save Draft
          </Button>
        </div>
      </div>

      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="basic-info">Basic Info</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <TabsContent value="basic-info">
              <Form>
                <div className="space-y-6">
                  <FormField
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter course title"
                            {...field}
                            onChange={(e) =>
                              setCourseData({
                                ...courseData,
                                title: e.target.value,
                              })
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Make it clear and compelling
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What will students learn in this course?"
                            className="min-h-[150px]"
                            {...field}
                            onChange={(e) =>
                              setCourseData({
                                ...courseData,
                                description: e.target.value,
                              })
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      name="primaryCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Category</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              setCourseData({
                                ...courseData,
                                categorization: {
                                  ...courseData.categorization,
                                  primaryCategory: value as CourseCategory,
                                },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      name="skillLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Skill Level</FormLabel>
                          <Select
                            onValueChange={(value) =>
                              setCourseData({
                                ...courseData,
                                skillLevel: value as CourseStructure['skillLevel'],
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select skill level" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="expert">Expert</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </Form>
            </TabsContent>

            <TabsContent value="content">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Course Content</h2>
                  <Button 
                    onClick={() => {
                      setCourseData({
                        ...courseData,
                        modules: [
                          ...(courseData.modules || []),
                          {
                            id: Math.random().toString(36).substring(7),
                            title: 'New Module',
                            description: '',
                            order: (courseData.modules || []).length,
                            sections: [],
                            estimatedDuration: 0,
                          }
                        ]
                      });
                    }}
                  >
                    Add Module
                  </Button>
                </div>
                
                {/* Course Modules */}
                {courseData.modules?.map((module, moduleIndex) => (
                  <Card key={module.id} className="p-6">
                    <div className="mb-4">
                      <Input
                        value={module.title}
                        onChange={(e) => {
                          const updatedModules = [...(courseData.modules || [])];
                          updatedModules[moduleIndex] = {
                            ...module,
                            title: e.target.value,
                          };
                          setCourseData({
                            ...courseData,
                            modules: updatedModules,
                          });
                        }}
                        className="text-xl font-bold mb-2"
                        placeholder="Module Title"
                      />
                      <Textarea
                        value={module.description}
                        onChange={(e) => {
                          const updatedModules = [...(courseData.modules || [])];
                          updatedModules[moduleIndex] = {
                            ...module,
                            description: e.target.value,
                          };
                          setCourseData({
                            ...courseData,
                            modules: updatedModules,
                          });
                        }}
                        placeholder="Module Description"
                        className="mb-4"
                      />
                    </div>

                    {/* Module Sections */}
                    {module.sections.map((section, sectionIndex) => (
                      <ContentSectionEditor
                        key={sectionIndex}
                        section={section}
                        onChange={(updatedSection) => {
                          const updatedModules = [...(courseData.modules || [])];
                          updatedModules[moduleIndex].sections[sectionIndex] = updatedSection;
                          setCourseData({
                            ...courseData,
                            modules: updatedModules,
                          });
                        }}
                        onDelete={() => {
                          const updatedModules = [...(courseData.modules || [])];
                          updatedModules[moduleIndex].sections.splice(sectionIndex, 1);
                          setCourseData({
                            ...courseData,
                            modules: updatedModules,
                          });
                        }}
                        onMoveUp={() => {
                          if (sectionIndex > 0) {
                            const updatedModules = [...(courseData.modules || [])];
                            const sections = updatedModules[moduleIndex].sections;
                            [sections[sectionIndex], sections[sectionIndex - 1]] = 
                            [sections[sectionIndex - 1], sections[sectionIndex]];
                            setCourseData({
                              ...courseData,
                              modules: updatedModules,
                            });
                          }
                        }}
                        onMoveDown={() => {
                          const updatedModules = [...(courseData.modules || [])];
                          const sections = updatedModules[moduleIndex].sections;
                          if (sectionIndex < sections.length - 1) {
                            [sections[sectionIndex], sections[sectionIndex + 1]] = 
                            [sections[sectionIndex + 1], sections[sectionIndex]];
                            setCourseData({
                              ...courseData,
                              modules: updatedModules,
                            });
                          }
                        }}
                      />
                    ))}

                    <Button
                      variant="outline"
                      className="mt-4"
                      onClick={() => {
                        const updatedModules = [...(courseData.modules || [])];
                        updatedModules[moduleIndex].sections.push({
                          type: 'text',
                          content: '',
                          formatting: {
                            isRichText: true,
                          }
                        });
                        setCourseData({
                          ...courseData,
                          modules: updatedModules,
                        });
                      }}
                    >
                      Add Section
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="requirements">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Course Requirements</h2>
                <Card className="p-6">
                  <FormField
                    name="prerequisites"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prerequisites</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="List any prerequisites for this course..."
                            value={courseData.prerequisites?.join('\n')}
                            onChange={(e) => {
                              setCourseData({
                                ...courseData,
                                prerequisites: e.target.value.split('\n').filter(Boolean),
                              });
                            }}
                            className="min-h-[150px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Card>
                
                <Card className="p-6">
                  <FormField
                    name="learningObjectives"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Learning Objectives</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="What will students learn in this course?"
                            value={courseData.learningObjectives?.join('\n')}
                            onChange={(e) => {
                              setCourseData({
                                ...courseData,
                                learningObjectives: e.target.value.split('\n').filter(Boolean),
                              });
                            }}
                            className="min-h-[150px]"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="settings">
              {/* Settings section */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold">Course Settings</h2>
                {/* Add course settings here */}
              </div>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </Card>
    </div>
  );
};

export default CourseEditor;