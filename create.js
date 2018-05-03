#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');
const mustache = require('mustache');
const fs = require('fs');
const FILE_PATHS = require('./config.js');


const questions = [
  {
    type: 'input',
    name: 'firstname',
    message: 'Enter your first-name:'
  },
  {
    type: 'input',
    name: 'lastname',
    message: 'Enter your last-name:'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email: '
  },
  {
    type: 'input',
    name: 'city',
    message: 'Enter your current city: '
  },
  {
    type: 'input', 
    name: 'accesstoken', 
    message: 'Enter your mapbox-access token: '
  }
];

const generateHtml = (answer) => {
   // console.log(answer);
   // console.log(FILE_PATHS);
   fs.readFile(FILE_PATHS.template_url, 'utf-8', (err, html) => {
      if(err) {
  	console.log('Error in reading template');
 	console.log(err);
     }
     const updatedHtml = mustache.render(html, {firstname: answer.firstname, lastname: answer.lastname, email: answer.email, accesstoken: answer.accesstoken, city: answer.city});
     try {
     	fs.writeFile(FILE_PATHS.generated_url, updatedHtml, (err) => {
	   if(err) {
	      return err;
	   }
           console.log('File written successfully');
        });
     } catch(e) {
	console.log(e);
     }   
   });
}

program
  .version('0.0.1')
  .description('A resume-builder application with map-traversal feature by mapbox');

program
  .command('create') 
  .alias('c')
  .description('Create Basic Resume')
  .action(() => {
	prompt(questions).then(answers => {
        generateHtml(answers); 
    });
  });


program.parse(process.argv);
