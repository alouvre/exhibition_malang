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
  Heart
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
        Heart
      }
    });
  }
}

export default IconService;
