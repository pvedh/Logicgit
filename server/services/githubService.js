const axios = require('axios');

const GITHUB_API_BASE_URL = 'https://api.github.com';
const GITHUB_API_TOKEN = process.env.GITHUB_API_TOKEN; // Ensure this is set in your .env file

// Fetch commits from a repository
const fetchCommits = async (repoName) => {
  const url = `${GITHUB_API_BASE_URL}/repos/${repoName}/commits`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${GITHUB_API_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching commits:', error.response?.data || error.message);
    throw new Error('Failed to fetch commits');
  }
};

// Fetch issues from a repository
const fetchIssues = async (repoName) => {
  const url = `${GITHUB_API_BASE_URL}/repos/${repoName}/issues`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${GITHUB_API_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching issues:', error.response?.data || error.message);
    throw new Error('Failed to fetch issues');
  }
};

// Fetch pull requests from a repository
const fetchPullRequests = async (repoName) => {
  const url = `${GITHUB_API_BASE_URL}/repos/${repoName}/pulls`;
  try {
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${GITHUB_API_TOKEN}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching pull requests:', error.response?.data || error.message);
    throw new Error('Failed to fetch pull requests');
  }
};

module.exports = { fetchCommits, fetchIssues, fetchPullRequests };