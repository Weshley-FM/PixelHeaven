import PocketBase from 'pocketbase';

const pb = new PocketBase('http://pb4.jobnation.id');

async function createExtraCollections() {
  try {
    await pb.admins.authWithPassword('jobnation.it@gmail.com', 'wifinyamati');

    // 1. Persuade Collection
    try {
      await pb.collections.create({
        name: 'page_software_persuade',
        type: 'base',
        listRule: "",
        viewRule: "",
        schema: [
          { name: 'badge', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'description', type: 'text' },
          { name: 'button_text', type: 'text' }
        ]
      });
      console.log('Created page_software_persuade');
    } catch (e) { console.log('page_software_persuade might already exist.'); }

    // 2. Tech Header Collection
    try {
      await pb.collections.create({
        name: 'page_software_tech_header',
        type: 'base',
        listRule: "",
        viewRule: "",
        schema: [
          { name: 'badge', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'description', type: 'text' }
        ]
      });
      console.log('Created page_software_tech_header');
    } catch (e) { console.log('page_software_tech_header might already exist.'); }

    // 3. Tech Categories Collection
    try {
      await pb.collections.create({
        name: 'page_software_tech_categories',
        type: 'base',
        listRule: "",
        viewRule: "",
        schema: [
          { name: 'category', type: 'text' },
          { name: 'description', type: 'text' },
          { name: 'techs', type: 'text' },
          { name: 'sort_order', type: 'number' }
        ]
      });
      console.log('Created page_software_tech_categories');
    } catch (e) { console.log('page_software_tech_categories might already exist.'); }

    // Seed Persuade
    const existingPersuade = await pb.collection('page_software_persuade').getFullList();
    if (existingPersuade.length === 0) {
      await pb.collection('page_software_persuade').create({
        badge: 'The Partnership',
        title: "Let's build <br/> something <br/> <span class=\"text-slate-500 italic\">extraordinary.</span>",
        description: 'Stop settling for mediocre development teams. We are a collective of top-tier engineers dedicated to turning your most complex ideas into flawless digital realities.',
        button_text: 'Start a Project'
      });
      console.log('Seeded page_software_persuade');
    }

    // Seed Tech Header
    const existingTechHeader = await pb.collection('page_software_tech_header').getFullList();
    if (existingTechHeader.length === 0) {
      await pb.collection('page_software_tech_header').create({
        badge: 'Tech Stack',
        title: 'The Engine <br class="hidden lg:block"/> Room.',
        description: 'We leverage modern, battle-tested technologies to build scalable, secure, and lightning-fast digital infrastructure.'
      });
      console.log('Seeded page_software_tech_header');
    }

    // Seed Tech Categories
    const existingTechCats = await pb.collection('page_software_tech_categories').getFullList();
    if (existingTechCats.length === 0) {
      const cats = [
        { category: 'Frontend', description: 'We build intuitive, lightning-fast interfaces that users love.', techs: 'React,Vue,Next.js,Tailwind CSS', sort_order: 1 },
        { category: 'Backend', description: 'Robust architecture capable of handling millions of requests safely.', techs: 'Node.js,Python,Go,Laravel', sort_order: 2 },
        { category: 'Mobile App', description: 'Native-feeling applications for iOS and Android platforms.', techs: 'Flutter,React Native,Swift,Kotlin', sort_order: 3 },
        { category: 'Infrastructure', description: 'Scalable cloud infrastructure engineered for zero downtime.', techs: 'AWS,Google Cloud,Docker,Kubernetes', sort_order: 4 }
      ];
      for (const cat of cats) {
        await pb.collection('page_software_tech_categories').create(cat);
      }
      console.log('Seeded page_software_tech_categories');
    }

    console.log('Finished extra software collections.');
  } catch (error) {
    console.error('Error:', error);
  }
}

createExtraCollections();
