import PocketBase from 'pocketbase';

const pb = new PocketBase('http://pb4.jobnation.id');

async function createCollections() {
  try {
    // Authenticate as admin
    await pb.admins.authWithPassword('jobnation.it@gmail.com', 'wifinyamati');

    // 1. Hero Collection
    try {
      await pb.collections.create({
        name: 'page_software_hero',
        type: 'base',
        schema: [
          { name: 'badge_text', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'description', type: 'text' }
        ]
      });
      console.log('Created page_software_hero');
    } catch (e) { console.log('page_software_hero might already exist.'); }

    // 2. Features Collection
    try {
      await pb.collections.create({
        name: 'page_software_features',
        type: 'base',
        schema: [
          { name: 'title', type: 'text' },
          { name: 'description', type: 'text' }
        ]
      });
      console.log('Created page_software_features');
    } catch (e) { console.log('page_software_features might already exist.'); }

    // 3. Process Collection
    try {
      await pb.collections.create({
        name: 'page_software_process',
        type: 'base',
        schema: [
          { name: 'step_number', type: 'number' },
          { name: 'title', type: 'text' },
          { name: 'description', type: 'text' }
        ]
      });
      console.log('Created page_software_process');
    } catch (e) { console.log('page_software_process might already exist.'); }


    // Seed Hero
    const existingHero = await pb.collection('page_software_hero').getFullList();
    if (existingHero.length === 0) {
      await pb.collection('page_software_hero').create({
        badge_text: 'Custom Software',
        title: 'Software That Makes Your Business Scale Up',
        description: 'There is no one-size-fits-all solution for a growing business. We engineer bespoke software to automate your operations and unlock new levels of efficiency.'
      });
      console.log('Seeded Hero');
    }

    // Seed Features
    const existingFeatures = await pb.collection('page_software_features').getFullList();
    if (existingFeatures.length === 0) {
      const features = [
        { title: 'Eliminate Manual Work', description: 'Automate repetitive and mundane tasks to save valuable time and empower your team to focus on strategic growth.' },
        { title: 'Reduce Human Error', description: 'Systematize complex operations and data entry to eliminate costly mistakes and ensure perfect operational accuracy.' },
        { title: 'Flexible Integrations', description: 'Connect seamlessly with your existing tools, CRM, databases, and third-party APIs without friction.' },
        { title: 'Limitless Scalability', description: 'Engineered on robust cloud architecture that grows effortlessly alongside your business demands.' }
      ];
      for (const f of features) {
        await pb.collection('page_software_features').create(f);
      }
      console.log('Seeded Features');
    }

    // Seed Process
    const existingProcess = await pb.collection('page_software_process').getFullList();
    if (existingProcess.length === 0) {
      const processes = [
        { step_number: 1, title: 'Discovery & Ideation', description: 'We immerse ourselves in your business context to understand your operational bottlenecks, goals, and vision.' },
        { step_number: 2, title: 'Technical Architecture', description: 'We analyze structural requirements and design a highly scalable, secure technical foundation and product roadmap.' },
        { step_number: 3, title: 'UI/UX Engineering', description: 'We craft intuitive wireframes and high-fidelity interfaces ensuring a flawless, frictionless user experience.' },
        { step_number: 4, title: 'Agile Development', description: 'Our senior engineers write pristine, scalable code to bring the architecture and designs to life efficiently.' },
        { step_number: 5, title: 'Deployment & Scale', description: 'Rigorous quality assurance, lightning-fast deployment, and continuous monitoring to ensure peak performance.' }
      ];
      for (const p of processes) {
        await pb.collection('page_software_process').create(p);
      }
      console.log('Seeded Process');
    }

    console.log('All collections created and seeded successfully!');

  } catch (error) {
    console.error('Error in createCollections:', error.response || error);
  }
}

createCollections();
