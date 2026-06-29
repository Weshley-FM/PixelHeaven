import PocketBase from 'pocketbase';

const pb = new PocketBase('http://pb4.jobnation.id');

async function seed() {
  try {
    console.log('Attempting to log in...');
    await pb.admins.authWithPassword('jobnation.it@gmail.com', 'wifinyamati');
    console.log('Logged in as admin successfully. Seeding data...');

    // Seed Services
    const services = [
      { number: '01', title: 'UI/UX Design', description: 'Intuitive, stunning, and user-centric interfaces built to convert.' },
      { number: '02', title: 'Website Development', description: 'Blazing fast, responsive, and scalable web solutions.' },
      { number: '03', title: 'Custom Software', description: 'Tailored applications designed specifically for your business logic.' },
      { number: '04', title: 'Social Media', description: 'Engaging digital presence to amplify your brand voice.' }
    ];
    for (const s of services) {
      await pb.collection('services').create(s);
    }
    console.log('Seeded services');

    // Seed Projects
    const projects = [
      { title: 'Fintech Dashboard', category: 'Web App', year: '2025', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80' },
      { title: 'NeoBank Mobile', category: 'iOS App', year: '2026', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80' },
      { title: 'Luxury Retail', category: 'E-Commerce', year: '2025', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80' },
      { title: 'AI Assistant', category: 'Branding', year: '2026', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80' }
    ];
    for (const p of projects) {
      await pb.collection('projects').create(p);
    }
    console.log('Seeded projects');

    // Seed Engagement Models
    const models = [
      { title: 'Consulting & Audit', price: 'Starting at $2k', timeline: '1-3 Weeks', description: 'Strategic direction, UX audits, or brand positioning before diving into full execution.' },
      { title: 'Project-Based', price: 'Starting at $10k', timeline: '2-3 Months', description: 'End-to-end execution of a specific scope. We handle everything from the initial discovery to launch.' },
      { title: 'Dedicated Team', price: 'Custom Retainer', timeline: 'Ongoing', description: 'An embedded team of world-class designers and engineers working alongside you as a strategic partner.' }
    ];
    for (const m of models) {
      await pb.collection('engagement_models').create(m);
    }
    console.log('Seeded models');

    // Seed FAQs
    const faqs = [
      { question: 'How long does a typical project take?', answer: 'Most web projects take 4-8 weeks from kick-off to launch. Complex applications may take 3-6 months depending on scope.' },
      { question: 'Do you work with startups?', answer: 'Yes! We specialize in helping early-stage startups move fast and establish a premium brand presence from day one.' },
      { question: 'What is your design process?', answer: 'We follow a strict framework: Discovery > Wireframing > High-Fidelity UI > Prototyping > Handoff.' }
    ];
    for (const f of faqs) {
      await pb.collection('faqs').create(f);
    }
    console.log('Seeded faqs');

    // Seed Testimonials
    const testimonials = [
      { text: 'Pixel Heaven fundamentally transformed how our users interact with our product. The quality is unmatched.', author: 'Sarah Jenkins', role: 'CEO, TechFlow' },
      { text: 'They operate like an in-house team. The communication and speed of execution is absolutely phenomenal.', author: 'David Chen', role: 'Founder, NeoBank' },
      { text: 'I have never worked with a more talented group of designers. They nailed our aesthetic on the first iteration.', author: 'Elena Rodriguez', role: 'CMO, LuxeRetail' }
    ];
    for (const t of testimonials) {
      await pb.collection('testimonials').create(t);
    }
    console.log('Seeded testimonials');

    // Seed Sections
    await pb.collection('section_hero').create({
      title: "We are Pixel Heaven.",
      subtitle: "We help startups create brands, websites, and decks.",
      button_primary: "Start Project",
      button_secondary: "View Work"
    });
    console.log('Seeded section_hero');

    await pb.collection('section_about').create({
      section_label: "About Us",
      title: "We build digital experiences that matter.",
      description: "We are a team of passionate designers and developers who love creating beautiful and functional products."
    });
    console.log('Seeded section_about');

    await pb.collection('section_navbar').create({
      brand_name: "PixelHeaven",
      link_home: "Home",
      link_about: "About",
      link_service: "Service",
      button_contact: "Contact"
    });
    console.log('Seeded section_navbar');

    await pb.collection('section_cta').create({
      section_label: "Get in Touch",
      title: "Let's build something extraordinary.",
      description: "Enter your email below and our engineering team will get back to you within 24 hours to discuss your vision.",
      placeholder_text: "hello@yourcompany.com"
    });
    console.log('Seeded section_cta');

    await pb.collection('section_footer').create({
      brand_name: "Pixel Heaven",
      description: "We act as your fractional design and engineering team to get you to market fast and beautifully.",
      col1_title: "Studio",
      col2_title: "Socials",
      location_title: "Location",
      location_text: "San Francisco, CA\nRemote Worldwide",
      copyright_text: "© 2026 Pixel Heaven.\nAll rights reserved."
    });
    console.log('Seeded section_footer');

    console.log('Database seeded successfully!');
  } catch (err) {
    console.error('Failed to seed:', err.message);
  }
}

seed();
