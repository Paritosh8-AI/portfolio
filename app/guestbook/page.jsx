import InteractiveGuestbook from '@/components/InteractiveGuestbook';

export const metadata = {
  title: 'Engineering Guestbook & Peer Endorsements | Paritosh Mukherjee',
  description:
    'Live MongoDB-backed peer review board and engineering endorsements for Paritosh Mukherjee. Powered by Next.js and Mongoose.',
};

export default function GuestbookPage() {
  return (
    <div style={{ paddingTop: 100 }}>
      <InteractiveGuestbook />
    </div>
  );
}
