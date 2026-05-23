import { ref } from 'vue';

export interface Announcement {
  title: string;
  content: string;
  date: string;
  scope: 'Campus-Wide' | 'College-Level' | 'Department-Level';
  author: string;
}

export const sharedAnnouncements = ref<any[]>([
  {
    title: 'Filing of Candidacy for EleCSyon 2026',
    content: 'Are you ready to lead and serve the computing community? The filing of certificates of candidacy for the upcoming POINTERS Computing Society Departmental Elections is now officially open.',
    date: 'April 20, 2026',
    scope: 'Department-Level',
    author: 'POINTERS Computing Society'
  },
  {
    title: 'KASADYA 2026 Day 3',
    content: 'Get ready for Day 3 of KASADYA 2026 on May 14, 2026! Join us tomorrow for a full day of celebration featuring our CICS departmental exhibit booths.',    
    date: 'May 5, 2026',
    scope: 'College-Level',
    author: 'CICS-BYTES'
  },
  {
    title: 'SSG Parliamentary Election 2026',
    content: 'Exercise your right to vote! The Supreme Student Government Parliamentary Elections will officially take place on May 21, 2026.',
    date: 'May 14, 2026',
    scope: 'Campus-Wide',
    author: 'MSU - Main Supreme Student Government'
  }
]);