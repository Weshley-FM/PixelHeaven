import PocketBase from 'pocketbase';
import fs from 'fs';

const pb = new PocketBase('http://pb4.jobnation.id');

async function ensureCollection() {
  try {
    await pb.admins.authWithPassword('jobnation.it@gmail.com', 'wifinyamati');
    console.log('Authenticated as admin');

    const collectionData = {
      name: 'page_about_team',
      type: 'base',
      system: false,
      schema: [
        {
          name: 'name',
          type: 'text',
          required: true,
          options: { min: null, max: null, pattern: '' }
        },
        {
          name: 'role',
          type: 'text',
          required: true,
          options: { min: null, max: null, pattern: '' }
        },
        {
          name: 'image_url',
          type: 'url',
          required: true,
          options: { exceptDomains: [], onlyDomains: [] }
        },
        {
          name: 'description',
          type: 'text',
          required: true,
          options: { min: null, max: null, pattern: '' }
        },
        {
          name: 'sort_order',
          type: 'number',
          required: true,
          options: { min: 0, max: 1000, noDecimal: true }
        }
      ],
      listRule: '',
      viewRule: '',
      createRule: '@request.auth.id != ""',
      updateRule: '@request.auth.id != ""',
      deleteRule: '@request.auth.id != ""',
    };

    try {
      await pb.collections.create(collectionData);
      console.log('Collection created successfully');
    } catch (e) {
      if (e.status === 400 && e.data?.data?.name?.code === 'validation_invalid_name') {
        console.log('Collection might already exist, skipping creation.');
      } else {
        console.error('Error creating collection:', e.data ? JSON.stringify(e.data, null, 2) : e);
      }
    }

    const dummyData = [
      {
        name: 'Alexandria Pierce',
        role: 'Chief Creative Officer',
        image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=800&h=1000',
        description: 'Visionary behind our aesthetic direction and brand identity.',
        sort_order: 1
      },
      {
        name: 'Julian Vance',
        role: 'Lead Architect',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800&h=1000',
        description: 'Pioneering structural elegance in our engineering division.',
        sort_order: 2
      },
      {
        name: 'Sarah Chen',
        role: 'Director of Strategy',
        image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=1000',
        description: 'Aligning our creative vision with market dominance.',
        sort_order: 3
      }
    ];

    for (const data of dummyData) {
      try {
        await pb.collection('page_about_team').create(data);
        console.log(`Added team member: ${data.name}`);
      } catch (e) {
        console.log(`Failed to add team member: ${data.name}`, e.data ? JSON.stringify(e.data, null, 2) : e);
      }
    }

  } catch (error) {
    console.error('Operation failed:', error);
  }
}

ensureCollection();
