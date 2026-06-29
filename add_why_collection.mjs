import PocketBase from 'pocketbase';

const pb = new PocketBase('http://pb4.jobnation.id');

async function createWhyCollection() {
  try {
    await pb.admins.authWithPassword('jobnation.it@gmail.com', 'wifinyamati');

    // Create page_about_why_reasons
    try {
      await pb.collections.create({
        name: 'page_about_why_reasons',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: null,
        updateRule: null,
        deleteRule: null,
        schema: [
          { name: 'number', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'description', type: 'text' },
          { name: 'sort_order', type: 'number' }
        ]
      });
      console.log('Created page_about_why_reasons collection');
      
      // Populate reasons
      const reasons = [
        {
          number: "01",
          title: "Engineering Excellence",
          description: "We don't rely on bloated templates or messy plugins. Everything is meticulously architected for lightning-fast performance, rock-solid security, and scalable infrastructure from day one.",
          sort_order: 1
        },
        {
          number: "02",
          title: "Rebellious Aesthetics",
          description: "Your brand shouldn't look like everyone else's. We merge minimalist editorial design with bold, striking micro-interactions to create digital experiences that command attention.",
          sort_order: 2
        },
        {
          number: "03",
          title: "Strategic Alignment",
          description: "We build with purpose. Every design decision and technical implementation is aligned with your core business objectives to ensure maximum impact and conversion.",
          sort_order: 3
        }
      ];

      for (const reason of reasons) {
        await pb.collection('page_about_why_reasons').create(reason);
      }
      console.log('Populated why reasons');
      
    } catch(e) {
      console.log('Collection might already exist:', e.message);
    }

  } catch(e) {
    console.error('Auth error:', e.message);
  }
}

createWhyCollection();
