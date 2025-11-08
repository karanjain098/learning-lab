import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Star, DollarSign, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@shared/schema";

interface CourseOverviewProps {
  course: Course;
}

export default function CourseOverview({ course }: CourseOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-accent rounded-md">
            <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
            <p className="text-2xl font-bold">{course.estimatedHours}h</p>
            <p className="text-xs text-muted-foreground">Duration</p>
          </div>
          <div className="text-center p-4 bg-accent rounded-md">
            <Star className="w-5 h-5 mx-auto mb-1 text-yellow-600" />
            <p className="text-2xl font-bold">{course.totalPoints}</p>
            <p className="text-xs text-muted-foreground">Points</p>
          </div>
          <div className="text-center p-4 bg-accent rounded-md">
            <DollarSign className="w-5 h-5 mx-auto mb-1 text-green-600" />
            <p className="text-2xl font-bold">${course.price}</p>
            <p className="text-xs text-muted-foreground">Price</p>
          </div>
          <div className="text-center p-4 bg-accent rounded-md">
            <Tag className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-sm font-medium">{course.category}</p>
            <p className="text-xs text-muted-foreground">Category</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">Level</h3>
          <Badge variant="outline">{course.level}</Badge>
        </div>

        {course.tags && course.tags.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
