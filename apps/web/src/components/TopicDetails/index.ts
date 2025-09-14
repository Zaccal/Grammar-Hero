import { TopicDetailsRoot } from './TopicDetails'
import { TopicDetailsActions } from './TopicDetailsActions'
import { TopicDetailsBookmark } from './TopicDetailsBookmark'
import TopicDetailsContent from './TopicDetailsContent'
import { TopicDetailsCopyLink } from './TopicDetailsCopyLink'
import TopicDetailsDelete from './TopicDetailsDelete'
import { TopicDetailsDropdown } from './TopicDetailsDropdown'
import { TopicDetailsDropdownContentProtected } from './TopicDetailsDropdownContentProtected'
import { TopicDetailsDropdownContentPublic } from './TopicDetailsDropdownContentPublic'
import TopicDetailsEdit from './TopicDetailsEdit'
import { TopicDetailsHeader } from './TopicDetailsHeader'
import { TopicDetailsImage } from './TopicDetailsImage'
import { TopicDetailsLike } from './TopicDetailsLike'
import { TopicDetailsReport } from './TopicDetailsReport'
import { TopicDetailsShare } from './TopicDetailsShare'
import { TopicDetailsAddFavorites } from './TpoicDetailsAddFavorites'

export const TopicDetails = {
  Root: TopicDetailsRoot,
  Header: TopicDetailsHeader,
  Actions: TopicDetailsActions,
  Dropdown: TopicDetailsDropdown,
  DropdownContentProtected: TopicDetailsDropdownContentProtected,
  DropdownContentPublic: TopicDetailsDropdownContentPublic,
  AddFavorites: TopicDetailsAddFavorites,
  CopyLink: TopicDetailsCopyLink,
  Share: TopicDetailsShare,
  Report: TopicDetailsReport,
  Edit: TopicDetailsEdit,
  Delete: TopicDetailsDelete,
  Image: TopicDetailsImage,
  Content: TopicDetailsContent,
  Like: TopicDetailsLike,
  Bookmark: TopicDetailsBookmark,
}
