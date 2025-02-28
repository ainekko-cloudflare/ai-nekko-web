import Hero from '@/components/home/hero/main'
import PaperDiscussions from '@/components/home/paperDiscussions/main'

export default function Page() {
  return (
    <main>
      <div className='pin-section'>
        <Hero />
        <PaperDiscussions />
      </div>
    </main>
  );
}
