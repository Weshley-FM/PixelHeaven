import PocketBase from 'pocketbase';

const pb = new PocketBase('http://pb4.jobnation.id');

async function fixDB() {
  try {
    await pb.admins.authWithPassword('jobnation.it@gmail.com', 'wifinyamati');
    
    // Update section_hero
    const heroRecords = await pb.collection('section_hero').getFullList();
    if (heroRecords.length > 0) {
      await pb.collection('section_hero').update(heroRecords[0].id, {
        brand_name: 'PixelHeaven',
        founders_text: '1.6K+ Founders',
        subtitle: 'We help startups create brands, websites, and decks.',
        draw_phrases: "need a good design?, let's build it!, pixel heaven rocks, draw something cool, creative freedom"
      });
      console.log('Hero section updated with full default data.');
    }

    // Update section_about
    const aboutRecords = await pb.collection('section_about').getFullList();
    if (aboutRecords.length > 0) {
      await pb.collection('section_about').update(aboutRecords[0].id, {
        section_label: 'About Us',
        slide1_title: 'We started with a simple idea.',
        slide1_text: 'To strip away the noise and build digital tools that actually help founders scale their visions without compromising on aesthetics.',
        slide2_title: 'Then we broke all the rules.',
        slide2_text: "Generic templates don't cut it. We merged high-end engineering with rebellious design to create something entirely new and wildly effective.",
        slide3_title: 'The numbers speak for themselves.',
        stat1_number: '100+',
        stat1_label: 'Startups Launched',
        stat2_number: '$50M',
        stat2_label: 'Client Revenue',
        stat3_number: '14',
        stat3_label: 'Design Awards',
        stat4_number: '24/7',
        stat4_label: 'Relentless Grind',
        slide4_title: 'Ready to elevate?',
        slide4_button: 'Start Your Project'
      });
      console.log('About section updated with full default data.');
    }
  } catch(e) {
    console.error('Error fixing db:', e.message);
  }
}
fixDB();
