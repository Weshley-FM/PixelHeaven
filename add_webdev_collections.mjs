import PocketBase from 'pocketbase';

const pb = new PocketBase('http://pb4.jobnation.id');

async function createCollections() {
  try {
    await pb.admins.authWithPassword('jobnation.it@gmail.com', 'wifinyamati');

    // 1. page_webdev_hero
    try {
      await pb.collections.create({
        name: 'page_webdev_hero',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: null,
        updateRule: null,
        deleteRule: null,
        schema: [
          { name: 'badge_text', type: 'text' },
          { name: 'title', type: 'text' },
          { name: 'description', type: 'text' },
          { name: 'stat_number', type: 'text' },
          { name: 'stat_label', type: 'text' }
        ]
      });
      console.log('Created page_webdev_hero collection');
      
      await pb.collection('page_webdev_hero').create({
        badge_text: 'No. 1 Website Development Service',
        title: 'Build a Digital Identity for Your Business.',
        description: 'We offer website development services that are not only visually appealing, but also fast, responsive, and optimal for modern business needs.',
        stat_number: '50+',
        stat_label: 'Clients across various industries'
      });
    } catch(e) {
      console.log('page_webdev_hero might already exist:', e.message);
    }

    // 2. page_webdev_features
    try {
      await pb.collections.create({
        name: 'page_webdev_features',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: null,
        updateRule: null,
        deleteRule: null,
        schema: [
          { name: 'title', type: 'text' },
          { name: 'description', type: 'text' },
          { name: 'icon_name', type: 'text' }
        ]
      });
      console.log('Created page_webdev_features collection');

      const features = [
        { title: 'Custom Design', description: 'Tailored designs built from scratch, ensuring distinct branding.', icon_name: 'design' },
        { title: 'Responsive Layout', description: 'Fully compatible across all screen sizes (mobile, tablet, desktop).', icon_name: 'device' },
        { title: 'SEO Friendly', description: 'Structural optimization for search engines to drive organic traffic.', icon_name: 'search' },
        { title: 'High Performance', description: 'Lightning-fast page loads and optimized resource delivery.', icon_name: 'bolt' },
        { title: 'Admin Panel', description: 'Easy-to-use CMS interface allowing simple updates without coding skills.', icon_name: 'cog' },
        { title: 'Custom Integration', description: 'Support for APIs, payments, analytics, and CRM integrations.', icon_name: 'cube' }
      ];

      for (const feature of features) {
        await pb.collection('page_webdev_features').create(feature);
      }
    } catch(e) {
      console.log('page_webdev_features might already exist:', e.message);
    }

    // 3. page_webdev_process
    try {
      await pb.collections.create({
        name: 'page_webdev_process',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: null,
        updateRule: null,
        deleteRule: null,
        schema: [
          { name: 'step_number', type: 'number' },
          { name: 'title', type: 'text' },
          { name: 'description', type: 'text' }
        ]
      });
      console.log('Created page_webdev_process collection');

      const processes = [
        { step_number: 1, title: 'Discovery & Planning', description: 'Defining project requirements, target market, and structural sitemaps.' },
        { step_number: 2, title: 'UI/UX Design', description: 'Crafting wireframes and high-fidelity page designs using modern UI tools.' },
        { step_number: 3, title: 'Development & Testing', description: 'Coding the frontend/backend and executing comprehensive QA testing.' },
        { step_number: 4, title: 'Launch & Support', description: 'Hosting configuration, domain pointing, and deploying live, followed by ongoing updates.' }
      ];

      for (const process of processes) {
        await pb.collection('page_webdev_process').create(process);
      }
    } catch(e) {
      console.log('page_webdev_process might already exist:', e.message);
    }

    // 4. page_webdev_pricing
    try {
      await pb.collections.create({
        name: 'page_webdev_pricing',
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: null,
        updateRule: null,
        deleteRule: null,
        schema: [
          { name: 'tier_name', type: 'text' },
          { name: 'price', type: 'text' },
          { name: 'target_audience', type: 'text' },
          { name: 'features_list', type: 'text' } // newline separated
        ]
      });
      console.log('Created page_webdev_pricing collection');

      const pricings = [
        { 
          tier_name: 'Startup', 
          price: 'Rp 3.000.000', 
          target_audience: 'Ideal for Landing Pages, Portfolios, or Simple Blogs.',
          features_list: '1 Page Design\nResponsive UI\nFree Domain & Hosting (1 Year)\nBasic SEO\nWhatsApp Integration'
        },
        { 
          tier_name: 'Growth', 
          price: 'Rp 7.500.000', 
          target_audience: 'Ideal for Small/Medium Businesses, Corporate Profile websites.',
          features_list: 'Up to 5 Pages\nPremium UI/UX\nDynamic Features\nCMS Integration\nAnalytical Tools'
        },
        { 
          tier_name: 'Custom', 
          price: 'Custom Pricing', 
          target_audience: 'Ideal for E-Commerce, SaaS Web Apps, or Tailored Platforms.',
          features_list: 'Infinite Pages\nComplex Coding\nCustom Integrations\nLifetime Support\nAdvanced Database'
        }
      ];

      for (const pricing of pricings) {
        await pb.collection('page_webdev_pricing').create(pricing);
      }
    } catch(e) {
      console.log('page_webdev_pricing might already exist:', e.message);
    }

    console.log('Successfully completed Web Dev collections setup.');
  } catch(e) {
    console.error('Auth error:', e.message);
  }
}

createCollections();
