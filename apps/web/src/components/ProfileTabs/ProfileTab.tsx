import type { TabsContentProps } from './ProfileTabContent'
import type { TabsProps } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface ProfileTabsProps extends TabsProps {
  children: React.ReactElement<TabsContentProps>[]
}

export function ProfileTab({ children, ...props }: ProfileTabsProps) {
  return (
    <Tabs {...props} className="text-sm my-12">
      <ScrollArea
        orentation="horizontal"
        aria-orientation="horizontal"
        className="w-full whitespace-nowrap"
      >
        <TabsList variant="line" className="min-w-sm ">
          {children.map(node => (
            <TabsTrigger value={node.props.value} key={node.props.value}>
              {node.props.icon}
              {node.props.value}
            </TabsTrigger>
          ))}
        </TabsList>
      </ScrollArea>
      {children.map(node => (
        <TabsContent key={node.props.value} value={node.props.value}>
          {node.props.children}
        </TabsContent>
      ))}
    </Tabs>
  )
}
