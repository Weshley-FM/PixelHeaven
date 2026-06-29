import PocketBase from 'pocketbase';

const pb = new PocketBase('http://pb4.jobnation.id');

async function createCollections() {
  try {
    await pb.admins.authWithPassword('jobnation.it@gmail.com', 'wifinyamati');

    // Create page_about_hero
    try {
      await pb.collections.create({
        name: 'page_about_hero',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: null,
        updateRule: null,
        deleteRule: null,
        schema: [
          { name: 'title', type: 'text' },
          { name: 'subtitle', type: 'text' },
          { name: 'image_url', type: 'url' },
          { name: 'stat_number', type: 'text' },
          { name: 'stat_label', type: 'text' },
          { name: 'image_text', type: 'text' }
        ]
      });
      console.log('Created page_about_hero collection');
      
      await pb.collection('page_about_hero').create({
        title: 'We are the architects of the digital frontier.',
        subtitle: 'A multidisciplinary studio driven by a single purpose: to build digital experiences that refuse to be ignored.',
        image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop',
        stat_number: '15+',
        stat_label: 'Years of Collective Vision',
        image_text: "We don't just design. We engineer absolute perfection from the ground up, merging art with cutting-edge technology."
      });
    } catch(e) {
      console.log('page_about_hero might already exist:', e.message);
    }

    // Create page_about_vision
    try {
      await pb.collections.create({
        name: 'page_about_vision',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: null,
        updateRule: null,
        deleteRule: null,
        schema: [
          { name: 'section_label', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'paragraph_1', type: 'text' },
          { name: 'paragraph_2', type: 'text' },
          { name: 'team_text', type: 'text' },
          { name: 'visual_url', type: 'url' },
          { name: 'badge_number', type: 'text' },
          { name: 'badge_label', type: 'text' }
        ]
      });
      console.log('Created page_about_vision collection');

      await pb.collection('page_about_vision').create({
        section_label: 'Our Philosophy',
        title: 'Design is not just what it looks like. Design is how it works.',
        paragraph_1: 'We believe in stripping away the unnecessary. In a world full of noise and bloated interfaces, clarity is the ultimate sophistication. Our process is rooted in deep understanding, allowing us to build solutions that are not only beautiful but profoundly effective.',
        paragraph_2: "Every pixel has a purpose. Every line of code is intentional. We don't just deliver projects; we engineer long-lasting digital infrastructure that empowers your brand to scale seamlessly into the future.",
        team_text: 'Join 40+ visionary creators.',
        visual_url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000&auto=format&fit=crop',
        badge_number: '100%',
        badge_label: 'Independent'
      });
    } catch(e) {
      console.log('page_about_vision might already exist:', e.message);
    }

  } catch(e) {
    console.error('Auth error:', e.message);
  }
}

createCollections();
