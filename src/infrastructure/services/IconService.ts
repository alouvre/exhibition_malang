import { 
  createIcons, 
  Home, 
  Music, 
  Info, 
  ChevronLeft, 
  Menu, 
  Settings, 
  Star,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  ListMusic,
  Heart,
  HelpCircle,
  Mic,
  Disc,
  ExternalLink,
  ArrowLeft,
  ArrowUpRight,
  User,
  Sliders,
  Bell,
  LogOut,
  ArrowRight,
  RotateCcw
} from 'lucide';

export class IconService {
  static initialize(): void {
    createIcons({
      icons: {
        Home,
        Music,
        Info,
        ChevronLeft,
        Menu,
        Settings,
        Star,
        Play,
        Pause,
        SkipForward,
        SkipBack,
        Shuffle,
        Repeat,
        Volume2,
        VolumeX,
        ListMusic,
        Heart,
        HelpCircle,
        Mic,
        Disc,
        ExternalLink,
        ArrowLeft,
        ArrowUpRight,
        User,
        Sliders,
        Bell,
        LogOut,
        ArrowRight,
        RotateCcw
      }
    });
  }
}

export default IconService;
