import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { TabsContent } from '@/components/ui/tabs'

export const TabsMulti = ({
  value,
  // dormitoryID,
}: {
  value: string
  // dormitoryID: string
}) => {
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <CardTitle>หลายห้อง</CardTitle>
          <CardDescription>
            Make changes to your account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2"></CardContent>
        <CardFooter></CardFooter>
      </Card>
    </TabsContent>
  )
}
