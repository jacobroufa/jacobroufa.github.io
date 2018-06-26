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
  const list = c('ul', sections.map((section) => c('li', section)));

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
  return localStorage.getItem(STORAGE_KEY);
}

function parseJSON(response) {
  return response.json().then(saveResume);
}

function saveResume(resume) {
  try {
    localStorage.setItem(STORAGE_KEY, resume);
  } catch (e) {
    console.log('WARNING: localStorage may be full!', e);
  }

  return resume;
}

// DOM

function a(el, contents) {
  el.appendChild(contents);

  return el;
}

function c(tag, contents) {
  const el = document.createElement(tag);

  if (!contents) {
    return el;
  }

  const type = Array.isArray(contents) ? 'array'
    : typeof contents;

  if (type === 'string') {
    el.textContent = contents;
  } else if (type === 'array') {
    contents.forEach((item) => a(el, item));
  }

  return el;
}
