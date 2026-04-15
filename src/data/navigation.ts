import { NavItem } from '@/types';

export const navigationItems: NavItem[] = [
  { label: '소개', labelKey: 'nav.about', href: '/about' },
  {
    label: '찾아가는 체험교실',
    labelKey: 'nav.programs',
    children: [
      { label: '체험교실', labelKey: 'nav.experienceClass', href: '/programs' },
      { label: '청소년 동아리', labelKey: 'nav.youthClub', href: '/youth-club' },
      { label: '온라인 교육', labelKey: 'nav.online', href: '/online' },
      { label: '전문인 특강', labelKey: 'nav.specialLecture', href: '/special-lecture' },
    ],
  },
  { label: '체험 부스', labelKey: 'nav.booth', href: '/booth' },
  {
    label: '캠프',
    labelKey: 'nav.camp',
    children: [
      { label: '한양청소년캠프', labelKey: 'nav.campYouth', href: '/camp' },
      { label: '토요캠프', labelKey: 'nav.campSaturday', href: '/camp/saturday' },
      { label: '경진대회 대비 캠프', labelKey: 'nav.campCompetition', href: '/camp/competition' },
    ],
  },
  { label: '교육 신청', labelKey: 'nav.eduRequest', href: '/contact' },
];
