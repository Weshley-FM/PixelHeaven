import PocketBase from 'pocketbase';

const pb = new PocketBase('http://pb4.jobnation.id');

async function fixCollections() {
  try {
    await pb.admins.authWithPassword('jobnation.it@gmail.com', 'wifinyamati');

    const collections = ['page_software_hero', 'page_software_features', 'page_software_process'];
    
    for (const name of collections) {
      try {
        const collection = await pb.collections.getOne(name);
        collection.listRule = "";
        collection.viewRule = "";
        await pb.collections.update(collection.id, collection);
        console.log(`Updated rules for ${name}`);
      } catch (e) {
        console.log(`Failed to update ${name}:`, e.message);
      }
    }
    console.log('All done!');
  } catch (error) {
    console.error('Error:', error);
  }
}

fixCollections();
