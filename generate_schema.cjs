const fs = require('fs');

function genId(length) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function textField(name) {
  return {
    system: false,
    id: genId(8),
    name: name,
    type: "text",
    required: false,
    presentable: false,
    unique: false,
    options: { min: null, max: null, pattern: "" }
  };
}

function urlField(name) {
  return {
    system: false,
    id: genId(8),
    name: name,
    type: "url",
    required: false,
    presentable: false,
    unique: false,
    options: { exceptDomains: [], onlyDomains: [] }
  };
}

const collections = [
  {
    name: "projects",
    fields: [textField("title"), textField("category"), textField("year"), urlField("image")]
  },
  {
    name: "services",
    fields: [textField("number"), textField("title"), textField("description")]
  },
  {
    name: "testimonials",
    fields: [textField("text"), textField("author"), textField("role")]
  },
  {
    name: "faqs",
    fields: [textField("question"), textField("answer")]
  },
  {
    name: "engagement_models",
    fields: [textField("title"), textField("price"), textField("timeline"), textField("description")]
  },
  {
    name: "section_navbar",
    fields: [textField("brand_name"), textField("link_home"), textField("link_about"), textField("link_service"), textField("button_contact")]
  },
  {
    name: "section_hero",
    fields: [textField("brand_name"), textField("founders_text"), textField("subtitle"), textField("draw_phrases")]
  },
  {
    name: "section_about",
    fields: [
      textField("section_label"), textField("slide1_title"), textField("slide1_text"),
      textField("slide2_title"), textField("slide2_text"), textField("slide3_title"),
      textField("stat1_number"), textField("stat1_label"), textField("stat2_number"),
      textField("stat2_label"), textField("stat3_number"), textField("stat3_label"),
      textField("stat4_number"), textField("stat4_label"), textField("slide4_title"),
      textField("slide4_button")
    ]
  },
  {
    name: "section_cta",
    fields: [textField("section_label"), textField("title"), textField("description"), textField("placeholder_text")]
  },
  {
    name: "section_footer",
    fields: [
      textField("brand_name"), textField("description"), textField("col1_title"),
      textField("col2_title"), textField("location_title"), textField("location_text"),
      textField("copyright_text")
    ]
  }
];

const schemaJSON = collections.map(col => ({
  id: genId(15),
  created: new Date().toISOString(),
  updated: new Date().toISOString(),
  name: col.name,
  type: "base",
  system: false,
  schema: col.fields,
  indexes: [],
  listRule: "",
  viewRule: "",
  createRule: null,
  updateRule: null,
  deleteRule: null,
  options: {}
}));

fs.writeFileSync('pb_schema.json', JSON.stringify(schemaJSON, null, 2));
console.log('Generated pb_schema.json');
