const { htmlToText } = require('html-to-text');

/*
 * Copyright (c) 2024 KHAOUITI ABDELHAKIM
 * Last modified: 18 04 2024
 * GitHub: khaouitiabdelhakim
 *
 * DISCLAIMER: This script is for educational purposes only. I am not responsible for how you use it.
 */


const query = "irmak arici"; // Change this to your desired query

const encodedQuery = encodeURIComponent(query);
const url = `https://www.google.com/complete/search?q=${encodedQuery}&client=gws-wiz&xssi=t`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(text => {
        // Remove prefix characters ")]}'"
        const jsonString = text.substring(5);

        // Parse JSON string
        const data = JSON.parse(jsonString);
        
        // Extract auto-suggestions from the data
        const suggestions = data[0].map(item => item[0]);

        // Extract just text from html
        suggestions.forEach((suggestion, index) => {
            suggestions[index] = htmlToText(suggestion);
        });

        // Print suggestions
        console.log(suggestions);
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
    });
