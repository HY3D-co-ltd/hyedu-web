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
  { label: '캠프', labelKey: 'nav.camp', href: '/camp' },
  {
    label: '교육 신청',
    labelKey: 'nav.eduRequest',
    children: [
      { label: '교육신청/문의', labelKey: 'nav.contactUs', href: '/contact' },
      { label: '대회&행사', labelKey: 'nav.events', href: '/board/events' },
      { label: '교육 후기', labelKey: 'nav.reviews', href: '/board/reviews' },
    ],
  },
];
