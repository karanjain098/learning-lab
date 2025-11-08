import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Lab } from "@shared/schema";

interface LabOverviewProps {
  lab: Lab;
}

export default function LabOverview({ lab }: LabOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{lab.title}</CardTitle>
        <CardDescription>{lab.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{lab.skillLevel}</Badge>
          <Badge variant="secondary">{lab.format}</Badge>
          {lab.requiresPurchase && <Badge className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300">Paid</Badge>}
          {lab.cloudAccess && <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">Cloud Access</Badge>
          }
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-accent rounded-md">
            <p className="text-sm text-muted-foreground">Estimated Hours</p>
            <p className="text-2xl font-bold">{lab.estimatedHours}h</p>
          </div>
          {lab.price && (
            <div className="p-4 bg-accent rounded-md">
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-2xl font-bold">${lab.price}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
