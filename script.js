'use strict';

const STORAGE_KEY = 'jacobroufa_resume';
const resume = getResume();

(() => {
  if (!resume) {
    fetch('./resume.json')
      .then(parseJSON)
      .then(displayResume);
  } else {
    displayResume(resume);
  }
})();

// APP

function displayCurrentProject(project) {
  const items = [ 'title', 'workplace', 'start', 'description' ];
}

function displayPastWork(work) {
  const items = [ 'title', 'workplace', 'start', 'end', 'description' ];
}

function displayResume(resume) {
  const sections = Object.keys(resume);

  displaySectionList(sections);

  for (let section in sections) {
    displaySection(section, resume[section]);
  }
}

function displaySection(section, data) {
  const app = getApp();
  const title = c('h2', section);
  const sectionRenderers = {
    current: displayCurrentProject,
    past: displayPastWork,
    skills: displaySkill,
    talks: displayTalk
  };

  if (!Array.isArray(data)) {
    return null;
  }

  const contents = data.map(sectionRenderers[section]).map((el) => c('li', el));
  const list = c('ul', contents);
  const container = c('div', [ title, list ]);

  a(app, container);
}

function displaySectionList(sections) {
  const app = getApp();
  const noExpires = sections.filter((s) => s !== "expires");
  const list = c('ul', noExpires.map((section) => c('li', c('a', section, {
    href: `#${section}`
  }))));

  a(app, list);
}

function displaySkill(skill) {
  const items = [ 'skill', 'skills' ];
}

function displayTalk(talk) {
  const items = [ 'title', 'presented', 'video', 'slides', 'description' ];
}

function getApp() {
  return document.getElementById('app');
}

function getResume() {
  const resume = localStorage.getItem(STORAGE_KEY);

  if (!resume || shouldExpire(resume.expires)) {
    return null;
  }

  return JSON.parse(resume);
}

function parseJSON(response) {
  return response.json().then(saveResume);
}

function saveResume(resume) {
  const newResume = Object.assign({}, resume, {
    expires: Date.now()
  });

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newResume));
  } catch (e) {
    console.log('WARNING: localStorage may be full!', e);
  }

  return newResume;
}

function shouldExpire(expires, limit) {
  const expirationTime = Number.parseInt(limit, 10) || 900;
  const start = expires || 0;
  const now = Date.now();
  const diffSeconds = Math.floor((now - expires) / 1000);

  // expire after 15 minutes
  if (diffSeconds > expirationTime) {
    return true;
  }

  return false;
}

// DOM

function a(el, contents) {
  el.appendChild(contents);

  return el;
}

function c(tag, contents, attrs) {
  const el = document.createElement(tag);

  if (attrs) {
    Object.keys(attrs).forEach((attr) => {
      el[attr] = attrs[attr];
    });
  }

  if (!contents) {
    return el;
  }

  const type = Array.isArray(contents) ? 'array'
    : typeof contents;

  if (type === 'string') {
    el.textContent = contents;
  } else if (type === 'array') {
    contents.forEach((item) => a(el, item));
  } else if (type === 'object') {
    a(el, contents);
  }

  return el;
}
