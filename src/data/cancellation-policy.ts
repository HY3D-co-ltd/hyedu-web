import { CancellationPolicy } from '@/types';

export const cancellationPolicies: CancellationPolicy[] = [
  {
    type: 'experience',
    rules: [
      { timing: '15일 이전', timingEn: '15+ days before', cancellation: '무료 취소', cancellationEn: 'Free cancellation', changes: '일정/인원 변경 가능', changesEn: 'Schedule/headcount changes allowed' },
      { timing: '12~14일 전', timingEn: '12-14 days before', cancellation: '위약금 10%', cancellationEn: '10% penalty', changes: '인원만 변경', changesEn: 'Headcount only' },
      { timing: '8~11일 전', timingEn: '8-11 days before', cancellation: '위약금 30%', cancellationEn: '30% penalty', changes: '변경 불가', changesEn: 'No changes' },
      { timing: '7일 이내', timingEn: 'Within 7 days', cancellation: '취소 불가', cancellationEn: 'No cancellation', changes: '변경 불가', changesEn: 'No changes' },
    ],
  },
  {
    type: 'camp',
    rules: [
      { timing: '15일 이전', timingEn: '15+ days before', cancellation: '100% 환불', cancellationEn: '100% refund', changes: '', changesEn: '' },
      { timing: '12일 이전', timingEn: '12+ days before', cancellation: '50% 환불', cancellationEn: '50% refund', changes: '', changesEn: '' },
      { timing: '10일 이전', timingEn: '10+ days before', cancellation: '30% 환불', cancellationEn: '30% refund', changes: '', changesEn: '' },
      { timing: '7일 이내', timingEn: 'Within 7 days', cancellation: '취소/환불 불가', cancellationEn: 'No cancellation/refund', changes: '', changesEn: '' },
    ],
  },
];
