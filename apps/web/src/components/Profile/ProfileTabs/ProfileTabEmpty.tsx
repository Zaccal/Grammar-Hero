import { Link } from '@tanstack/react-router'
import { BriefcaseBusiness } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'

interface ProfileTabEmptyProps {
  variant: 'empty-my-topics' | 'empty-liked' | 'empty-bookmarked'
}

export function ProfileTabEmpty({ variant }: ProfileTabEmptyProps) {
  if (variant === 'empty-my-topics') {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <BriefcaseBusiness />
          </EmptyMedia>
          <EmptyTitle>No Projects Yet</EmptyTitle>
          <EmptyDescription>
            Become a contributor! Upload your first topic and join our community
            of learners and educators
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button asChild>
            <Link to="/createTopic">Let's create!</Link>
          </Button>
        </EmptyContent>
      </Empty>
    )
  }

  return <div></div>
}
