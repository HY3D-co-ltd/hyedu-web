import { SpecialLecture } from '@/types';

export const specialLectures: SpecialLecture[] = [
  {
    slug: '4th-revolution-entrepreneurship',
    title: '4차산업혁명과 청소년 기업가정신 특강',
    titleEn: '4th Industrial Revolution & Youth Entrepreneurship Lecture',
    description: '4차산업혁명 시대의 변화를 이해하고 청소년 기업가정신을 배양하는 특강 프로그램입니다.',
    descriptionEn: 'A special lecture program that helps understand changes in the 4th Industrial Revolution era and cultivates youth entrepreneurship.',
    duration: '60~100분',
    price: '22,000원',
    thumbnail: '/images/programs/4th-revolution-lecture.png',
    features: [
      {
        title: '4차산업혁명 이해',
        titleEn: 'Understanding the 4th Industrial Revolution',
        description: '4차산업혁명의 핵심 기술과 미래 사회 변화를 알아봅니다.',
        descriptionEn: 'Explore key technologies and future societal changes of the 4th Industrial Revolution.',
        image: '/images/features/4th-revolution.png',
      },
      {
        title: '관계훈련',
        titleEn: 'Relationship Training',
        description: '팀워크와 소통 능력을 기르는 관계훈련 활동을 진행합니다.',
        descriptionEn: 'Engage in relationship training activities that develop teamwork and communication skills.',
        image: '/images/features/relationship-training.png',
      },
      {
        title: 'PBL 수업',
        titleEn: 'PBL (Project-Based Learning)',
        description: '문제 기반 학습을 통해 창의적 문제해결 능력을 키웁니다.',
        descriptionEn: 'Develop creative problem-solving skills through project-based learning.',
        image: '/images/features/pbl.png',
      },
      {
        title: '캠퍼스 투어',
        titleEn: 'Campus Tour',
        description: '대학교 캠퍼스를 방문하여 미래 진로를 탐색합니다.',
        descriptionEn: 'Visit a university campus to explore future career paths.',
        image: '/images/features/campus-tour.png',
      },
    ],
  },
  {
    slug: 'startup-ceo-story',
    title: '스타트업 CEO가 들려주는 나의 창업 이야기',
    titleEn: 'My Startup Story Told by a CEO',
    description: '스타트업 CEO가 직접 들려주는 창업 경험과 도전의 이야기를 통해 기업가정신을 배웁니다.',
    descriptionEn: 'Learn entrepreneurship through startup CEO\'s firsthand stories of founding experience and challenges.',
    duration: '100~120분',
    price: '별도 문의',
    thumbnail: '/images/programs/startup-ceo.png',
    features: [
      {
        title: 'CEO의 창업 이야기',
        titleEn: 'CEO\'s Startup Story',
        description: '실제 스타트업 CEO가 들려주는 생생한 창업 경험담입니다.',
        descriptionEn: 'Vivid startup experiences told by an actual startup CEO.',
        image: '/images/features/ceo-story.png',
      },
      {
        title: '스타트업 마켓',
        titleEn: 'Startup Market',
        description: '직접 스타트업 아이디어를 구상하고 마켓 형식으로 발표합니다.',
        descriptionEn: 'Brainstorm startup ideas and present them in a market format.',
        image: '/images/features/startup-market.png',
      },
      {
        title: '토크쇼',
        titleEn: 'Talk Show',
        description: 'CEO와 학생들이 함께하는 자유로운 Q&A 토크쇼입니다.',
        descriptionEn: 'A free-form Q&A talk show between the CEO and students.',
        image: '/images/features/talk-show.png',
      },
    ],
  },
];
