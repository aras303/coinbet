import type { Match } from '../types/match';
import { formatKickoffTime } from './date';

const LIVE_STATUSES = new Set(['1H', '2H', 'HT', 'ET', 'BT', 'P', 'LIVE']);
const FINISHED_STATUSES = new Set(['FT', 'AET', 'PEN']);

export function isLiveMatch(match: Match): boolean {
  return LIVE_STATUSES.has(match.status.short);
}

export function isFinishedMatch(match: Match): boolean {
  return FINISHED_STATUSES.has(match.status.short);
}

export function getStatusLabel(match: Match): string {
  if (isLiveMatch(match)) {
    return match.status.elapsed ? `${match.status.elapsed}'` : 'CANLI';
  }
  if (isFinishedMatch(match)) {
    return 'MS';
  }
  return formatKickoffTime(match.kickoff);
}

export function matchSearchText(match: Match): string {
  return `${match.teams.home.name} ${match.teams.away.name} ${match.league.name}`.toLowerCase();
}

const STATUS_LONG_LABELS_TR: Record<string, string> = {
  TBD: 'Zamanı Belirsiz',
  NS: 'Başlamadı',
  '1H': 'İlk Yarı',
  HT: 'Devre Arası',
  '2H': 'İkinci Yarı',
  ET: 'Uzatmalar',
  BT: 'Uzatma Arası',
  P: 'Penaltılar',
  SUSP: 'Ertelendi',
  INT: 'Yarıda Kesildi',
  FT: 'Maç Sonu',
  AET: 'Uzatmalarla Bitti',
  PEN: 'Penaltılarla Bitti',
  PST: 'Ertelendi',
  CANC: 'İptal Edildi',
  ABD: 'Yarıda Bırakıldı',
  AWD: 'Hükmen Sonuçlandı',
  WO: 'Hükmen Galibiyet',
  LIVE: 'Canlı',
};

export function getStatusLongLabel(match: Match): string {
  return STATUS_LONG_LABELS_TR[match.status.short] ?? match.status.long;
}
