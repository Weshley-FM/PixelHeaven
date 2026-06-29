import PocketBase from 'pocketbase';

const pb = new PocketBase('http://pb4.jobnation.id');

async function createTimelineCollection() {
  try {
    await pb.admins.authWithPassword('jobnation.it@gmail.com', 'wifinyamati');

    // Create page_about_timeline
    try {
      await pb.collections.create({
        name: 'page_about_timeline',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: null,
        updateRule: null,
        deleteRule: null,
        schema: [
          { name: 'year', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'description', type: 'text' },
          { name: 'sort_order', type: 'number' }
        ]
      });
      console.log('Created page_about_timeline collection');
      
      // Populate Timeline nodes
      const nodes = [
        {
          year: "2020",
          title: "The Coffee Shop",
          description: "We started with a single laptop and a rebellious idea: that digital design shouldn't be boring.",
          sort_order: 1
        },
        {
          year: "2022",
          title: "Scaling Up",
          description: "Our first major clients trusted us to build their ecosystems. We delivered beyond expectations.",
          sort_order: 2
        },
        {
          year: "2024",
          title: "The Studio Expands",
          description: "Moving into our new headquarters, hiring top-tier talent, and taking on international campaigns.",
          sort_order: 3
        },
        {
          year: "2026",
          title: "The Future",
          description: "Architecting the digital frontier. We continue to push boundaries and redefine web experiences.",
          sort_order: 4
        }
      ];

      for (const node of nodes) {
        await pb.collection('page_about_timeline').create(node);
      }
      console.log('Populated timeline nodes');
      
    } catch(e) {
      console.log('page_about_timeline might already exist:', e.message);
    }

  } catch(e) {
    console.error('Auth error:', e.message);
  }
}

createTimelineCollection();
