import PocketBase from 'pocketbase';

const pb = new PocketBase('http://pb4.jobnation.id');

async function updateCopy() {
  try {
    await pb.admins.authWithPassword('jobnation.it@gmail.com', 'wifinyamati');

    // Update Features
    const features = await pb.collection('page_webdev_features').getFullList();
    const newFeatures = {
      'Custom Design': { title: 'Bespoke UI Design', description: 'Handcrafted pixel-perfect layouts designed from scratch to forge a truly unique digital identity for your brand.' },
      'Responsive Layout': { title: 'Flawless Responsiveness', description: 'Engineered to adapt beautifully across all viewports. Perfect rendering on mobile, tablet, and ultra-wide screens.' },
      'SEO Friendly': { title: 'Search Optimized', description: 'Built with semantic architecture and optimal metadata to guarantee maximum visibility on major search engines.' },
      'High Performance': { title: 'Blazing Fast Speeds', description: 'Next-gen asset delivery and lightweight codebases ensuring sub-second load times and silky smooth navigation.' },
      'Admin Panel': { title: 'Intuitive Dashboard', description: 'Empower your team with a custom Content Management System. Update your entire site without touching a single line of code.' },
      'Custom Integration': { title: 'Seamless Integrations', description: 'Deep API connections for payment gateways, CRM pipelines, and advanced analytics platforms.' }
    };

    for (const f of features) {
      if (newFeatures[f.title]) {
        await pb.collection('page_webdev_features').update(f.id, newFeatures[f.title]);
      } else {
        // Fallback update if title doesn't match
        const values = Object.values(newFeatures);
        const match = values.find(v => v.title === f.title);
        if(!match) {
            // just give it standard length
            await pb.collection('page_webdev_features').update(f.id, {
                description: f.description + (f.description.length < 50 ? ' Enhanced for maximum impact.' : '')
            });
        }
      }
    }

    // Update Process
    const processSteps = await pb.collection('page_webdev_process').getFullList();
    const newProcess = {
      1: { title: 'Discovery', description: 'We immerse ourselves in your business, dissecting your target market and formulating a rock-solid structural strategy before a single pixel is drawn.' },
      2: { title: 'Design Architecture', description: 'Translating strategy into wireframes and high-fidelity aesthetics. We establish a visual language that screams premium and converts instantly.' },
      3: { title: 'Precision Engineering', description: 'Writing pristine, scalable code. Our developers bring the design to life with flawless micro-interactions and robust backend architecture.' },
      4: { title: 'Launch & Scale', description: 'Rigorous quality assurance, lightning-fast deployment, and continuous monitoring to ensure your digital flagship performs at its absolute peak.' }
    };

    for (const p of processSteps) {
      if (newProcess[p.step_number]) {
        await pb.collection('page_webdev_process').update(p.id, newProcess[p.step_number]);
      }
    }

    console.log('Copywriting updated successfully!');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

updateCopy();
