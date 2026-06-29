import PocketBase from 'pocketbase';

const pb = new PocketBase('http://pb4.jobnation.id');

async function createStoryCollection() {
  try {
    await pb.admins.authWithPassword('jobnation.it@gmail.com', 'wifinyamati');

    // Create page_about_story
    try {
      await pb.collections.create({
        name: 'page_about_story',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: null,
        updateRule: null,
        deleteRule: null,
        schema: [
          { name: 'timeline_label', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'paragraph_1', type: 'text' },
          { name: 'paragraph_2', type: 'text' },
          { name: 'quote', type: 'text' }
        ]
      });
      console.log('Created page_about_story collection');
      
      await pb.collection('page_about_story').create({
        timeline_label: 'EST. 2026 — PRESENT',
        title: 'It started in a coffee shop.',
        paragraph_1: "We were tired of seeing the same generic templates recycled across the web. We wanted to build something that broke the rules—something that merged high-end engineering with rebellious design.",
        paragraph_2: "Today, Pixel Heaven is a multidisciplinary studio. We don't just build websites; we architect digital ecosystems that allow founders to scale their visions without compromising on aesthetics or performance.",
        quote: '"Design is the silent ambassador of your brand. We make sure it screams."'
      });
    } catch(e) {
      console.log('page_about_story might already exist:', e.message);
    }

  } catch(e) {
    console.error('Auth error:', e.message);
  }
}

createStoryCollection();
